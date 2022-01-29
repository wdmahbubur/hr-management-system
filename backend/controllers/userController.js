const db = require('../models')
const nodemailer = require('nodemailer');
const fs = require("fs");
const csv = require("fast-csv");

// create main Model
const User = db.users

// create new user
exports.addUser = async (req, res) => {
    try {
        const userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }

        const user = await User.create(userInfo) // create new user

        if (!user)  // if user is not created
            return res.status(400).json({ error: "New user created failed" });

        res.status(200).json({  // if user is created
            user: user,
            message: "New user created success",
        });
    }
    catch (err) {   // if any error in server
        res.status(500).json({ error: err.message });
    }
}

// get all users

exports.getAllUsers = async (req, res) => {
    const limit = parseInt(req.query.limit);    // get limit
    const offset = parseInt(req.query.page) * limit;    // get offset
    const count = await User.count();   // get count of all users
    const users = await User.findAll({ offset: offset, limit: limit })  // get users
    res.status(200).json({  // send response
        count,
        users
    })
}

// send email to user

exports.sendMail = (req, res) => {
    const transport = nodemailer.createTransport({  // create transport
        host: "smtp.mailtrap.io",
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    const mailOptions = {   // create mail options
        from: 'hr@example.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.body
    };

    transport.sendMail(mailOptions, (error, info) => {  // send mail
        if (error) {    // if error
            return res.status(500).json({ error: error });;
        }
        if (info.messageId) {   // if messageId
            res.status(200).json({  // send response
                body: info.messageId,
                message: "Email sent success"
            })
        }
    });
}

// upload csv file

exports.uploadCSV = async (req, res) => {
    try {
        // email validation
        const emailValidation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]| \\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (req.file == undefined) {    // if file is undefined
            return res.status(400).send("Please upload a CSV file!");
        }

        let validUsers = [];    // create validUsers array
        const invalidUsers = [];    // create invalidUsers array

        let path = __basedir + "/" + req.file.originalname; // get path of file

        fs.createReadStream(path)   // create read stream
            .pipe(csv.parse({ headers: true })) // parse csv file
            .on("error", (error) => {   // if error
                throw error.message;
            })
            .on("data", (row) => {
                const values = Object.values(row);

                // check condition
                if (values[0] && values[1]) { // check first name and last name
                    if (values[2] && emailValidation.test(values[2])) { // check email
                        const newUser = {
                            firstName: values[0],
                            lastName: values[1],
                            email: values[2]
                        }
                        validUsers.push(newUser)    // push new user to validUsers array
                    }
                    else {   // if email is not valid
                        invalidUsers.push(row)  // push invalid user to invalidUsers array
                    }
                }
                else {   // if first name or last name is not exist
                    invalidUsers.push(row)
                }
            })
            .on("end", () => {
                User.bulkCreate(validUsers) // bulk create validUsers
                    .then(() => {
                        res.status(200).json({ // send response
                            message: `${validUsers.length} valid employee added and Found ${invalidUsers.length} invalid employee`,

                        });
                    })
                    .catch((error) => {  // if error
                        res.status(500).json({
                            message: "Fail to import data into database!",
                            error: error.message,
                        });
                    });
            });
    } catch (error) {  // if any error in server
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}