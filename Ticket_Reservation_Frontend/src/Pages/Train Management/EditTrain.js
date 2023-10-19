import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { locations } from "../../Component/Locations";
import SearchableSelect from "../../Component/Layouts/SerchableSelect";

function EditTrain() {

  const [train, setTrain] = useState({
    trainName: "",
    type: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    imageURL: "",
  });

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Get train ID from URL
  const { id } = useParams();
  const location = locations;
  // Fetch train data from the API
  useEffect(() => {
    // Fetch the existing train data based on the ID from the URL
    axios
      .get(`https://traingo.onrender.com/api/trains/${id}   `)
      .then((response) => {
        setTrain(response.data);
        setFrom(response.data.from);
        setTo(response.data.to);
      })
      .catch((error) => {
        console.error("Error fetching train data:", error);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a PUT request to update the train data
      await axios.put(`https://traingo.onrender.com/api/trains/${id}`, {
        ...train,
        from: from,
        to: to
      });

      // Redirect to the train details page or any other appropriate action
      // You can use React Router for this purpose
      alert("Train Updated Successfully");
      window.location.href = "/alltrains";
    } catch (error) {
      console.error("Error updating train data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrain({
      ...train,
      [name]: value,
    });
  };

  return (
    <div>
      <header className="bg-primary text-white text-center py-2 mb-3">
        <h1>Update Train Details</h1>
        <p>Edit Train Details</p>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              {/* Render input fields with train data */}
              <div className="mb-3">
                <label htmlFor="trainName" className="form-label">
                  Train Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="trainName"
                  name="trainName"
                  value={train.trainName}
                  onChange={handleInputChange}
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
                  value={train.type}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="from" className="form-label">
                      From
                    </label>
                    <SearchableSelect value={train.from} options={location} onChangeDrop={setFrom} name='from' />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="to" className="form-label">
                      To
                    </label>
                    <SearchableSelect value={train.to} options={location} onChangeDrop={setTo} name='to' />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="departureTime" className="form-label">
                      Departure Time
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="departureTime"
                      name="departureTime"
                      value={train.departureTime}
                      onChange={handleInputChange}
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
                      type="text"
                      className="form-control"
                      id="arrivalTime"
                      name="arrivalTime"
                      value={train.arrivalTime}
                      onChange={handleInputChange}
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
                  value={train.imageURL}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Train
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <img
              style={{ borderRadius: "10px", height: "auto", width: "100%" }}
              src={train.imageURL}
              className="img-fluid mt-4"
              alt="train"
            />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default EditTrain;
