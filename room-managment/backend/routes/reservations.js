
const router = require('express').Router();
let Reservation = require('../models/reservation.model');

router.route('/:id').get((req, res) => {
  Reservation.find({roomid:Number(req.params.id)})
    .then(reservs => res.json(reservs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  Reservation.find()
    .then(reservs => res.json(reservs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/add').post((req, res) => {
  const username = req.body.username;
  const from = Date.parse(req.body.from);
  const to =Date.parse(req.body.to);
  const note = req.body.note
  const roomid=Number(req.params.id)
  const newReserv = new Reservation({
    username,
    from,
    to,
    note,
    roomid
  });

  newReserv.save()
  .then(() => res.json('Reservation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;