const multer = require('multer')

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
        console.log(`${Date.now()}.${ext}`)
        cb(null, `${Date.now()}.${ext}`) // Set the filename as the original name without modification
  }
});

export const upload = multer({ storage });
