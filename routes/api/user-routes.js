const router = require('express').Router();
const {
    createUser,
    getUser,
    getSingleUser,
} = require('../../controllers/user-controller')

//http://localhost:3001/api/users
router.route('/').get(getUser).post(createUser)

//localhost:3001/api/users/:userId
router.route('/:userId').get(getSingleUser)
module.exports = router;