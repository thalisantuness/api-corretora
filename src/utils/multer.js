const multer = require('multer');
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Arquivo não é uma imagem válida!'), false); 
    }
};


const upload = multer({
    storage,
    limits: { fileSize: 900 * 1024 * 1024 },  
    fileFilter,
}).single('file');  

module.exports = upload;
