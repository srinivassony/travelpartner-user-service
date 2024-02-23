const express = require('express');

let app = express();
const path = require('path');
const bodyParser = require("body-parser");

let userService = require('../service/user');

app.get('/api/user/details', async(req,res) =>
{
   return res.json(await userService.userDetails());
})

module.exports = app;