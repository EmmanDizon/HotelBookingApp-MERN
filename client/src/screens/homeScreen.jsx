import React, { useState, useEffect } from "react";
import Room from "../components/room";
import { ToastContainer } from "react-toastify";
import http from "../components/service/httpService";
import Loader from "../components/loader";
import { DatePicker } from "antd";
import moment from "moment";

import messageError from "../components/common/messageError";
const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRoom] = useState([]);
  const [loading, setLoading] = useState();
  const [date, setDates] = useState({
    fromDate: "",
    toDate: "",
  });
  const [isDisabled, setDisableButton] = useState(false);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser"))) {
      window.location.href = "/login";
      return;
    }
    async function fetchRoom() {
      try {
        setLoading(true);
        const { result: data } = (await http.get("/api/room/get_all_rooms"))
          .data;

        setRoom(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (ex) {
        setLoading(false);
      }
    }
    fetchRoom();
  }, []);

  const filterDate = (dates) => {
    let availability = false;
    let tempRooms = [];

    for (const room of duplicateRooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("MM-DD-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("MM-DD-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("MM-DD-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("MM-DD-YYYY") !== booking.todate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability || room.currentbookings.length === 0) {
        tempRooms.push(room);
      }

      setRoom(tempRooms);
    }
  };

  const handleChangeDate = (pickerDate) => {
    filterDate(pickerDate);
    let fromDate = moment(pickerDate[0]).format("MM-DD-YYYY");
    let toDate = moment(pickerDate[1]).format("MM-DD-YYYY");
    let toDay = moment(new Date()).format("MM-DD-YYYY");

    if (moment(toDay).isAfter(fromDate)) {
      messageError("Cannot book past date.");
      setDisableButton(true);
    } else {
      setDisableButton(false);
      setDates({
        fromDate,
        toDate,
      });
    }
  };

  const filterBySearch = () => {
    let temprooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchWord.toLowerCase())
    );

    setRoom(temprooms);
  };

  const filterByType = ({ target: selected }) => {
    setType(selected.value);

    let temprooms = duplicateRooms.filter(
      (room) => room.type.toLowerCase() === selected.value.toLowerCase()
    );

    if (selected.value === "All") {
      setRoom(duplicateRooms);
    } else {
      setRoom(temprooms);
    }
  };

  const searchRoom = ({ target: input }) => {
    setSearchWord(input.value);
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row mt-2 bs">
        <div className="col-md-3">
          <RangePicker format="MM-DD-YYYY" onChange={handleChangeDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            value={searchWord}
            onChange={searchRoom}
            onKeyUp={filterBySearch}
            className="form-control"
            placeholder="Search..."
          />
        </div>

        <div className="col-md-3">
          <select className="form-control" value={type} onChange={filterByType}>
            <option value="All">All</option>
            <option value="Delux">Delux</option>
            <option value="Non-Delux">Non-Delux</option>
          </select>
        </div>
      </div>
      <div className="row mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div key={room._id} className="col-md-9 mt-2">
                <Room
                  room={room}
                  fromDate={date.fromDate}
                  toDate={date.toDate}
                  isDisabled={isDisabled}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
