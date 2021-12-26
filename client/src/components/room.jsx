import { useState } from "react";
import RoomModal from "./modal";
import messageError from "./common/messageError";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 2000,
});

function Room({ room, fromDate, toDate, isDisabled }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const book = (e) => {
    if (fromDate !== "" && toDate !== "") {
      window.location.href = `/book/${room._id}/${fromDate}/${toDate}`;
    } else {
      messageError("Please select From and To date");
    }
  };
  return (
    <div className="shadow p-3 mb-5 bg-white rounded" data-aos="fade-up">
      <div className="row">
        <div key={room._id} className="col-md-4">
          <img src={room.imageurls[0]} className="small-image" alt={room._id} />
        </div>

        <div className="col-md-7">
          <h1>{room.name}</h1>
          <b>
            <p>Max Count: {room.maxcount}</p>
            <p>Phone Number: {room.phonenumber}</p>
            <p>Type: {room.type}</p>
          </b>

          <div style={{ float: "right" }}>
            <button
              onClick={book}
              className="btn btn-primary m-2"
              disabled={isDisabled}
            >
              Book Now
            </button>
            <button className="btn btn-primary" onClick={handleShow}>
              View Details
            </button>
          </div>
        </div>
      </div>

      <RoomModal show={show} handleClose={handleClose} room={room} />
    </div>
  );
}

export default Room;
