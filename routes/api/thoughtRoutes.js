const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers')

// Route endpoint is /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// Route endpoint is /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;
