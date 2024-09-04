const path = require('path');
const uploadsFolder = path.join(__dirname,  '../../uploads');
const uploadsDonationDetail = path.join(__dirname,  '../../uploads/DonationDetail');
const uploadsPayments = path.join(__dirname,  '../../uploads/payments');
const uploadGallery = path.join(__dirname,  '../../uploads/gallery');
const notification=path.join(__dirname,'../../uploads/notification');


const fs = require('fs');

exports.get=(req, res) => {
    const { id, filename } = req.params;
    const idFolderPath = path.join(uploadsFolder, id);
    const filePath = path.join(idFolderPath, filename);
    console.log(filePath)
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).send('File not found');
      }
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Error sending file');
        }
      });
    });

};
exports.getDonation=(req, res) => {
  const { id, filename } = req.params;
  const idFolderPath = path.join(uploadsDonationDetail, id);
  const filePath = path.join(idFolderPath, filename);
  console.log(filePath)
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  });

};

exports.getPayment=(req, res) => {
  const { id, filename } = req.params;
  const idFolderPath = path.join(uploadsPayments, id);
  const filePath = path.join(idFolderPath, filename);
  console.log(filePath)
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  });

};
exports.galleryUploads=(req, res) => {
  const { id, filename } = req.params;
  const idFolderPath = path.join(uploadGallery, id);
  const filePath = path.join(idFolderPath, filename);
  console.log(filePath)
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  });

};

exports.notification=(req, res) => {
  const { id, filename } = req.params;
  const idFolderPath = path.join(notification, id);
  const filePath = path.join(idFolderPath, filename);
  console.log(filePath)
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  });
};

