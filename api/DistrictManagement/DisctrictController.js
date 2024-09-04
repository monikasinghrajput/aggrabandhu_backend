const REST_API=require('../../utils/crudHelper');
const DistricModel=require('./DistrictModel');


exports.AddDistrict=async(req,resp)=>{
try {
    const AddState=await REST_API._add(req,resp,DistricModel);
} catch (error) {
    resp.status(500).json(error);
}
}

exports.UpdateDistrict=async(req,resp)=>{
    try {
        const UpdateState=await REST_API._update(req,resp,DistricModel);
    } catch (error) {
        resp.status(200).json(error);
    }
}

exports.getDistricts=async(req,resp)=>{
    try {
        // const getState=await REST_API._getAll(req,resp,DistricModel);
        const getDistricts=await DistricModel.findAll({
            attributes:{
                exclude:['updatedAt','createdAt']
            }
        });
        resp.status(200).json(getDistricts);

    } catch (error) {
         resp.status(200).json(error);
    }
}


exports.getDistrictsById=async(req,resp)=>{
    const stateID=req.params.stateID;
    try {
        // const getState=await REST_API._getAll(req,resp,DistricModel);
        const getDistricts=await DistricModel.findAll({
            where:{state_id:stateID},
            attributes:{
                exclude:['updatedAt','createdAt','state_id']
            }
        });
        resp.status(200).json(getDistricts);

    } catch (error) {
         resp.status(200).json(error);
    }
}



exports.deleteDistrict=async(req,resp)=>{
    try {
        const deleteState=await REST_API._delete(req,resp,DistricModel);
    } catch (error) {
        console.log(error);
        console.log(" response defined in previous function ");
    }
}