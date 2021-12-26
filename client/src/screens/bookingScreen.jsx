import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import http from "../components/service/httpService";
import moment from "moment";
import messageError from "../components/common/messageError";
import Payment from "../components/payment";

function BookingScreen() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { room_id, from_date, to_date } = useParams();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const fromDate = moment(from_date, "MM-DD-YYYY");
  const toDate = moment(to_date, "MM-DD-YYYY");
  const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

  const totalAmount = room.rentperday * totalDays;

  useEffect(() => {
    async function fetchRoom() {
      try {
        const result = (
          await http.post("/api/room/get_room_by_id", { room_id: room_id })
        ).data;

        setRoom(result);
        setLoading(false);
      } catch (ex) {
        setError(true);
        messageError(ex);
        setLoading(false);
      }
    }
    fetchRoom();
  }, []);

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div className="shadow p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="col md-5">
              <h1>{room.name}</h1>
              <input
                type="image"
                img
                src={room.imageurls[0]}
                className="big-image"
                alt="cannot render image"
              />
            </div>
            <div className="col md-5" style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <div>
                <b>
                  <p>Name: {user.name}</p>
                  <p>From Date: {from_date}</p>
                  <p>To Date: {to_date}</p>
                  <p>Max Count: {room.maxcount} </p>
                </b>
              </div>

              <div className="mt-5">
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days: {totalDays}</p>
                  <p>Rent Per Day: {room.rentperday}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>
              <div>
                <Payment
                  room={room}
                  userid={user._id}
                  fromdate={fromDate}
                  todate={toDate}
                  totalamount={totalAmount}
                  totaldays={totalDays}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingScreen;
