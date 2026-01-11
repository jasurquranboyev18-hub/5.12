const express = require("express");
const upload = require("../utils/multer");

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Fayl yuborilmadi" });
  }

  res.status(201).json({
    message: "Fayl muvaffaqiyatli yuklandi",
    file: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});

module.exports = router;