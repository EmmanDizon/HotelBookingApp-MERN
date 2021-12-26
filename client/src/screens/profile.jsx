import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";
import http from "../components/service/httpService";
import Loader from "../components/loader";
import popupSuccess from "sweetalert2";
const { TabPane } = Tabs;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser"))) {
      window.location.href = "/login";
      return;
    }
  }, []);

  return (
    <Tabs style={{ marginTop: 50 }} defaultActiveKey="1">
      <TabPane tab="My Profile" key="1">
        <br />
        <h1>Name: {user.name}</h1>
        <h1>Email: {user.email}</h1>
      </TabPane>
      <TabPane tab="My Booking(s)" key="2">
        <MyBookings />
      </TabPane>
    </Tabs>
  );
};

export default Profile;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const result = (
          await http.post("/api/booking/get_bookings", { userid: user._id })
        ).data;
        setBookings(result);
      } catch (error) {}
    };
    getBookings();
  }, []);

  const cancelBooking = async (booking) => {
    const params = {
      bookingid: booking._id,
      roomid: booking.roomid,
    };

    try {
      setLoading(true);
      await http.post("/api/booking/cancel_bookings", params).data;

      setLoading(false);
      popupSuccess
        .fire("Success", "Your Booking cancelled successfully", "success")
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      popupSuccess
        .fire("Oppss", "Something went wrong", "error")
        .then((result) => {
          window.location.reload();
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading ? (
            <Loader />
          ) : (
            bookings.map((booking) => {
              return (
                <div className="shadow p-5 mb-5 bg-white rounded">
                  <b>
                    <h1>Room: {booking.room}</h1>
                    <p>Check In: {booking.fromdate}</p>
                    <p>Check Out: {booking.todate}</p>
                    <p>Amount: ₱{booking.totalamount}</p>
                    <p>
                      Status:{" "}
                      {booking.status === "Cancelled" ? (
                        <Tag color="error">CANCELLED</Tag>
                      ) : (
                        <Tag color="success">CONFIRMED</Tag>
                      )}
                    </p>

                    <div style={{ float: "right" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => cancelBooking(booking)}
                        hidden={booking.status === "Cancelled" ? true : false}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </b>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
