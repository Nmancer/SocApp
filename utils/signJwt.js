const jwt = require("jsonwebtoken");

async function signWithJwt(payload, secret) {
  const token = await jwt.sign(payload, secret, { expiresIn: 36000 });
  return "Bearer " + token;
}

module.exports = {
  signWithJwt
};
