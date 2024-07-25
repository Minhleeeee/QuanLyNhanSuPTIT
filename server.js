const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5500;

const routes = require('./routes/router'); // Đảm bảo đường dẫn này là chính xác

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Đảm bảo 'public' là thư mục chứa các file tĩnh như index.html, main_v2.js, v.v.

// Personal Access Token từ GitHub
const GITHUB_TOKEN = 'your_personal_access_token';
const GITHUB_USERNAME = 'your_github_username';
const GITHUB_REPO = 'your_github_repo';
const FILE_PATH = 'path/to/formData.txt';

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    // Prepare the data to be written to the file
    const data = `Name: ${name}, Email: ${email}\n`;

    try {
        // Lấy nội dung file hiện tại từ GitHub
        const response = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        const fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
        const updatedContent = fileContent + data;

        // Cập nhật nội dung file trên GitHub
        await axios.put(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            message: 'Update form data',
            content: Buffer.from(updatedContent).toString('base64'),
            sha: response.data.sha
        }, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        res.send('Form data saved successfully');
    } catch (err) {
        console.error('Failed to update file on GitHub', err);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
