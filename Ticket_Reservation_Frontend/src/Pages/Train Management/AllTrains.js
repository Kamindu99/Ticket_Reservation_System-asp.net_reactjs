import axios from "axios";
import React, { useEffect, useState } from "react";

function AllTrains() {
  const [alltrains, setAlltrains] = useState([]);

  //get all trains from the database
  useEffect(() => {
    axios.get("https://traingo.onrender.com/api/trains").then((res) => {
      console.log(res.data);
      setAlltrains(res.data);
    });
  }, []);

  //delete train function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://traingo.onrender.com/api/trains/${id}`);

      alert("Train Deleted Successfully");
    } catch (error) {
      console.error("Error deleting train data:", error);
    }
  };

  //create a function to handle active and inactive if active make it inactive and vice versa
  const handleActive = async (id) => {
    try {
      const response = await axios.get(
        `https://traingo.onrender.com/api/trains/${id}`
      );
      const train = response.data;
      train.isActive = !train.isActive;
      await axios.put(`https://traingo.onrender.com/api/trains/${id}`, train);
      alert("Train Details Updated Successfully");
      window.location.href = "/alltrains";
    } catch (error) {
      console.error("Error updating train data:", error);
    }
  };

  return (
    <>
      <header className="bg-primary text-white text-center py-2 mb-3">
        <h1>All Trains List</h1>
        <p>All Train Details</p>
      </header>

      <div><button className="btn btn-info" style={{ marginLeft: '80%' }} onClick={() => { window.location.replace("/addtrain") }}>Add New Train</button></div>

      <hr />

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Train Name</th>
              <th>Type</th>
              <th>Start</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alltrains.map((train) => (
              <tr key={train.id}>
                <td>
                  <img
                    src={train.imageURL}
                    alt={train.trainName}
                    style={{ width: "50px", height: "auto" }}
                  />
                </td>
                <td>{train.trainName}</td>
                <td>{train.type}</td>
                <td>{train.from}</td>
                <td>{train.to}</td>
                <td>{train.departureTime}</td>
                <td>{train.arrivalTime}</td>
                <td>
                  {train.isActive === true ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Inctive</span>
                  )}
                </td>
                <td>
                  <a
                    className="btn btn-warning "
                    href={`/edittrain/${train.id}`}
                  >
                    Edit
                  </a>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(train.id)}
                    style={{ marginLeft: "5px" }} // Add left margin to create spacing
                  >
                    Delete
                  </button>
                  {train.isActive === true ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleActive(train.id)}
                      style={{ marginLeft: "5px" }} // Add left margin to create spacing
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleActive(train.id)}
                      style={{ marginLeft: "5px" }} // Add left margin to create spacing
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllTrains;
