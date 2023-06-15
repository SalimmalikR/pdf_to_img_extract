const path = require('path');
const CustomError = require('../utils/customerr');

const preview = (req, res, next) => {
  const imageName = req.params.imageName;
  const imagePath = path.join('E:\\pdf_to_img\\images', imageName);
  

  // Set the appropriate content type in the response headers
  res.set('Content-Type', 'image/jpeg');

  // Send the file to the client
  res.sendFile(imagePath, (error) => {
    if (error) {
      // res.status(500).json({ error: 'Internal server error.' });
      const err = new CustomError(404, error.message);
      return next(err);
    }
  });
};

module.exports = preview;
