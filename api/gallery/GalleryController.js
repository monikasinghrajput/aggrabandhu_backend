const crud=require('../../utils/multerFileCRUD/crud');
const GalleryModel=require('./GalleryModel');
const fs=require('fs');
const path=require('path');

const baseUploadsFolder = path.join(__dirname, '../../', 'uploads/gallery');

exports.addGallery=async(req,resp)=>{
    try {
        const add=await   GalleryModel.create(req.body);
        const updatepath=await GalleryModel.update(
            { url:`http://localhost:7000/api/file/gallery/${add.id}/${req.files.file.name}`
          },
            {
              where: { id: add.id }
            }
          
          )
        test(req,resp,add.id);
        resp.status(200).json(add);
    } catch (error) {
        resp.status(200).json(error)
    }
}

exports.getGallery=async(req,resp)=>{
    try {
        const getGallery=await  crud._getAll(req,resp,GalleryModel);
    } catch (error) {
        console.log("response is defined into _getAll function ");

    }
}

exports.deleteGallery=async(req,resp)=>{
    try {
        const deleteGallery=await crud._delete(req,resp,GalleryModel);
    } catch (error) {
      console.log("response is defined  into _delete ",error);
      ///resp. do not here set 
        
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