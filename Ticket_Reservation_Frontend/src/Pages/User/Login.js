import axios from "axios";
import React, { useState } from "react";
import Alert from "../../Component/Layouts/AtertBar";

const Login = () => {
  const [formData, setFormData] = useState({
    nic: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState('');
  const [alertRole, setalertRole] = useState('');

  const handleShowAlert = (role, message, redirect) => {
    setShowAlert(true);
    setAlertMessage(message);
    setRedirectTo(redirect);
    setalertRole(role)
  };

  const clearAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
    setRedirectTo('');
    setalertRole('')
  };

  // Handle form data change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://traingo.onrender.com/api/User/login",
        formData
      );

      if (response.status === 200) {
        // Successful login, you can redirect the user or perform any other action here.
        console.log("Login successful!");
        console.log(response.data);
        localStorage.setItem("token", response.data.id);
        localStorage.setItem("name", response.data.username);
        localStorage.setItem("myData", JSON.stringify({
          "userRole": "3"
        }));

        //window.location.href = "/";
        handleShowAlert("success", "Login Successful!", '/')
      } else {
        // Handle unsuccessful login, show an error message, etc.
        console.log("Login failed.");
      }
    } catch (error) {
      // Handle any network errors or other exceptions here.
      console.error("An error occurred:", error);
      handleShowAlert("error", "Login Failed!", '')
    }
  };

  return (
    <>
      <header className="bg-primary text-white text-center py-5 mb-5">
        <h1>Login</h1>
        <p>Login to reserve train tickets</p>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              //   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              //   src="https://knowledgemission.kerala.gov.in/img/official-login.jpg"
              //   src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
              src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-4268415-3551762.png"
              className="img-fluid"
              alt="Login"
            />
          </div>

          <div className="col-md-6 mt-5">
            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>

            <p className="mt-3" style={{ fontSize: '20px', textAlign: 'center' }}>
              Don't have an account? <a href="/signup" style={{ textDecoration: 'none' }}>Register</a>
            </p>
          </div>
        </div>
        {showAlert && <Alert role={alertRole} message={alertMessage} onRedirect={redirectTo} clearAlert={clearAlert} />}
      </div>
    </>
  );
};

export default Login;
