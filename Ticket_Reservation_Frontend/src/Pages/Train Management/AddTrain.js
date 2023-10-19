import axios from "axios";
import React, { useState } from "react";
import { locations } from "../../Component/Locations";
import SearchableSelect from "../../Component/Layouts/SerchableSelect";

function AddTrain() {
  const [trainName, setTrainName] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [imageURL, setImageURL] = useState("");

  const location = locations;

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
      <header className="bg-primary text-white text-center py-2 mb-3">
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

                <select
                  className="form-select"
                  id="type"
                  name="type"
                  type="text"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  required
                >
                  <option value="Express">Express</option>
                  <option value="Intercity">Intercity</option>
                  <option value="NightMail">NightMail</option>
                  <option value="Slow">Slow</option>
                </select>
              </div>
              <div className="row mb-2">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="from" className="form-label">
                      From
                    </label>

                    <SearchableSelect options={location} onChangeDrop={setFrom} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="to" className="form-label">
                      To
                    </label>

                    <SearchableSelect options={location} onChangeDrop={setTo} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="departureTime" className="form-label">
                      Departure Time
                    </label>

                    <input
                      type="time"
                      className="form-control"
                      id="departureTime"
                      name="departureTime"
                      value={departureTime}
                      onChange={(event) => setDepartureTime(event.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="arrivalTime" className="form-label">
                      Arrival Time
                    </label>

                    <input
                      type="time"
                      className="form-control"
                      id="arrivalTime"
                      name="arrivalTime"
                      value={arrivalTime}
                      onChange={(event) => setArrivalTime(event.target.value)}
                      required
                    />
                  </div>
                </div>
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
              <div class="row mt-4">
                <div class="col-md-6">
                  <input type="button" value="Cancel" class="btn btn-warning placeicon" style={{ width: '100%' }} onClick={() => { window.location.replace("/alltrains") }} />
                </div>
                <div class="col-md-6">
                  <input type="submit" value="Add Train" class="btn btn-success placeicon" style={{ width: '100%', color: 'white' }} />
                </div>
              </div>
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
      <br />
    </div>
  );
}

export default AddTrain;
