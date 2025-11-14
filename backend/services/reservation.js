const Reservation = require('../models/reservation');

exports.getAll = async (req, res) => {
  try {
    const reservation = await Reservation.find();
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.add = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ status: "reservation_not_found" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        reservation[key] = req.body[key];
      }
    });

    await reservation.save();
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ status: "reservation_not_found" });
    }

    await Reservation.deleteOne({ _id: id });
    res.status(204).json({ status: "delete_ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};