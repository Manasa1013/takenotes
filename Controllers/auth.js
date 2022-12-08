const jwt = require("jsonwebtoken");
const isAuthenticated = async (req,res,next) => {
  try {
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({msg: "Invalid Authentication,provide token"});
    // console.log(token,"token ");
    const decoded = jwt.verify(token, process.env['ACCESS_TOKEN_SECRET']);
    req.userId = decoded.userId;
    
    next();
    
  }catch(err){
    console.error(err,"at authorizing user");
    res.status(401).json({"isAuthenticationUserSuccess" : false, "message" : "Authentication failed with invalid token"})
  }
}

module.exports = { isAuthenticated };