const Tesseract = require('tesseract.js');
// const sharp = require('sharp');



async function processPanCard(text, providedPanCard) {
  const panNumber = extractPanNumber(text);
  if (panNumber) {
    console.log('Extracted PAN Number:', panNumber);
    const isValid = validatePanNumber(panNumber);
    return {
      panNumber,
      valid: isValid,
      matched: panNumber === providedPanCard
    };
  } else {
    return { error: 'No PAN number found.' };
  }
}

async function processVoterId(text, providedVoterId) {
  const voterId = extractVoterId(text);
  if (voterId) {
    console.log('Extracted Voter ID:', voterId);
    const isValid = validateVoterId(voterId);
    return {
      voterId,
      valid: isValid,
      matched: voterId === providedVoterId
    };
  } else {
    return { error: 'No Voter ID found.' };
  }
}
async function processAadhaarCard(text, providedAadhaarCard) {
  const aadhaarNumber = extractAadhaarNumber(text);
  if (aadhaarNumber) {
    console.log('Extracted Aadhaar Number:', aadhaarNumber);
    const isValid = validateAadhaarNumber(aadhaarNumber);
    return {
      aadhaarNumber,
      valid: isValid,
      matched: aadhaarNumber === providedAadhaarCard
    };
  } else {
    return { error: 'No Aadhaar number found.' };
  }
}
async function processImage(req, res) {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const file = req.files.file;
    const imageBuffer = file.data;

    const processedImageBuffer = await sharp(imageBuffer)
      .resize(1024)
      .toBuffer();

    const { data: { text } } = await Tesseract.recognize(
      processedImageBuffer,
      'eng',
      {
        logger: info => console.log(info)
      }
    );

    console.log('Extracted Text:', text);




    const processors = {
      'Pan card': processPanCard,
      'aadhar card': processAadhaarCard,
      'Voter ID': processVoterId  ,
      'Driving License': processDrivingLicense
    };
    

 
    const processor = processors[req.body.type_id];
    if (processor) {
      const result = await processor(text, req.body.number);

      if (result.error) {
        return res.status(400).json({ message: result.error });
      }

      return res.json(result);
    } else {
      return res.status(400).json({ message: 'Invalid type_id provided.' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
async function TransactionIdExtracting(filedata,transactionId) {
  try {
    const imageBuffer = filedata;

    const processedImageBuffer = await sharp(imageBuffer)
      .resize(1024)
      .toBuffer();

    const { data: { text } } = await Tesseract.recognize(
      processedImageBuffer,
      'eng',
      {
        // logger: info => console.log(info)
      }
    );

    // console.log('Extracted Text:', text);




    const processors = {
     
      'Transaction ID': processTransactionId
    };
    

 
    const processor = processors["Transaction ID"];

    if (processor) {
      const result = await processor(text,transactionId);

      if (result.error) {
        return  result.error 
      }

      return (result);
    } else {
      return  'Invalid type_id provided.' 
    }
  } catch (error) {
    console.error('Error:', error);
       return  'Internal server error'
  }
}
function extractTransactionId(text) {
  const transactionIdRegex = /Transaction ID\s*([A-Z0-9]{10,30})/;
  const match = text.match(transactionIdRegex);
  return match ? match[1] : null;
}


function validateTransactionId(number) {
  return /^[A-Z0-9]{10,20}$/.test(number);
}

async function processTransactionId(text, providedTransactionId) {
  const transactionId = extractTransactionId(text);
  if (transactionId) {
    console.log('Extracted Transaction ID:', transactionId);
    const isValid = validateTransactionId(transactionId);
    return  transactionId
  } else {
    return { error: 'No Transaction ID found.' };
  }
}


function extractPanNumber(text) {
  const panRegex = /\b[A-Z]{5}\d{4}[A-Z]\b/;
  const match = text.match(panRegex);
  return match ? match[0] : null;
}

function validatePanNumber(number) {
  return /^[A-Z]{5}\d{4}[A-Z]$/.test(number);
}

function extractAadhaarNumber(text) {
  const aadhaarRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
  const match = text.match(aadhaarRegex);
  return match ? match[0].replace(/\s+/g, '') : null;
}

function validateAadhaarNumber(number) {
  return /^\d{12}$/.test(number);
}



function extractVoterId(text) {
  const voterIdRegex = /\b[A-Z0-9]{10}\b/;
  const match = text.match(voterIdRegex);
  return match ? match[0] : null;
}

function validateVoterId(number) {
  return /^[A-Z0-9]{10}$/.test(number); 
}


function extractDrivingLicenseNumber(text) {
  const drivingLicenseRegex = /\b[A-Z]{2}\d{2}\s?\d{2}\s?\d{4}\s?\d{4}\b/;
  const match = text.match(drivingLicenseRegex);
  return match ? match[0].replace(/\s+/g, '') : null;
}

function validateDrivingLicenseNumber(number) {
  return /^[A-Z]{2}\d{2}\d{2}\d{4}\d{4}$/.test(number); 
}

async function processDrivingLicense(text, providedDrivingLicense) {
  const drivingLicenseNumber = extractDrivingLicenseNumber(text);
  if (drivingLicenseNumber) {
    console.log('Extracted Driving License Number:', drivingLicenseNumber);
    const isValid = validateDrivingLicenseNumber(drivingLicenseNumber);
    return {
      drivingLicenseNumber,
      valid: isValid,
      matched: drivingLicenseNumber === providedDrivingLicense
    };
  } else {
    return { error: 'No Driving License number found.' };
  }
}






function extractAmountFromText(text) {
  const amountRegex = /₹\s*(\d+(?:[\.,]\d*)?)/g;
  let amounts = [];
  let match;
  while ((match = amountRegex.exec(text)) !== null) {
    let amount = match[1].replace(',', '.');
    amounts.push(parseFloat(amount));
  }
   return amounts.length > 0 ? amounts : null;
}




module.exports = {
  processImage,
  TransactionIdExtracting
};
