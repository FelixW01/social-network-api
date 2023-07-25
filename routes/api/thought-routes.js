const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    createReaction
} = require('../../controllers/thought-controller')


//http://localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought)


//localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought)

//localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction)



module.exports = router;