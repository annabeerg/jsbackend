const express = require('express');
const router = express.Router();

const mailModel = require("../models/mailModel")

router.get(
    "/:code/:title/:name/:mottagare",
    async (req, res, next) => {
        let code = req.params.code;
        let title = req.params.title;
        let name = req.params.name;
        let mottagare = req.params.mottagare;

        let string = `${name} has invited you to edit the document named ${title}. 1. Follow the link https://www.student.bth.se/~anbj21/editor/ and register your user. 2. Enter the code ${code} on the next page to have access to edit the document.`;
        try {
            await mailModel.sendMail(mottagare, 'anna.berg.privat@gmail.com', "Invite to edit document", string);
    
            res.send("The email has arrived!")
        } catch(error) {
            console.log(error);
        }
    }
);


module.exports = router;
