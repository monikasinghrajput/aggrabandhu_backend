const REST_API = require("../../../utils/crudHelper");
const DonationModel=require('./Donation_Model');
const MemberModel=require('../../Members/member-model');
const sequelize=require('sequelize');
const validImage=require('../../ImageValidation/ImageValidation')
const Donation_Receives_Model=require('../DonationReceive/donationReceiverModel');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const baseUploadsFolder = path.join(__dirname, '../../../', 'uploads/payments');



exports.getDonations = async (req, resp) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit;

    const { count, rows } = await DonationModel.findAndCountAll({
      include: [{
        model: MemberModel,
        attributes: ['id', 'name', 'email', 'state', 'district']
      }],
      limit: limit,
      offset: offset
    });

    const response = {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows
    };

    resp.status(200).json(response);

  } catch (error) {
    console.log(error);
    resp.status(500).json({ error: error.message });
  }
};



exports.getDonationById=async(req,resp)=>{
   try {
      const{key,value}=req.query;
      const getData=await REST_API._getDataListById(req,resp,DonationModel,key,value);
   } catch (error) {
      resp.status(500).json(error);

   }
}

exports.DonationCreate=async(req,resp)=>{
   try {
      const { member_id, donation_id, amount, transaction_id } = req.body;
      if (!member_id || !donation_id || !amount  || !transaction_id ) {
         return resp.status(400).json({ error: 'Missing required fields' });
       }
       console.log("call")
       let file=req.files.file.data;

        const valid=await  validImage.TransactionIdExtracting(file,transaction_id);
        console.log(valid);


        if(valid===req.body.transaction_id){
         const Donation=await  DonationModel.create(req.body);
         console.log(Donation);
         const updated = await Donation_Receives_Model.update(
           { total_donation_received: sequelize.literal(`total_donation_received + ${req.body.amount}`) }, 
           { where: { id: req.body.donation_id } } 
         );
         test(req,resp,Donation.id);
         resp.status(200).json(Donation);
        }else{
         resp.status(404).json("Transaction id not valid")
        }
   } catch (error) {
    console.error('Donation Error:', error);
    resp.status(400).json({ error: error});
   }
}


exports.updateDonation=async(req,resp)=>{
   try {
      const updateDonation=await REST_API._update(req,resp,DonationModel);
   } catch (error) {
      console.log(error);
      resp.status(500).json(error);
   }
}

exports.deleteDonation=async(req,resp)=>{
   try {
      const deleteDonation=await REST_API._delete(req,resp,DonationModel);
   } catch (error) {
      console.log(error);
      resp.status(500).json(error);
   }
}

const test = async (req, resp, id) => {
   console.log(id);
   let uploadedFile = req.files.file;
   if (!uploadedFile) {
     console.log(' upload    No file uploaded');
     return;
   }
   const newfile=String(id);
   const idFolderPath = path.join(baseUploadsFolder, newfile);
 
   if (!fs.existsSync(idFolderPath)) {
     fs.mkdirSync(idFolderPath, { recursive: true });
   }
   const handleFileUpload = (file) => {
     if (file) {
       const uploadPath = path.join(idFolderPath, file.name);
       console.log(uploadPath);
       file.mv(uploadPath, (err) => {
         if (err) {
           console.log(err);
           return resp.status(500).send('Failed to upload file.');
         }

         const Update= DonationModel.update(
           { transaction_file: `http://localhost:7000/api/file/payments/${id}/${file.name}` },
           { where: { id: id } }
         );
         console.log(`${file.name} uploaded!`);
       });
     }
   };
 
   // Handle both files
   handleFileUpload(uploadedFile);
   // handleFileUpload(uploadedFile2);
};