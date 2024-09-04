const REST_API=require('../../utils/crudHelper');
const StatesModel=require('./stateModel');


exports.AddState=async(req,resp)=>{
try {
    const AddState=await REST_API._add(req,resp,StatesModel);
} catch (error) {
    resp.status(500).json(error);
}
}

exports.UpdateState=async(req,resp)=>{
    try {
        const UpdateState=await REST_API._update(req,resp,StatesModel);
    
    } catch (error) {
        resp.status(500).json(error);
    }
}

exports.getStates=async(req,resp)=>{
    try {
        // const getState=await REST_API._getAll(req,resp,StatesModel);
        const getState=await StatesModel.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        });
        resp.status(200).json(getState);

    } catch (error) {
         resp.status(500).json(error);
    }
}

exports.deleteState=async(req,resp)=>{
    try {
        const deleteState=await REST_API._delete(req,resp,StatesModel);
    } catch (error) {
        console.log(error);
        console.log(" response defined previous function ")
    }
}