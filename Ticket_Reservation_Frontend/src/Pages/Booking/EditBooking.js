import axios from "axios";
import React, { useEffect, useState } from "react";
import './Booking.css';
import { useParams } from "react-router-dom";

function BookingEdit() {

    const { id } = useParams();

    const [type, settype] = useState("");
    const [img, setImg] = useState("");
    const [from, setfrom] = useState("");
    const [to, setto] = useState("");
    const [fromlocation, setfromlocation] = useState("");
    const [tolocation, settolocation] = useState("");
    const [departureTime, setdepartureTime] = useState("");
    const [CusName, setCusName] = useState("");
    const [cusId, setcusId] = useState("");
    const [bookdate, setBookdate] = useState("");
    const [traintime, setTraintime] = useState("");
    const [noOfTickets, setnoOfTickets] = useState("");
    const [total, settotal] = useState("750.00");
    const [trainId, settrainId] = useState("");
    const [trainName, settrainName] = useState("");
    const [CusNIC, setCusNIC] = useState("");
    const [Class, setClass] = useState("");

    const [getBookingData, setgetBookingData] = useState();

    // Fetch train data from the API
    useEffect(() => {
        getBookingDetails();
    }, [id])

    // Fetch train data from the API
    const getBookingDetails = async () => {
        const response = await axios.get(`http://localhost:5068/api/booking/${id}`);
        settrainId(response.data.trainId)
        setBookdate(response.data.bookdate)
        setfromlocation(response.data.from)
        settolocation(response.data.to)
        setnoOfTickets(response.data.noOfTickets)
        settotal(response.data.total)
        setCusName(response.data.cusName)
        setCusNIC(response.data.cusNIC)
        setClass(response.data.trainClass)
        setgetBookingData(response.data)
    }

    // Fetch train data from the API
    useEffect(() => {
        const id = localStorage.getItem("token");

        if (id !== null || id !== undefined) {
            setcusId(id);
        }
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a data object with the form values
        const data = {
            ...getBookingData,
            "bookdate": bookdate,
            "from": fromlocation,
            "to": tolocation,
            "noOfTickets": noOfTickets,
            "total": total,
            "cusNIC": CusNIC,
            "trainClass": Class
        };

        try {
            const response = await axios.put(
                `http://localhost:5068/api/booking/${id}`,
                data
            );

            alert("Details Update Successfully");

            // Handle the response as needed
            console.log("Server response:", response.data);
            window.location.href = "/mybookings";

            // Clear the form fields after successful submission
            setBookdate("");
            setnoOfTickets("");
            settolocation("");
            setfromlocation("");

        } catch (error) {
            // Handle any errors that occur during the POST request
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getTrainDetails();
    }, [trainId])

    const getTrainDetails = async () => {
        const response = await axios.get(`http://localhost:5068/api/trains/${trainId}`);
        console.log(response.data);
        settrainName(response.data.trainName);
        settype(response.data.type);
        setImg(response.data.imageURL);
        setfrom(response.data.from);
        setto(response.data.to);
        setdepartureTime(response.data.departureTime);
    }

    return (
        <div className="bookingcss" >

            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-11">
                        <div class="card card0 rounded-0">
                            <div class="row">
                                <div class="col-md-5 d-md-block d-none box">
                                    <div class="righta " style={{ backgroundColor: "white", border: "0px", paddingLeft: '10px' }}>

                                        <div class="text-center mb-2"> <h2>Edit Your Reservation Details</h2> </div>
                                        <hr class="text-center mb-4" />
                                        <h4 style={{ color: "hsl(0,0%,0%,0.6)" }}>{trainName}</h4>
                                        <div >
                                            <div class="col-12 "><img class="img-fluid" src={`${img}`} style={{ height: "200px", width: "100%", objectFit: 'cover' }} /></div>
                                        </div>
                                        <hr />
                                        <div class="row lower">
                                            <div class="col text-lefta">Train Type</div>
                                            <div class="col text-righta">{type}</div>
                                        </div>
                                        <div class="row lower">
                                            <div class="col text-lefta">From Location</div>
                                            <div class="col text-righta">{from}</div>
                                        </div>
                                        <div class="row lower">
                                            <div class="col text-lefta">To Location</div>
                                            <div class="col text-righta">{to}</div>
                                        </div>
                                        <hr />
                                        <div class="row lower">
                                            <div class="col text-lefta"><b>Total Price</b></div>
                                            <div class="col text-righta"><b>Rs. {total}</b></div>
                                        </div>
                                        <br />
                                        <p class="text-muted text-center">Apply Terms and Condition</p>
                                    </div>
                                </div>
                                <div class="col-md-7 col-sm-12 p-0 box">
                                    <form onSubmit={handleSubmit}>
                                        <div class="card rounded-0 border-0 card2" id="paypage" style={{ marginLeft: '5%' }}>
                                            <div class="form-card">

                                                <div className="tabcard">
                                                    <div class="">

                                                        <ul class="nav nav-pills mb-3 shadow-sm" id="pills-tab" role="tablist">
                                                            <li class="nav-item">
                                                                <a class="nav-link active" id="bookingDetails-tab" data-toggle="pill" href="#bookingDetails" role="tab" aria-controls="bookingDetails" aria-selected="true">Booking Details</a>
                                                            </li>

                                                        </ul>


                                                        <div class="tab-content" id="pills-tabContent p-3">

                                                            <div class="tab-pane fade show active" id="bookingDetails" role="tabpanel" aria-labelledby="bookingDetails-tab">
                                                                <label class="pay">Customer Name</label>
                                                                <input type="text" name="CusName" value={CusName} placeholder="Customer Name" required disabled />

                                                                <label class="pay">NIC / Passport / Driving License</label>
                                                                <input type="text" name="CusNIC" value={CusNIC} required placeholder="NIC / Passport / Driving License" disabled />

                                                                <div class="row">
                                                                    <div class="col-8 col-md-4">
                                                                        <label class="pay">Book Date</label>
                                                                        <input required type="date" value={bookdate} name="bookdate" id="cr_no" onChange={(e) => { setBookdate(e.target.value) }} />
                                                                    </div>
                                                                    <div class="col-4 col-md-4">
                                                                        <label class="pay">Number of Seats</label><br />
                                                                        <select required value={noOfTickets} name="noOfTickets" class="placeicon" onChange={(e) => { setnoOfTickets(e.target.value) }} style={{ width: '100%', height: '43px' }}>
                                                                            <option value="1">1 Seat</option>
                                                                            <option value="2">2 Seats</option>
                                                                            <option value="3">3 Seats</option>
                                                                            <option value="4">4 Seats</option>
                                                                        </select>
                                                                    </div>

                                                                    <div class="col-4 col-md-4">
                                                                        <label class="pay">Class</label><br />
                                                                        <select required name="Class" value={Class} class="placeicon" style={{ width: '100%', height: '43px' }} onChange={(e) => { setClass(e.target.value) }}>
                                                                            <option value="1">First Class</option>
                                                                            <option value="2">Second Class</option>
                                                                            <option value="3">Third Class</option>
                                                                        </select>
                                                                    </div>

                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-8 col-md-6">
                                                                        <label class="pay">From Location</label>
                                                                        <input required type="text" value={fromlocation} name="fromlocation" id="cr_no" onChange={(e) => { setfromlocation(e.target.value) }} placeholder="From Location" />
                                                                    </div>
                                                                    <div class="col-4 col-md-6">
                                                                        <label class="pay">To Location</label>
                                                                        <input required type="text" value={tolocation} name="tolocation" onChange={(e) => { settolocation(e.target.value) }} placeholder="To Location" class="placeicon" />
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <input type="button" value="Cancel" class="btn btn-warning placeicon" style={{ width: '100%' }} onClick={() => { window.location.replace("/mybookings") }} />
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="submit" value="Update Details" class="btn btn-success placeicon" style={{ width: '100%', color: 'white' }} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookingEdit