const express = require('express');
const router = express.Router();
const NewsController=require('./newsController');
const { checkPermission,authenticate}=require('../../middleware/member-middleware');




router.post('/',NewsController.addNews);    ///   authenticate,checkPermission('add','newsrole'),
router.get('/',authenticate,checkPermission('view','newsrole'),  NewsController.getNews); ///authenticate,checkPermission('view','newsrole'),
router.put('/:id',NewsController.updateNews);  // authenticate,checkPermission('edit','newsrole'),
router.delete('/:id', NewsController.deleteNews);//authenticate,checkPermission('delete','newsrole'),
router.get('/detail',NewsController.getNewsById);  // authenticate,checkPermission('view','newsrole'),tt



module.exports=router;//this is routes