const fs=require('fs');


async function _addGallery(req,resp,model,url ) {
    try {
    const newGalleryEntry =await model.create({
        type:req.body.type,
        description:req.body.description,
        uploaded_by:req.body.uploaded_by,
    })
    console.log(newGalleryEntry);
        resp.status(200).json(newGalleryEntry);
    } catch (error) {
        resp.status(500).json(error)
    }
}


const _getAll = async (req, res, model) => {
    try {
      const response = await model.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};



const _delete = async (req, res, model) => {
    try {
      const { id } = req.params; 
      const record = await model.findByPk(id);
      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }
  
      
      const filePath = record.filepath; 
      fs.unlink(filePath, async (err) => {
        if (err && err.code === 'ENOENT') {
          console.log('File not found, but proceeding with deletion from database.');
        } else if (err) {
          throw err; 
        }
  
        const response = await model.destroy({
          where: {
            id: id, 
          },
        });
  
        if (response === 0) {
          return res.status(404).json({ error: "Record not found" });
        }
  
        res.status(200).json({ message: "Deletion successful" });
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
    _addGallery,
    _getAll,
    _delete
};
