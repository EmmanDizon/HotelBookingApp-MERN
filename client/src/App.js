import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import HomeScreen from "./screens/homeScreen";
import BookingScreen from "./screens/bookingScreen";
import Registration from "./screens/registration";
import Login from "./screens/login";
import Profile from "./screens/profile";
import AdminPanel from "./screens/adminScreen";

function App() {
  return (
    <div className="app">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="/book/:room_id/:from_date/:to_date"
            element={<BookingScreen />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
