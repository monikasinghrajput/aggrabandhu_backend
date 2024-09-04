const express = require('express');
const router = express.Router();
const DonationController=require('./Donation_Controller');
const {authenticate,checkPermission}=require('../../../middleware/member-middleware');



router.get('/',DonationController.getDonations);   // authenticate,checkPermission('view','donationrole'),
router.post('/',DonationController.DonationCreate);//authenticate,checkPermission('add','donationrole'),
router.put('/:id',DonationController.updateDonation);//authenticate,checkPermission('edit','donationrole'),
router.delete('/:id',DonationController.deleteDonation);//,authenticate,checkPermission('delete','donationrole')
router.get('/detail',DonationController.getDonationById);   // for it require { ? key=? && value=?  }   ,authenticate,checkPermission('view','donationrole')



module.exports = router;