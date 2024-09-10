


const memberController=require('./member-controllers');
const LoginMemberController=require('./MemberShipLogin/membershipController');
const express = require('express');
const router = express.Router();
const RoleAuth=require('../../middleware/member-middleware');
const { checkPermission, authenticate }=require('../../middleware/member-middleware');



/// For Only CRUD 
router.get('/', memberController.getMembers);  // authenticate,checkPermission('view','memberrole'),
router.post('/',memberController.memberAdd); 
router.put('/:id', memberController.updateMember); //authenticate,checkPermission('edit','memberrole') ,
router.delete('/:id', memberController.deleteMember);  //authenticate,checkPermission('delete','memberrole'),
router.get('/detail/', memberController.getMemberById);    // Use in this key and value like /detail?key=id&&value=idvalue  /// authenticate,checkPermission('view','memberrole'),
router.post('/login',LoginMemberController.login);

/// FOR OTP`S AND Filtering  
router.post('/otp',memberController.otp); // for sending verification 
router.post('/verifyotp',memberController.verifyOTP); // for verify verification 
router.post('/verify/:id',memberController.varify);///For Forget Password
router.post('/forget-password/:id',memberController.forgetPassword); /// For forget password
router.get('/pagination/:page/:pageSize',memberController.membergetsByPagination);




/// checkPermission('view','memberrole'),    {  'action','role'  }

// FOR OTP SEND AND VARIFY
//  Route=  /api/member/otp { For send Otp }
//  Route= /api/member/verifyotp   { For Verify OTP }




/////  For test Uploading  

// router.post('/uploads',memberController.test)



module.exports = router;
