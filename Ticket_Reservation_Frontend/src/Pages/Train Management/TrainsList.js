import axios from "axios";
import React, { useEffect, useState } from "react";

function TrainsList() {

  const [trains, setTrains] = useState([]);

  //get all trains from the database
  useEffect(() => {
    // Fetch the existing train data based on the ID from the URL
    axios.get("http://localhost:5068/api/trains").then((res) => {
      console.log(res.data);
      setTrains(res.data);
    });
  }, []);

  return (
    <>
      <div className="container-fluid p-5 mb-5" style={{ backgroundColor: '#59456620' }}>
        <div className="row">
          <div className="col-md-2 mb-6">
            <img src='https://cdni.iconscout.com/illustration/premium/thumb/book-a-train-ticket-online-6276502-5217098.png' style={{ objectFit: 'cover', height: '100px', marginLeft: '20px' }} />
          </div>
          <div className="col-md-10 mb-6">
            <h5 className="display-5">Reserve Tickets</h5>
            <p className="lead"> Reserve Tickets by clicking Book Now Button</p>
          </div>
        </div>
        <hr className="my-1" />
      </div>
      <div className="container">
        <div className="row">
          {trains.map((train) => (
            <div key={train.id} className="col-md-3 mb-3 trainlist">
              <div class="cardcontainer mb-4">
                <div style={{ paddingBottom: '10px' }}>
                  <div class="photo">
                    <img src={train.imageURL} alt={train.trainName} style={{ objectFit: 'cover' }} />
                    <div class="photos">{train.type}</div>
                  </div>
                  <div class="content">
                    <p class="txt4">{train.trainName}</p>
                    <p class="txt5">{train.from} to {train.to}</p>
                    <p class="txt2">Departure: {train.departureTime}</p>
                    <p class="txt2">Arrival: {train.arrivalTime}</p>
                  </div>
                  <div class="footer">
                    <p><a id="heart"><span class="like"><i class="fab fa-"></i></span></a><a class="waves-effect waves-light btn btn-success" href={`/addbooking/${train.id}`}>Book Now</a></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrainsList;
