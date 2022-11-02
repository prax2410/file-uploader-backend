const express = require('express');
const cors = require('cors');
const multer = require('multer')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// import routes
const dataHandlerRoute = require('./routes/dataHandler');
const downloadRoute = require('./routes/download');

// app
const app = express();
const port = process.env.PORT || 8000;

// save file locally
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploadedFiles')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage }).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});

// middlewares
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware
app.use('/getFileNames', dataHandlerRoute);
app.use('/download', downloadRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});