const jwt = require('jsonwebtoken');
const User = require("../member-model");
const RoleControll = require('../../Rolemanagement/roleController'); 
const RoleModel=require('../member-model');
const REST_API = require("../../../utils/crudHelper");


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.validatePassword(password))) {
        
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log(user.id);
      const role=await RoleControll.getDataReturn(req,res,RoleModel,user.id)

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ userid:user.id, token ,role});
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(400).json({ error: 'Failed to login' });
    }
};


