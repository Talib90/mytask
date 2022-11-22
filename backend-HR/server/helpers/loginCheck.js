require("dotenv").config();

const jwt = require("jsonwebtoken");
// (PRIVATE_KEY = process.env.PRIVATE_KEY),
async function createJwt(att) {
  let keys = Object.keys(att);

  var tokAtt = {};
  for (var i = 0; i < keys.length; i++) {
    var newKey = keys[i];
    tokAtt[newKey] = att[newKey];
  }

  var token = jwt.sign(tokAtt, process.env.PRIVATE_KEY, { expiresIn: "48h" });

  return token;
}

async function validateJwt(token, att) {
  var tokenDec = await jwt.verify(token, process.env.PRIVATE_KEY);

  let keys = Object.keys(att);

  var valid = true;
  for (var i = 0; i < keys.length; i++) {
    var newKey = keys[i];

    if (tokenDec[newKey] != att[newKey]) {
      valid = false;
      break;
    }
  }

  return valid;
}

module.exports = { createJwt, validateJwt };
