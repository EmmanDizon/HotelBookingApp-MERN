import http from "../service/httpService";
import Loader from "../loader";
import Table from "../table";
import { useState, useEffect } from "react";
import popupSuccess from "sweetalert2";
import _ from "lodash";

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { path: "_id", title: "Booking Id" },
    { path: "userid", title: "User Id" },
    { path: "room", title: "Room" },
    { path: "fromdate", title: "From" },
    { path: "todate", title: "To" },
    { path: "status", title: "Status" },
  ];
  useEffect(() => {
    const getBookings = async () => {
      try {
        const result = (await http.get("/api/booking/get_all_bookings")).data;
        setBookings(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getBookings();
  }, []);
  return (
    <div className="row">
      <div className="col-md-10">
        {loading ? (
          <Loader />
        ) : (
          <Table
            className={"table table-bordered table-dark"}
            columns={columns}
            data={bookings}
          />
        )}
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { path: "_id", title: "Room Id" },
    { path: "name", title: "Name" },
    { path: "type", title: "Type" },
    { path: "rentperday", title: "Rent Per Day" },
    { path: "maxcount", title: "Max Count" },
    { path: "phonenumber", title: "Phone Number" },
    { title: "Action" },
  ];
  useEffect(() => {
    const getRooms = async () => {
      try {
        const result = (await http.get("/api/room/get_all_rooms")).data;

        setRooms(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getRooms();
  }, []);
  return (
    <div className="row">
      <div className="col-md-10">
        {loading ? (
          <Loader />
        ) : (
          <Table
            className={"table table-bordered table-dark"}
            columns={columns}
            data={rooms.result}
          />
        )}
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { path: "_id", title: "User Id" },
    { path: "name", title: "Name" },
    { path: "email", title: "Email" },
    { path: "isAdmin", title: "Admin?" },
  ];
  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = (await http.get("/api/user/get_all_users")).data;

        setUsers(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="row">
      <div className="col-md-10">
        {loading ? (
          <Loader />
        ) : (
          <Table
            className={"table table-bordered table-dark"}
            columns={columns}
            data={users}
          />
        )}
      </div>
    </div>
  );
}

export function AddRooms() {
  const [rooms, addRooms] = useState({
    name: "",
    rentperday: "",
    type: "",
    maxcount: 0,
    phonenumber: "",
    description: "",
    imageurl1: "",
    imageurl2: "",
    imageurl3: "",
  });
  const addRoom = async () => {
    const { imageurl1, imageurl2, imageurl3 } = rooms;
    const imageurls = [imageurl1, imageurl2, imageurl3];

    const params = {
      imageurls,
      ..._.omit(rooms, ["imageurl1", "imageurl2", "imageurl3"]),
    };

    try {
      await http.post("/api/room/save_room", params);
      popupSuccess
        .fire("Success", "Room Added Successfully !", "success")
        .then(() => {
          window.location.href = "/home";
        });
    } catch (error) {}
  };
  const handleChange = ({ target: input }) => {
    const data = { ...rooms };
    data[input.name] = input.value;

    addRooms(data);
  };
  return (
    <div className="row">
      <div className="col-md-5 ">
        <input
          type="text"
          name="name"
          className="form-control mb-1"
          placeholder="name..."
          value={rooms.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="rentperday"
          className="form-control mb-1"
          placeholder="Rent Per Day..."
          value={rooms.rentperday}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxcount"
          className="form-control mb-1"
          placeholder="Max Count..."
          value={rooms.maxcount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          className="form-control mb-1"
          placeholder="Description..."
          value={rooms.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phonenumber"
          className="form-control mb-1"
          placeholder="Phone Number..."
          value={rooms.phonenumber}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-5 ">
        <input
          type="text"
          name="type"
          className="form-control mb-1"
          placeholder="Type..."
          value={rooms.type}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageurl1"
          className="form-control mb-1"
          placeholder="Image 1..."
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageurl2"
          className="form-control mb-1"
          placeholder="Image 2..."
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageurl3"
          className="form-control mb-3"
          placeholder="Image 3..."
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={addRoom}
        >
          ADD ROOM
        </button>
      </div>
    </div>
  );
}
