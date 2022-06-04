const { Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughtData) => {
        if (thoughtData) {
          res.json(thoughtData)
        }
        else {
          res.status(404).json({ message: 'No thought with that ID' })
        }
      }
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thoughtData } },
          { new: true },
        );
      })
      .then((thoughtData) => {
        if(thoughtData) {
          res.json(thoughtData)
        }
        else {
          return res.status(404).json({ message: 'Thought created but no user with this username!' });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (thoughtData) {
          res.json(thoughtData)
        }
        else {
          res.status(404).json({ message: 'No thought with that id!' })
        }
      }
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (thoughtData) {
          Student.deleteOne({ _id: req.params.thoughtId })
        }
        else {
          res.status(404).json({ message: 'No hought with that ID' })
        }
      })
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
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