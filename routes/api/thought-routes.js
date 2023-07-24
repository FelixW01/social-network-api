const router = require('express').Router();
const {
    createThought,
    getThought,
    getSingleThought,
} = require('../../controllers/thought-controller')


//http://localhost:3001/api/thoughts
router.route('/').get(getThought).post(createThought)


//localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought)



module.exports = router;