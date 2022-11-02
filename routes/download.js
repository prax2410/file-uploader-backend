const express = require("express");
const router = express.Router();

// download file
router.get('/', (req, res) => {
    let file_name = req.query.filename;
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

// router.param("/:fName", (req, res, next, fname) => {
//     try {
//         const file = `../file-uploader-backend/uploadedFiles/${fname}`;
//         console.log(file);
//         res.download(file);
//         console.log('here');
//     } catch (err) {
//         console.log(err);
//     }
// });

module.exports = router;