const {
    User,
    Thought
} = require("../models");

const userController = {
    //get All Users
    getUser(req, res) {
        User.find()
            .select("-__v")
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    //get one user by id
    getSingleUser(req, res) {
        User.findOne({
                _id: req.params.userId
            })
            .select("-__v")
            .populate("thoughts")
            .populate("friends")
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    //create user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    }
}
module.exports = userController;