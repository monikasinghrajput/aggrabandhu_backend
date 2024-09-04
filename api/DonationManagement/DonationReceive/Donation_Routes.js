const express = require('express');
const router = express.Router();
const DonationController=require('./Donation_controll');
const {checkPermission,authenticate}=require('../../../middleware/member-middleware');


// without member detail in  get data with id  /detail

router.get('/', DonationController.getDonationReceivers); //authenticate,checkPermission('view','donationrole'),
router.post('/', DonationController.DonationReceive); //authenticate,checkPermission('add','donationrole'),
router.put('/:id', DonationController.updateDonationReceives); // authenticate,checkPermission('edit','donationrole'),
router.delete('/:id',DonationController.deleteDonationReceive); //authenticate,checkPermission('delete','donationrole'),
router.get('/detail',DonationController.getDonationReceiversById); //authenticate,checkPermission('view','donationrole'),
router.get('/active',DonationController.getActiveDonation);///   For active Donation list 
router.get('/getOne/:id',DonationController.getOne);  //  This Route for payment fetched based donation id 


module.exports = router;