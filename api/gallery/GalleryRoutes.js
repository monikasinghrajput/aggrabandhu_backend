const express = require('express');
const router = express.Router();
const GalleryControll=require('./GalleryController');




router.get('/',GalleryControll.getGallery);
router.post('/',GalleryControll.addGallery);
router.delete('/:id',GalleryControll.deleteGallery);


module.exports=router;