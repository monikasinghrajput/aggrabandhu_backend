const express = require('express');
const router = express.Router();
const GotraController=require('./GotraController');

router.get('/',GotraController.getGotra);
router.post('/',GotraController.addGotra);
router.put('/:id',GotraController.updateGotra);
router.delete('/:id',GotraController.deleteGotra);





module.exports=router;