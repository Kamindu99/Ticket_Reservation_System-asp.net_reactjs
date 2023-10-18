import axios from "axios";
import React, { useState } from "react";

function AddTrain() {
  const [trainName, setTrainName] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [imageURL, setImageURL] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      trainName,
      type,
      from,
      to,
      departureTime,
      arrivalTime,
      imageURL
    );

    // Create a data object with the form values
    const data = {
      trainName,
      type,
      from,
      to,
      departureTime,
      arrivalTime,
      imageURL,
    };

    try {
      // Make a POST request to the specified URL (http://localhost:5000/aa)
      const response = await axios.post(
        "https://traingo.onrender.com/api/trains",
        data
      );

      alert("Train Added Successfully");

      // Handle the response as needed
      console.log("Server response:", response.data);

      // Clear the form fields after successful submission
      setTrainName("");
      setType("");
      setFrom("");
      setTo("");
      setDepartureTime("");
      setArrivalTime("");
      setImageURL("");
    } catch (error) {
      // Handle any errors that occur during the POST request
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <header className="bg-primary text-white text-center py-5 mb-5">
        <h1>Add Train</h1>
        <p>Add Train Details</p>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="trainName" className="form-label">
                  Train Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="trainName"
                  name="trainName"
                  value={trainName}
                  onChange={(event) => setTrainName(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="from" className="form-label">
                  From
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="from"
                  name="from"
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="to" className="form-label">
                  To
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="to"
                  name="to"
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="departureTime" className="form-label">
                  Departure Time
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="departureTime"
                  name="departureTime"
                  value={departureTime}
                  onChange={(event) => setDepartureTime(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="arrivalTime" className="form-label">
                  Arrival Time
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="arrivalTime"
                  name="arrivalTime"
                  value={arrivalTime}
                  onChange={(event) => setArrivalTime(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="imageURL" className="form-label">
                  Image URL
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="imageURL"
                  name="imageURL"
                  value={imageURL}
                  onChange={(event) => setImageURL(event.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Train
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <img
              style={{ borderRadius: "10px" }}
              src="https://img.freepik.com/free-vector/high-speed-train-concept-illustration_114360-17150.jpg"
              className="img-fluid"
              alt="train"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTrain;
