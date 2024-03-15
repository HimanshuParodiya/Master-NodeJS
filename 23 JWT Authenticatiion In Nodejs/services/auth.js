const jwt = require("jsonwebtoken");

const secretKey = "SecretKey@123#23$";

function setUser(user) {
    // Creating token of type payload and a secret key (secret key is a stamp on ticket)
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secretKey);

}

function getUser(token) {
    // verifying token 
    if (!token) return null; // if token is not there
    try {
        return jwt.verify(token, secretKey);

    } catch (error) {
        console.error("JWT verification error:", error.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};
