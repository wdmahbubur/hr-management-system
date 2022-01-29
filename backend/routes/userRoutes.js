const express = require('express');
const router = express.Router();

// get all function from user controller
const {
    addUser,
    getAllUsers,
    sendMail,
    uploadCSV
} = require('../controllers/userController');

// middleware
const upload = require("../middleware/upload")

//routes
router.post("/users", addUser);
router.post("/users/send-mail", sendMail);
router.post("/users/upload", upload.single('file'), uploadCSV);

router.get("/users", getAllUsers);

module.exports = router;