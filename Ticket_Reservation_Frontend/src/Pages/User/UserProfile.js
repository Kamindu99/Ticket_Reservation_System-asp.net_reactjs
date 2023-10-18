import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({});

  // get user details from the database
  useEffect(() => {
    const token = localStorage.getItem("token");

    //get user details from the database
    if (token) {
      axios.get(`https://traingo.onrender.com/api/User/${token}`).then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    }
  }, []);

  //delete user function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://traingo.onrender.com/api/User/${id}`);

      alert("User Deleted Successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };

  return (
    <div>
      {/* Center vertically and horizontally */}
      <div>
        <header className="bg-primary text-white text-center py-5 mb-5">
          <h1>User Profile</h1>
          <p>{user.username}'s Profile</p>
        </header>

      </div>

      <div
        key={user.id}
        className="col-md-3 mb-3 container mt-5 d-flex justify-content-center align-items-center"
      >
        <div className="card">
          <img
            src={
              "https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
            }
            className="card-img-top"
            alt={"ss"}
          />
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h2 className="card-title">{user.username}</h2>
              </div>
              <div className="col-md-4">
                {/* <span className="badge bg-primary">{train.type}</span> */}
              </div>
            </div>
            <p className="card-text">
              <strong>NIC:</strong> {user.nic}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {user.email}
            </p>

            <div className="row">
              <div className="col-md-6">
                <a className="btn btn-warning" href="/editprofile">
                  Edit Account
                </a>
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
