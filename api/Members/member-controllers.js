
const memberModel=require('./member-model');
const NomineeModel=require('./nominee_model');
const REST_API = require("../../utils/crudHelper");
const ForgetModel=require('../forgetPassword/forgetPasswordModel');
const RoleModel=require('../Rolemanagement/roleManagementModel');
const OtpModel=require('./OtpModel/otpModel');
const path = require('path');
const fs = require('fs');
const Mail=require('../../config/nodemailer/nodemailer');
const baseUploadsFolder = path.join(__dirname, '../../', 'uploads');



exports.memberAdd=async(req,resp)=>{
    console.log(req.body);
    try {
        ////    For check validation  
        
        // if(req.body.mobileotp!=="verified" && req.bod.emailotp!=="verified"){
        //     resp.status(404).json({message:"Member Not Verified"});
        // }

        const memberAdd=await REST_API._addNominee(req,resp,memberModel);
        console.log(memberAdd);
       
        if(memberAdd){
            const addRole=await RoleModel.create({member_id:memberAdd.dataValues.id})
            if(addRole){
                console.log("role added");
            }
            //  resp.status(201).json({ data:memberAdd});
            const Nominee=await REST_API._addNominees(req,resp,NomineeModel,memberAdd.dataValues.id);
            if(Nominee){
                console.log("Member Added Successfull...");


                test(req,resp,memberAdd.dataValues.id);    //// For file Upload 
                resp.status(200).json({memberAdd,Nominee})
            }
        }

    } catch (error) {
        console.error('Member adding error:', error.message);
        resp.status(400).json({ error: 'Failed to Adding member' });
    }
}

exports.getMembers=async(req,resp)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // const getMember=await REST_API._getMemberData(req,resp,memberModel);
         const { count, rows }=await memberModel.findAndCountAll(
            {attributes: {
                exclude: ['password'] 
              },
            //   order:[['id','DESC']],
              include: [{
                model: NomineeModel,
                as: 'nominees', 
                attributes: ['name', 'relationship', 'name2', 'relationship2'] 
              }],
              limit: limit,
               offset: offset
            }
        )
        if(rows){
            const response = {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                data: rows
              };
              resp.status(200).json(response);
        }else{
            resp.status(400).json("Empty data")
        }
    } catch (error) {
        console.log(error)
        resp.status(500).json({message:error});
    }
}
exports.updateMember=async(req,resp)=>{
    try {
        const updateMember=await REST_API._update(req,resp,memberModel);
    } catch (error) {
        resp.status(500).json(error);  
    }
}


exports.deleteMember=async(req,resp)=>{
    try {
        const deleteMember=await REST_API._delete(req,resp,memberModel);

    } catch (error) {
        resp.status(500).json(error);
    }
}

exports.getMemberById=async(req,resp)=>{
    try {
        const{key,value}=req.query;
        const memberData=await REST_API._getDataListById(req,resp,memberModel,key,value);   
    } catch (error) {
        resp.status(500).json(error)
    }
}

exports.membergetsByPagination=async(req,resp)=>{
    try {
        const data=await REST_API.Pagination(req,resp,memberModel);

    } catch (error) {
        resp.status(500).json(error);
    }
}


exports.forgetPassword=async(req,resp)=>{
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);

        const MemberEmail=await REST_API._GetDetail(req,resp,memberModel);
        const sendMail=await Mail.sendEmail(MemberEmail[0].email,'For Forget Password',`YOUR FORGET PASSWORD OTP IS ${otp} `)
        console.log(sendMail,MemberEmail[0].email)
        if(sendMail){
            console.log("MESSAGE SENDED")
            const send=await REST_API._forget(req,resp,ForgetModel,otp);
        }

    } catch (error) {
        resp.status(500).json(error);
    }
}


exports.varify=async(req,resp)=>{
    console.log(req.body,req.params)
    try {
        const varify=await REST_API._checkPassUser(req,resp,ForgetModel);    
        console.log(varify)
        if(varify){
            const deleteotp=await  ForgetModel.destroy({where:{member_id:req.params.id}});
            const update =await REST_API._updatePassword(req,resp,memberModel);
        }  
        else{
            resp.status(500).json("otp not found");
        }  
    } catch (error) {
        resp.status(500).json(error);
    }
}

exports.otp=async(req,resp)=>{
try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(req.body.via)) {
        
      Mail.sendEmail(req.body.via,'For Otp Verify',`Your Otp Is ${otp}`);
    } 

    const saveOpt=await REST_API.saveOTP(req,resp,OtpModel,otp);
} catch (error) {
        resp.status(500).json(error);
}
}


exports.verifyOTP=async(req,resp)=>{
    try {
        const verifyOTP=await REST_API.OTPVERIFYMEMBER(req,resp,OtpModel,req.body.otp);
    } catch (error) {
        resp.status(500).json(error);
    }
}






if (!fs.existsSync(baseUploadsFolder)) {
  fs.mkdirSync(baseUploadsFolder, { recursive: true });
}

const test = async (req, resp, id) => {
  console.log(id);

  let uploadedFile = req.files.file;
  let uploadedFile2=req.files.file2;
  let profile=req.files.profile;
  
  if (!uploadedFile || !uploadedFile2) {

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
      file.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
          return resp.status(500).send('Failed to upload file.');
        }
        console.log(`${file.name} uploaded!`);
      });
    }
  };

  // Handle both files
  handleFileUpload(uploadedFile);
  handleFileUpload(uploadedFile2);
  handleFileUpload(profile)
};



exports.getMemberDetail=async(req,resp)=>{
    try {
        const{key,value}=req.query;
        const memberData=await REST_API._getDataListById(req,resp,memberModel,key,value);   
    } catch (error) {
        resp.status(500).json(error)
    }
}