const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 80; // Sửa lại cách định nghĩa biến port

const routes = require('./routes');

app.use(bodyParser.json());
app.use(cors()); // Cấu hình CORS
app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
