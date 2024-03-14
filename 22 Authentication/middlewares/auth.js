const { getUser } = require("../services/auth");


async function restrictToLoggedInUSerOnly(req, res, next) {
    // getting userId from cookie
    const userUid = req.cookies?.uid;

    // if userId is not present redirect to login page
    if (!userUid) {
        return res.redirect('/login')
    }

    // getting user of userId in cookie
    const user = await getUser(userUid);
    // if we are not getting user  redirect to login page    
    if (!user) {
        return res.redirect('/login')
    }

    // if we get the user then store the user in req 
    req.user = user;
    // and call the next function/middleware
    next()

}

module.exports = {
    restrictToLoggedInUSerOnly
}