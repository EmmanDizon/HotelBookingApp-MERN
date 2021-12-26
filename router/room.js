const express = require("express");
const router = express.Router();
const { Rooms } = require("../models/room");

router.get("/get_all_rooms", async (req, res) => {
  const result = await Rooms.find({});
  res.json({ result });
});

router.post("/get_room_by_id", async (req, res) => {
  const room = await Rooms.findOne({ _id: req.body.room_id });
  res.send(room);
});

router.post("/save_room", async (req, res) => {
  let room = new Rooms(req.body);

  room = await room.save();

  res.send(room);
});

router.post("/delete_room", async (req, res) => {
  const result = await Rooms.findByIdAndRemove(req.body);
  res.send("Successfully deleted !");
});

module.exports = router;
