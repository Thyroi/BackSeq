const jwt = require('jsonwebtoken');
require('dotenv').config();

function verify_admin_token(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send({message: "Forbidden Access"});
  }
}

module.exports = verify_admin_token;
