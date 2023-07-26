const {
    User,
    Thought
} = require("../models");


const thoughtController = {
    //get All thoughts, populate the reactions path, select the -__v new and updated
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
    //get one thought by id, select the new and updated
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .select("-__v")
            .then((ThoughtData) => res.json(ThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    //create thought, takes an input of JSON from req.body, then push into the thoughts array
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
    // update thought through req.params.thoughtID, $set replaces the current value with req.body
    // makes sure the returned data is new and updated
    updateThought(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            }).then((thoughtData) => {
                if (thoughtData) {
                    res.status(200).json({
                        message: "Thought was updated successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to update thought information"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));

    },
    //delete Thought, where: _id.
    deleteThought(req, res) {
        Thought.findOneAndDelete({
                _id: req.params.thoughtId
            })
            .then((thoughtData) => {
                if (thoughtData) {
                    res.status(200).json({
                        message: "Thought deleted successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to delete thought information"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    //create reactions, where: _id, adds req.body to reactions array.
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
    //delete reactions, where: _id, pulls where: reaction ID from the reactions array
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((reactionData) => {
                if (reactionData) {
                    res.status(200).json({
                        message: "Reaction deleted successfully"
                    })
                } else {
                    res.status(404).json({
                        message: "Failed to delete reaction information"
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    }
}


module.exports = thoughtController;