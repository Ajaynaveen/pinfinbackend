const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./Routes/EmployeeRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use('/employees', employeeRoutes);

module.exports = app;
