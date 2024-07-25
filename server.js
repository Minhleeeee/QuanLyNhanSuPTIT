const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5500;

const routes = require('./routes/router'); // Đảm bảo đường dẫn này là chính xác

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Đảm bảo 'public' là thư mục chứa các file tĩnh như index.html, main_v2.js, v.v.

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
