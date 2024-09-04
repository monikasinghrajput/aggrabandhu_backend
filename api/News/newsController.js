const REST_API = require("../../utils/crudHelper");
const NewsModel=require('./newsModel');


exports.addNews=async(req,resp)=>{
    try {
        const addNews=await REST_API._add(req,resp,NewsModel);

    } catch (error) {
        console.log(error);
        resp.status(500).json(error);
    }

}

exports.updateNews=async(req,resp)=>{
    try {
        const updateNews=await REST_API._update(req,resp,NewsModel);

    } catch (error) {
        console.log(error);
        resp.status(500).json(error);
    }

}

exports.deleteNews=async(req,resp)=>{
    try {
        const deleteNews=await REST_API._delete(req,resp,NewsModel);
    } catch (error) {
        console.log(error);
        resp.status(500).json(error);
    }
}
exports.getNews=async(req,resp)=>{
    try {
        const getNews=await REST_API._getAll(req,resp,NewsModel);
    } catch (error) {
        console.log(error);
        resp.status(500).json(error);
    }
}

exports.getNewsById=async(req,resp)=>{
    const key=req.query.key;
    const value=req.query.value;
    try {
        const getData=await REST_API._getDataListById(req,resp,NewsModel,key,value);  
    } catch (error) {
        resp.status(500).json(error);
    }
}