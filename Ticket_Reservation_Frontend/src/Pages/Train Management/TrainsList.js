import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchableSelect from "../../Component/Layouts/SerchableSelect";

function TrainsList() {

  const [trains, setTrains] = useState([]);
  const [trainss, setTrainss] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //get all trains from the database
  useEffect(() => {
    // Fetch the existing train data based on the ID from the URL
    getTrains()
  }, []);

  const getTrains = () => {
    setIsLoading(true);
    axios.get("https://traingo.onrender.com/api/trains").then((res) => {
      console.log(res.data);
      setTrains(res.data);
      setTrainss(res.data);
      setIsLoading(false);
    });
  }

  const [fromlocation, setfromlocation] = useState("Colombo");
  const [tolocation, settolocation] = useState("Colombo");

  const locations = [
    {
      "id": 1,
      "locationname": "Colombo",
      "km": 0
    },
    {
      "id": 2,
      "locationname": "Kandy",
      "km": 200
    },
    {
      "id": 3,
      "locationname": "Galle",
      "km": 300
    },
    {
      "id": 4,
      "locationname": "Matara",
      "km": 400
    },
    {
      "id": 5,
      "locationname": "Jaffna",
      "km": 0
    },
    {
      "id": 6,
      "locationname": "Beliatta",
      "km": 0
    },
    {
      "id": 7,
      "locationname": "Vavuniya",
      "km": 0
    },
    {
      "id": 8,
      "locationname": "Maradana",
      "km": 0
    },
    {
      "id": 9,
      "locationname": "Badulla",
      "km": 0
    },
    {
      "id": 10,
      "locationname": "Kankesanthurai",
      "km": 0
    }
  ]

  useEffect(() => {

    setTrainss(
      trains?.filter(({ to, from }) => from == fromlocation && to == tolocation) // Filter []
    );

  }, [tolocation, fromlocation]);

  return (
    <>
      <div className="container-fluid p-5 mb-5" style={{ backgroundColor: '#59456620' }}>
        <div className="row">
          <div className="col-md-2 mb-6">
            <img src='https://cdni.iconscout.com/illustration/premium/thumb/book-a-train-ticket-online-6276502-5217098.png' style={{ objectFit: 'cover', height: '100px', marginLeft: '20px' }} />
          </div>
          <div className="col-md-10 mb-6">
            <h5 className="display-5">Train Schedule</h5>
            <p className="lead"> Reserve Tickets by clicking Book Now Button</p>
          </div>
        </div>
        <hr className="my-1" />
      </div>

      <div>
        <form style={{ background: 'white', marginTop: '-80px', marginRight: '15%', marginLeft: '15%', boxShadow: ' 0 0 5px 0 rgba(0, 0, 0, 0.381)' }}>
          <div class="row p-3 ms-5" >
            <div class="col-5 col-md-5 me-5">
              <label for="from" class="form-label">From </label>
              <SearchableSelect options={locations} onChangeDrop={setfromlocation} />
            </div>

            <div class="col-5 col-md-5">
              <label for="from" class="form-label">To</label>
              <SearchableSelect options={locations} onChangeDrop={settolocation} />
            </div>

            <div class="col-1 col-md-1" >
              <button onClick={() => { setTrainss(trains) }} type="button" class="btn btn-primary ms-3" style={{ height: '43px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>
            </div>

          </div>
        </form>
      </div>
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          {trainss.length == 0 && isLoading == false && (
            <div className="col-md-12 mb-6 text-center">
              <h5 className="display-5">No Trains Available</h5>
              <br />
            </div>
          )}
          {isLoading == true && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
              <div className="spinner-border text-success" style={{ width: "100px", height: "100px", animationDuration: "1.5s" }} role="status"></div>
            </div>
          )}
          {trainss.map((train) => (
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
