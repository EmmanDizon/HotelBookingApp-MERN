const express = require("express");
const router = express.Router();
const { SaveBook } = require("../models/booking");
const { Rooms } = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51K8JSHHUKHwFxlbgRhYQCFvMhFeKaWMspWT0zmHvN3SvlYFH8uJyTTdAeFilKqlstT7O1Q6iIWEIqCQq6ac9I4Lg00KPmSwKVW"
);

router.post("/save", async (req, res) => {
  const { room, fromdate, todate, token, ...otherDetails } = req.body;
  const { userid, totalamount } = { ...otherDetails };
  const fromDate = moment(fromdate).format("MM-DD-YYYY");
  const toDate = moment(todate).format("MM-DD-YYYY");

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "PHP",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const booking = new SaveBook({
        roomid: room._id,
        room: room.name,
        fromdate: fromDate,
        todate: toDate,
        ...otherDetails,
        transactionid: uuidv4(),
      });
      const bookingRecord = await booking.save();

      const rooms = await Rooms.findOne({ _id: room._id });

      rooms.currentbookings.push({
        bookingid: bookingRecord._id,
        fromdate: fromDate,
        todate: toDate,
        userid: userid,
      });
      await rooms.save();
      res.send("Payment Successful");
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/get_bookings", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await SaveBook.find({ userid }).sort("-status");
    res.send(bookings);
  } catch (ex) {}
});

router.post("/cancel_bookings", async (req, res) => {
  const { bookingid, roomid } = req.body;
  const booking = await SaveBook.findByIdAndUpdate(
    {
      _id: bookingid,
    },
    {
      $set: {
        status: "Cancelled",
      },
    }
  );

  const room = await Rooms.findOne({ _id: roomid });

  const bookings = room.currentbookings;

  const temp = bookings.filter(
    (booking) => booking.bookingid.toString() !== bookingid
  );

  room.currentbookings = temp;

  await room.save();

  res.send("Your Booking cancelled successfully !");
});

router.get("/get_all_bookings", async (req, res) => {
  const result = await SaveBook.find().sort("-status");
  res.send(result);
});

module.exports = router;
