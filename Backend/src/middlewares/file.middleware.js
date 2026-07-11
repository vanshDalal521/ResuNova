const multer = require("multer")

const ALLOWED_MIMES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
const MAX_SIZE = 5 * 1024 * 1024

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_MIMES.includes(file.mimetype)) {
            return cb(new Error("Only PDF and DOCX files are allowed"))
        }
        cb(null, true)
    },
})

module.exports = upload
