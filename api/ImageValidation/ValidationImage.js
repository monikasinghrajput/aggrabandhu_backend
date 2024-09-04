const express=require('express');
const router=express.Router();
const ImageValidation=require('./ImageValidation');


router.post('/',(req,resp)=>{
    ImageValidation.processImage(req,resp);
});



module.exports=router;