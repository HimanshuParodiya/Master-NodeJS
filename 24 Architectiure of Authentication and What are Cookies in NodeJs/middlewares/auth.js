const { getUser } = require("../services/auth");


async function restrictToLoggedInUSerOnly(req, res, next) {
    // getting userId from cookie
    // const userUid = req.cookies?.uid; // now we don't have cookies 
    const userUid = req.header["authorization"]
    // right now userUid is something like -> "Bearer token"


    // if userId is not present redirect to login page
    if (!userUid) {
        return res.redirect('/login')
    }
    const token = userUid.split("Bearer ")[1] // now we only have token in array so after removing bearer we are picking 1 element from an array  

    // getting user of userId in cookie
    const user = getUser(token);
    // if we are not getting user  redirect to login page    
    if (!user) {
        return res.redirect('/login')
    }

    // if we get the user then store the user in req 
    req.user = user;
    // and call the next function/middleware
    next()

}

async function checkAuth(req, res, next) {
    // const userUid = req.cookies?.uid; // now we don't have cookies 
    const userUid = req.header["authorization"]
    // right now userUid is something like -> "Bearer token"
    const token = userUid.split("Bearer ")[1] // now we only have token in array so after removing bearer we are picking 1 element from an array  

    const user = await getUser(token);
    req.user = user;
    next()
}

module.exports = {
    restrictToLoggedInUSerOnly,
    checkAuth
}