const multer = require("multer");

const csvFilter = (req, file, cb) => { // filter csv file
    if (file.mimetype.includes("application/vnd.ms-excel")) { // if csv file
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};

var storage = multer.diskStorage({ // multer storage
    destination: (req, file, cb) => {
        cb(null, __basedir + "/"); // upload file to backend/
    },
    filename: (req, file, cb) => { // rename file
        cb(null, file.originalname);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;