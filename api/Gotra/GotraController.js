const REST_API=require('../../utils/crudHelper');
const GotraModel=require('./GotraModel');


exports.getGotra=async(req,resp)=>{
try {
    // const getGotra=await REST_API._getAll(req,resp,GotraModel);
    const getGotra=await GotraModel.findAll({
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    });
    resp.status(200).json(getGotra);

} catch (error) {
    resp.status(500).json(error);
}
}
exports.addGotra=async(req,resp)=>{
    try {
        const data=await REST_API._add(req,resp,GotraModel);
    } catch (error) {
       resp.status(500).json(error);
    }
}


exports.updateGotra=async(req,resp)=>{
    try {
        const updateGotra=await REST_API._update(req,resp,GotraModel);
    } catch (error) {
       resp.status(500).json(error);
    }
}


exports.deleteGotra=async(req,resp)=>{
    try {
        const deleteGotra=await  REST_API._delete(req,resp,GotraModel);
    } catch (error) {
       resp.status(500).json(error);
    }
}