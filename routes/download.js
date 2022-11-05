const express = require("express");
const router = express.Router();

// download file
router.get('/', (req, res) => {
    let file_name = req.query.filename;
    // let file_name = "1.png";
    console.log(req.query);
    try {
        const file = `../file-uploader-backend/uploadedFiles/${file_name}`;
        console.log(file);
        res.download(file);
        console.log('here');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;