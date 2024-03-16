const { v4: uuidV4 } = require("uuid")
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
    // extracting data from req
    const { name, email, password } = req.body;

    // creating new user by passing data
    await User.create({
        name,
        email,
        password
    })

    // if new user is successfully created then in response render home page
    // return res.render("home")
    return res.redirect("/")
}

async function handleUserLogin(req, res) {
    // extracting data from req for login
    const { email, password } = req.body;
    // finding user by passing data
    const user = await User.findOne({ email, password })

    // if user is not there
    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password"
        })
    }

    // now with jwt no need of sessionID
    // const sessionID = uuidV4();
    const token = setUser(user);
    // res.cookie("uid", token)
    // if user is successfully found then in response render home page
    // return res.redirect("/")

    // now we will not use cookies
    return res.json({ token })
}



module.exports = {
    handleUserSignup, handleUserLogin
}
// now we have cookie with session uid