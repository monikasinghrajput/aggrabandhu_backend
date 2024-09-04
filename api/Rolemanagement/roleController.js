const REST_API=require('../../utils/crudHelper');
const RoleModel=require('./roleManagementModel');

exports.AddRole=async(req,resp,id)=>{
    try {
        console.log(req.body);
        const  test =await REST_API._add(req,resp,RoleModel);
    }
     catch (error) {
     console.log(error);   
     console.log('response defined previous function ')
    }
}

exports.getData=async(req,resp)=>{
    try {
        const data=await REST_API.RoleData(req,resp,RoleModel);
        console.log(data)
        if (data.length === 0) {
            return resp.status(404).json({ message: 'No data found' });
          }
        else{
            const newsrole=JSON.parse(data[0].newsrole);
            const userrole=JSON.parse(data[0].userrole);
            const memberrole=JSON.parse(data[0].memberrole)
            const newData={
                "newsrole":newsrole,
                "userrole":userrole,
                "memberrole":memberrole
            }
            console.log(newData)
        //    return (newData);

            resp.status(200).json(newData);
        }
     
    } catch (error) {
        console.log(error)
        resp.status(500).json("internal server error")
    }
}


exports.getDataReturn=async(req,resp,model,id)=>{
    try {
        const data=await REST_API.RoleDataReturn(req,resp,RoleModel,id);
        if (data.length === 0) {
            return resp.status(404).json({ message: 'No data found' });
          }
        else{
            const newsrole=JSON.parse(data[0].newsrole);
            const userrole=JSON.parse(data[0].userrole);
            const memberrole=JSON.parse(data[0].memberrole)
            const donationrole=JSON.parse(data[0].donationrole);
            const newData={
                "newsrole":newsrole,
                "userrole":userrole,
                "memberrole":memberrole,
                "donationrole":donationrole
            }
            // console.log(newData)
           return (newData);

            // resp.status(200).json(newData);
        }
     
    } catch (error) {
        console.log(error)
        resp.status(500).json("internal server error")
    }
}

exports.UpdateRole=async(req,resp)=>{
    // if(req.user!=="admin"){
    //    return resp.status(403).json({message:"Not a Admin "})
    // }
    try {
        const updateRole=await REST_API._updateRole(req,resp,RoleModel);
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:error});   
    }
}