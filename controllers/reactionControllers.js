const { Reaction, Thought } = require('../models');

module.exports = {
  // Create a new reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reactionData) => res.json(reactionData))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (thoughtData) {
          res.json(thoughtData);
        }
        else {
          res.status(404).json({ message: 'No Reaction with that ID' })
        }
      })
      .catch((err) => res.status(500).json(err));
  },
}