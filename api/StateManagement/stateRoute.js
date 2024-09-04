const express = require('express');
const router = express.Router();
const StateController=require('./stateController');


router.get('/',StateController.getStates);
router.post('/',StateController.AddState);
router.put('/:id',StateController.UpdateState);
router.delete('/:id',StateController.deleteState);





module.exports=router;