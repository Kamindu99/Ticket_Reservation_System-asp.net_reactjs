import axios from "axios";
import React, { useEffect, useState } from "react";

function AllAgents() {
  const [AllUsers, setAllUsers] = useState([]);

  // call useEffcet for get admin list
  useEffect(() => {
    axios.get("https://traingo.onrender.com/api/Admin").then((res) => {
      console.log(res.data);
      setAllUsers(res.data);
    });
  }, []);

  // handleDelete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://traingo.onrender.com/api/Admin/${id}`);

      alert("User Deleted Successfully");

      window.location.href = "/allagents";
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };


  return (
    <>
      <header className="bg-primary text-white text-center py-2 mb-3">
        <h1>All Agent List</h1>
        <p>All Agent Details</p>
      </header>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>User Type</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {AllUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>

                <td>
                  {user.userRole === "1" ? (
                    <span className="badge bg-success">Backoffice</span>
                  ) : (
                    <span className="badge bg-success">Travel Agent</span>
                  )}
                </td>
                <td>
                  <a className="btn btn-warning " href={`/edituser/${user.id}`}>
                    Edit
                  </a>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                  {/* {user.active === true ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleActive(user.id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleActive(user.id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Activate
                    </button>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllAgents;
