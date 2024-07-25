const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5500;

const routes = require('./routes'); // Đảm bảo đường dẫn này là chính xác

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
