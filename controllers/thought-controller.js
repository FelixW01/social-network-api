const {
    User,
    Thought
} = require("../models");


const thoughtController = {
    //get All thoughts
    getThought(req, res) {
        Thought.find()
            .select("-__v")
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    //get one user by id
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.ThoughtId
            })
            .select("-__v")
            .populate("thoughts")
            .populate("friends")
            .then((ThoughtData) => res.json(ThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    //create user
    createThought(req, res) {
        Thought.create(req.body)
            .then(({
                _id
            }) => {
                return User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true
                })
            })
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = thoughtController;