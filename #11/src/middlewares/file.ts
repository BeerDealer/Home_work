import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public");
  },
  filename(query, file, cb) {
    const fileName: string = `${Date.now()}-${file.originalname}`;
    query.body.fileName = fileName;
    cb(null, fileName);
  },
});

export default storage;
