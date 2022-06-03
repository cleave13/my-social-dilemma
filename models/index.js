// Require the models from the same folder
const User = require('./User');
const Thought = require('./Thought');
const Reaction = require('./Reaction');

// Export the models so that they can be referenced by the server
module.exports = { User, Thought, Reaction };
