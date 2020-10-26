const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token") || req.query.token;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized Access.", status: 401 });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ msg: "Invalid Token.", status: 400, error });
    }
  }
};

module.exports = auth;
