const express = require('express');
const router = express.Router();
const DistrictControll=require('./DisctrictController');


router.get('/',DistrictControll.getDistricts);
router.post('/',DistrictControll.AddDistrict);
router.put('/:id',DistrictControll.UpdateDistrict);
router.delete('/:id',DistrictControll.deleteDistrict);
router.get('/:stateID',DistrictControll.getDistrictsById);





module.exports=router;