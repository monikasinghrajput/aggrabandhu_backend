const REST_API = require("../../utils/crudHelper");
const NotificationModel=require('./notificationModel');
const fs=require('fs');
const path=require('path');
const baseUploadsFolder = path.join(__dirname, '../../', 'uploads/notification');
const { Op } = require('sequelize');


exports.add= async (req,resp)=>{
    try {
        const add=await  NotificationModel.create(req.body);
        if(req.files){
            const updatepath=await NotificationModel.update(
                { file:`http://localhost:7000/api/file/notification/${add.id}/${req.files.file.name}`
                 },
                {
                  where: { id: add.id }
                }
              )
            test(req,resp,add.id);
        }
        resp.status(200).json(add);
    } catch (error) {
        resp.status(500).json(error);
    }
}


exports.get = async (req, resp) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { startDate, endDate } = req.query;
    const whereCondition = startDate && endDate ? {
      createdAt: {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      }
    } : {};
    const { count, rows } = await NotificationModel.findAndCountAll({
      where: whereCondition,
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
    resp.status(500).json(error);
  }
};




exports.delete=async(req,resp)=>{
  try {
    const dele=await NotificationModel.destroy({where:{
      id:req.params.id
    }});    
    resp.status(200).json({message:"notification deleted"})
  } catch (error) {
    resp.status(500).json(error);
  }
}


exports.update=async(req,resp)=>{
  try {
    const upd=await NotificationModel.update(req.body,{where:{
      id:req.params.id
    }});
    if(req.files){
      const updatepath=await NotificationModel.update(
          { file:`http://localhost:7000/api/file/notification/${req.params.id}/${req.files.file.name}`
           },
          {
            where: { id: req.params.id }
          }
        )
      test(req,resp,req.params.id);
    }
    console.log(upd);
    resp.status(200).json({message:"Notificatoin  Updated!"});

  } catch (error) {
    resp.status(500).json(error);
  }
}





if (!fs.existsSync(baseUploadsFolder)) {
    fs.mkdirSync(baseUploadsFolder, { recursive: true });
}
  
const test = async (req, resp, id) => {
    let uploadedFile = req.files.file;
    if (!uploadedFile) {
  
      console.log('  No file uploaded');
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
    // handleFileUpload(uploadedFile2);
};