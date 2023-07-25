const {
    User,
    Thought
} = require("../models");

const userController = {
    //get All Users
    getUser(req, res) {
        User.find({})
            .select("-__v")
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    //get one user by id
    getSingleUser(req, res) {
        User.findOne({
                _id: req.params.userId
            })
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    //create user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    //update user
    updateUser(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, req.body, {
                new: true
            })
            .then((userData) => {
                if (userData) {
                    res.status(200).json({
                        message: "User updated successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to update user information"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    //delete user
    deleteUser(req, res) {
        User.findOneAndDelete({
                _id: req.params.userId
            })
            .then((userData) => {
                if (userData) {
                    res.status(200).json({
                        message: "User deleted successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to delete user information"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    //add friend
    addFriend(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $addToSet: {
                    friends: req.params.friendId
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((friendData) => {
                if (friendData) {
                    res.status(200).json({
                        message: "Friend added successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to add friend"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    //delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $pull: {
                    friends: req.params.friendId
                }
            }, {
                new: true
            })
            .then((friendData) => {
                if (friendData) {
                    res.status(200).json({
                        message: "Friend deleted successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to delete friend"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    }
}
module.exports = userController;