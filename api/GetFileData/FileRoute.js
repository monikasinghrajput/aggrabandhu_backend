const express=require('express');
const router=express.Router();
const FileController=require('./FileController');



router.get('/:id/:filename',FileController.get);
router.get('/donation/:id/:filename',FileController.getDonation);
router.get('/gallery/:id/:filename',FileController.galleryUploads);
router.get('/payments/:id/:filename',FileController.getPayment);
router.get('/notification/:id/:filename',FileController.notification);


module.exports=router;