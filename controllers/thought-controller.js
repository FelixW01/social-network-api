const {
    User,
    Thought
} = require("../models");


const thoughtController = {
    //get All thoughts
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    //get one user by id
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .select("-__v")
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
    },

    //create reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                new: true,
                runValidators: true
            })
            .then((reactionData) => {
                if (reactionData) {
                    res.status(200).json({
                        message: "Reaction created successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to create reaction information"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    //delete reactions
}


module.exports = thoughtController;