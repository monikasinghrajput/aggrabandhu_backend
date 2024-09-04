const REST_API = require("../../../utils/crudHelper");
const DonationReceiveModel=require('./donationReceiverModel');
const MemberModel=require('../../Members/member-model');
const Donators=require('../Donations/Donation_Model');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize'); 
const baseUploadsFolder = path.join(__dirname, '../../../', 'uploads/DonationDetail');


exports.DonationReceive=async(req,resp)=>{
    let file='';
    if(req.files){
        file=req.files.file.name;
    }
    try {
       const Donation=await  DonationReceiveModel.create(req.body);
       console.log(Donation);
       if(req.files){
        test(req,resp,Donation.id);
       }
       resp.status(200).json(Donation);    
      } catch (error) {
       console.error('Donation Error:', error.message);
       resp.status(400).json({ error: 'Failed to Adding member' });
      }
}



exports.getDonationReceivers = async (req, resp) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await DonationReceiveModel.findAndCountAll({
      include: [{
        model: MemberModel,
        attributes: ['id', 'name', 'email', 'state', 'district','profileUrl']
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


exports.deleteDonationReceive=async(req,resp)=>{
    try {
        const deleteData=await REST_API._delete(req,resp,DonationReceiveModel);
    } catch (error) {
        console.log(error);
        resp.status(500).json(error);
    }
}
exports.updateDonationReceives=async(req,resp)=>{
    try {
      const id=req.params.id;
      if(req.files){
        test(req,resp,id);
      }
      
      const updateData=await REST_API._update(req,resp,DonationReceiveModel);
    } catch (error) {
        console.log(error);
        resp.status(500).json(error);
    }
}

exports.getDonationReceiversById=async(req,resp)=>{
    try {
        const{key,value}=req.query;
        const getData=await REST_API._getDataListById(req,resp,DonationReceiveModel,key,value);
        
        
    } catch (error) {
        resp.status(500).json(error);
    }
}

exports.getOne = async (req, resp) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const data = await Donators.findAndCountAll({
      where: {
        donation_id: req.params.id,
      },
      include: [{
        model: MemberModel,  
        attributes: ['id', 'name', 'email', 'state', 'district', 'mobile_no']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const response = {
      totalItems: data.count,
      totalPages: Math.ceil(data.count / limit),
      currentPage: parseInt(page),
      data: data.rows
    };

    resp.status(200).json(response);
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
};


//For File Upload
if (!fs.existsSync(baseUploadsFolder)) {
    fs.mkdirSync(baseUploadsFolder, { recursive: true });
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

          const Update= DonationReceiveModel.update(
            { file: `http://localhost:7000/api/file/donation/${id}/${file.name}` },
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

exports.getActiveDonation = async (req, resp) => {
  try {
    const request_date=new Date();
    console.log(request_date);
    const donationData = await DonationReceiveModel.findAll({
      include: [{
        model: MemberModel,
        attributes: ['id', 'name', 'email', 'state', 'district']
      }],
      where: {
        status: 'Active',
        start_date: {
          [Op.lte]: request_date  
        },
        end_date: {
          [Op.gte]: request_date 
        }
      }
    });
    console.log(donationData)
    resp.status(200).json(donationData);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: 'Internal server error' });
  }
};
