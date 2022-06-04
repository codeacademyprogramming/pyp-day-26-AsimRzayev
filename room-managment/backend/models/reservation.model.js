const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  username: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  note: { type: String, required: false },
  roomid:{type:Number,required:true}
}, {
  timestamps: true,
});

const Reservations = mongoose.model('Reservations', reservationSchema);

module.exports = Reservations;