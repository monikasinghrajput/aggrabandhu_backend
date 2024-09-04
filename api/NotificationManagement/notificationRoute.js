const express=require('express');
const router=express.Router();
const NotificationControll=require('./notificationController');


router.post('/',NotificationControll.add);
router.get('/',NotificationControll.get);
router.delete('/:id',NotificationControll.delete);
router.put('/:id',NotificationControll.update);





module.exports=router;