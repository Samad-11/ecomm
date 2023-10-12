import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/productImage");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (!file) {
      cb(null, false);
    }
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jgp" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      console.log(file.mimetype);
      cb(null, false);
    }
  },
});

export default upload;
