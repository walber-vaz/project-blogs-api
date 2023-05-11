require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (userDataValeu) => {
  try {
    const config = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ payload: userDataValeu }, secret, config);

    return token;
  } catch (error) {
    return `Error interno: ${error.message}`;
  }
};

module.exports = generateToken;