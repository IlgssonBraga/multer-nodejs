const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const multerConfig = require('./config/multer');


const app = express();

const upload = multer(multerConfig);

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.post('/', upload.single('file'), (req, res) => {
    const {filename} = req.file;

    console.log(`http://localhost:3333/files/${filename}`);

    return res.json({message: 'ok'});
});

app.delete('/del/:name', (req, res, next) => {
    const {name} = req.params;
    try {
        fs.unlink(path.resolve(__dirname, '..', 'tmp', name), (err) => {
            if(err){
                next(err);
            }
        });
        return res.json({message: "Success"})
    } catch (error) {
        return res.status(404).json({message: "Error"})   
    }

    

});

app.listen(3333);