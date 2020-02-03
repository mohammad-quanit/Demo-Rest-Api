const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let result;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1]; //bearer token
    console.log(token);
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Let's pass back the decoded token to the request object
      req.decoded = result;

      // We call next to pass execution to the subsequent middleware
      next();
    } catch (error) {
      res
      .status(401)
      .send({ error: true, message: 'Wrong Token.' });
      // Throw an error just in case anything goes wrong with verification
      // throw new Error(err);
    }
  } else {
    res
      .status(401)
      .send({ error: true, message: 'Authentication error. Token required.' });
  }
};

module.exports = verifyToken;
