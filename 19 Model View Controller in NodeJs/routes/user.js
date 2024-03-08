const express = require("express")
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require('../controllers/user')
const router = express.Router()


router.use((req, res, next) => { // next is the reference to next middleware in the stack
    console.log("Hello from middleware 1");
    next()

})

// REST API 
// get all users
// router.get("/", handleGetAllUsers) // this one and post path are same so let's make their group
router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)


// get each users
router.get("/:id", handleGetUserById)


// Post requests
// router.post('/', handleCreateNewUser)

// Patch requests
router.patch('/:id', handleUpdateUserById)

// Delete requests
router.delete('/:id', handleDeleteUserById)

module.exports = router;


//* Note: instead of /users to get all users we will use / to get all the users
// so we are just removing users