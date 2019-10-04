const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  playerId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
})

const gameSchema = new mongoose.Schema({
  players: [playerSchema],
  board: [Number],
  turn: {type: Number, default: -1},
  winner: {type: Number, default: null},  // null = no winner or tie; 0 = tie; 1/-1 = player
}, {
  timestamps: true
});

gameSchema.statics.getActiveForUser = function(user) {
  return this.findOne({'players.playerId': user._id, winner: null});
}

gameSchema.statics.createForUser = async function(user) {
  const game = new this();
  game.players.push({name: user.name, playerId: user._id});
  await game.save();
  return Promise.resolve(game);
}

gameSchema.pre("save",function(next) {
  if (this.board.length === 0) this.board = [
    null, null, null,
    null, null, null,
    null, null, null
  ];
  next();
});

module.exports = mongoose.model('Game', gameSchema);