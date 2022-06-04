const router = require('express').Router();

const {
    createReaction,
    deleteReaction,
} = require('../../controllers/reactionControllers')

// Route endpoint is /thoughts/:thoughtId/reactions
router.route('/').post(createReaction);

// Route endpoint is /thoughts/:thoughtId/reactions/:reactionId
router.route('/:reactionId').delete(deleteReaction);

module.exports = router;
