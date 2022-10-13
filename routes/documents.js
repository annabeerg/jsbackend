var express = require('express');
var router = express.Router();

const app = express();

const docsModel = require("../models/docsModel")
const usersModel = require("../models/users");

router.get(
    "/",
    (req, res, next) => usersModel.checkToken(req, res, next),
    async (req, res) => {
        const docs = await docsModel.getAllDocs();
    
        return res.json({
            data: docs
        });
    }
);

router.post(
    "/",
    async (req, res) => {
        const newDoc = req.body;

        const result = await docsModel.insertDoc(newDoc);

        return res.status(201).json({ data: result});
    }
);

router.get(
    "/one/:id",
    async (req, res) => {
        const result = await docsModel.getOneDocs(req.params.id);

        return res.status(202).json({ data: result});
    }
);

router.get(
    "/update/:id/:title/:message",
    async (req, res) => {
        const result = await docsModel.updateDoc(req.params.id, req.params.title, req.params.message);

        return res.status(201).json({ data: result});
    }
);

router.get(
    "/add/:id/:key",
    async (req, res) => {
        console.log(req.params.key)
        const result = await docsModel.appendAllowed(req.params.id, req.params.key);

        return res.status(201).json({ data: result});
    }
);

router.get(
    "/comment/:id/:line/:comment/:content",
    async (req, res) => {
        console.log(req.params.key)
        const result = await docsModel.appendComment(req.params.id, req.params.line, req.params.comment, req.params.content);

        return res.status(201).json({ data: result});
    }
);


router.get(
    "/init",
    async (req, res) => {
        await docsModel.init();

        res.send("finally");
    }
);

module.exports = router;
