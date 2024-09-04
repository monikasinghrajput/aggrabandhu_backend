const express=require('express');
const router=express.Router();
const todayBirthController=require('./todayBirthController');


router.get('/',todayBirthController.get);




module.exports=router;