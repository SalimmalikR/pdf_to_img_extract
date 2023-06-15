const { convert } = require('pdf-poppler');
const path = require('path');
const CustomError = require('../utils/customerr');

const extract = async (req, res, next) => {
  try {
    const pdfFile = req.files[0]; // Use req.files instead of req.file
    if (!pdfFile) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }
    const pdfPath = pdfFile.path;

    const imagePath = path.join(__dirname, '..', 'images');

    const options = {
      format: 'jpeg',
      out_dir: imagePath,
      out_prefix: 'image',
      page: null
    };

    await convert(pdfPath, options);

    res.status(200).json({
      statuscode: 200,
      status: 'success',
      message: 'Success converting PDF to images'
    });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Error converting PDF to images' });
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = extract;
