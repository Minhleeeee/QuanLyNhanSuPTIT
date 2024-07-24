const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/submit', (req, res) => {
    const { name, birthdate, hometown, course, major, email, fbLink, phone } = req.body;
    const data = `Name: ${name}, Birthdate: ${birthdate}, Hometown: ${hometown}, Course: ${course}, Major: ${major}, Email: ${email}, FB Link: ${fbLink}, Phone: ${phone}\n`;

    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            console.error('Failed to write to file', err);
            res.status(500).json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

module.exports = router;
