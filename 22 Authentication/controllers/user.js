const User = require("../models/user")

async function handleUserSignup(req, res) {
    // extracting data from req
    const { name, email, password } = req.body;

    // creating new user by passing data
    await User.create({
        name,
        email,
        password
    })

    return res.render("home")
}


module.exports = {
    handleUserSignup
}