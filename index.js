const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;

app.use(express.json());

require('./config/dbconfig')();
require('./startup/routes')(app);

const server = app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  
module.exports = server;