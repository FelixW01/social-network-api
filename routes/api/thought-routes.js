const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller')


//http://localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought)


//localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

//localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction)

//localhost:3001/api//:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)



module.exports = router;