const multer = require("multer");

const storage = multer.diskStorage({
  destination(query, file, cb) {
    cb(null, "public");
  },
  filename(query, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    query.body.fileName = fileName;
    cb(null, fileName);
  },
});

module.exports = multer({ storage });
