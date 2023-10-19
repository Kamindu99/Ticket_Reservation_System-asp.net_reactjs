import axios from "axios";
import React, { useState } from "react";
import MessageDialog from "../../Component/Layouts/AlertBox";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nic: "",
  });

  //alert box function
  const [messageData, setMessageData] = useState();

  const showMessageDialog = (name, message, callback) => {
    setMessageData({ show: true, name, message, setMessageData: setMessageData, callback: callback ? callback : null });
  }
  //end alert box function

  // Handle form data change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if the passwords match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      // Send a POST request to your server on localhost:5000
      const response = await axios.post(
        "https://traingo.onrender.com/api/User",
        formData
      );

      // Handle the response as needed
      console.log("Registration successful:", response.data);
      // alert("Registration successful");
      showMessageDialog("Success", "Registration successful", "/login");

      // You can also redirect the user to a different page here if needed.
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <header className="bg-primary text-white text-center  py-2 mb-3">
        <h1>Sign Up</h1>
        <p>Signup to reserve train tickets</p>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              //   src="https://knowledgemission.kerala.gov.in/img/official-login.jpg"
              //   src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
              className="img-fluid"
              alt="signup"
            />
          </div>

          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  NIC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nic"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
            <p className="mt-3" style={{ fontSize: '20px', textAlign: 'center' }}>
              Have an account? <a href="/login" style={{ textDecoration: 'none' }}>Login</a>
            </p>
          </div>
        </div>
        <MessageDialog {...messageData} />
      </div>
    </>
  );
};

export default Signup;
