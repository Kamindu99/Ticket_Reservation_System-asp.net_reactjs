import "./App.css";
import NavBar from "./Component/Navbar/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import TrainsList from "./Pages/Train Management/TrainsList";
import AddTrain from "./Pages/Train Management/AddTrain";
import AllTrains from "./Pages/Train Management/AllTrains";
import EditTrain from "./Pages/Train Management/EditTrain";
import RegisterUser from "./Pages/Admin/Login";

import UserProfile from "./Pages/User/UserProfile";
import EditAccount from "./Pages/User/EditAccount";
import AllUsers from "./Pages/User/AllUsers";
import EditUserAdmin from "./Pages/User/EditUserAdmin";
import ViewAllBooking from "./Pages/Booking/ViewAllBooking";
import ViewMyBookings from "./Pages/Booking/ViewMyBookings";
import BookingCreate from "./Pages/Booking/BookingCreate";
import Footer from "./Component/Footer/Footer";
import AllAgents from "./Pages/Admin/AllAgents";
import ProfileEditAdmin from "./Pages/Admin/Profile";
import Reset from "./Pages/Admin/RestPass";
import AdminHome from "./Pages/Admin/Dashboard";
import AboutUs from "./Pages/AboutUs";
import AdminNavbar from "./Component/AdminNav/Navbar";
import { useEffect, useState } from "react";
import BookingEdit from "./Pages/Booking/EditBooking";

function App() {

  const [userType1, setUserType] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem('myData');
    const userTypeObject = JSON.parse(userType);

    if (userTypeObject == null) {
      setUserType("2")
    }
    else {
      if (userTypeObject.userRole == '1') {
        setUserType("1")
      }
      else if (userTypeObject.userRole == '3') {
        setUserType("3")
      }
      else {
        setUserType("0")
      }
    }
  }, [])

  return (
    <div>
      {(userType1 == "2" || userType1 == "3") ?
        <NavBar />
        :
        <AdminNavbar />
      }
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trainsList" element={<TrainsList />} />
          <Route path="/addtrain" element={<AddTrain />} />
          <Route path="/alltrains" element={<AllTrains />} />
          <Route path="/edittrain/:id" element={<EditTrain />} />
          <Route path="/admin" element={<RegisterUser />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/editprofile" element={<EditAccount />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/edituser/:id" element={<EditUserAdmin />} />
          <Route path="/allbookings" element={<ViewAllBooking />} />
          <Route path="/mybookings" element={<ViewMyBookings />} />
          <Route path="/addbooking/:id" element={<BookingCreate />} />
          <Route path="/editbooking/:id" element={<BookingEdit />} />
          <Route path="/allagents" element={<AllAgents />} />
          <Route path="/adminProfile" element={<ProfileEditAdmin />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<AdminHome />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
