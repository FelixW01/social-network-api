const router = require('express').Router();
const {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

//http://localhost:3001/api/users
router.route('/').get(getUser).post(createUser)

//localhost:3001/api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

//localhost:3001/api/user/:userId/friends/:userId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)
module.exports = router;