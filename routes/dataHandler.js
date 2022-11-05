const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require('path');

router.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, '../uploadedFiles');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log("Error")
        }
        return res.status(200).json(files);
    });
});

module.exports = router;
