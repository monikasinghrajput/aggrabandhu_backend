const express=require('express');
const route=express.Router();
const RoleControll=require('./roleController');
const {authenticate,checkPermission }= require('../../middleware/member-middleware');

route.post('/',RoleControll.AddRole);   // For only Testing
route.get('/:id',RoleControll.getData);
route.put("/:id",RoleControll.UpdateRole);


module.exports=route;