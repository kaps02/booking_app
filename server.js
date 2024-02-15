// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');
const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', indexRouter);

// Sync database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database: ', err);
});

const PORT = 5000;
app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
});
