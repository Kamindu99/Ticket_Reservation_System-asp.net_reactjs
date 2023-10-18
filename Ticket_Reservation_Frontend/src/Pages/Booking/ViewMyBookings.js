import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import MessageDialog from '../../Component/Layouts/AlertBox';

function ViewMyBookings() {
    const [bookings, setBookings] = useState();

    // call user effcet
    useEffect((e) => {
        getMyBookings();
    }, []);

    // getMyBookings by user id
    const getMyBookings = () => {

        let result = localStorage.getItem("token")
        const abc = { token: result }
        console.log(abc.token);

        axios.get(`http://localhost:5068/api/booking/mybookings/${abc.token}`).then(res => {

            if (res.data.length != 0) {
                setBookings(res.data)
            } else {

            }
            console.log(res.data)
        })
            .catch((err) => {
                alert(err);
            })
    }

    const [messageData, setMessageData] = useState({ name: '', message: '' });

    const [show, setShow] = useState(false);

    // ...

    // Display the message dialog
    const showMessageDialog = (name, message) => {
        setShow(true);
        setMessageData({ name, message });
    }

    //cancle bookings
    const deleteOrder = (id) => {
        axios.delete(`http://localhost:5068/api/booking/${id}`).then((res) => {
            console.log(res.data)
            showMessageDialog("Deleted", "Booking Deleted Successfully");
            window.location.reload();
        })
    }

    //edit bookings
    const editOrder = (id) => {
        window.location.replace(`./editbooking/${id}`)
    }

    const handleAction = (action, id, date) => {
        const orderDate = new Date(date);
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - orderDate;

        // Calculate the time difference in days
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference > 5) {
            // alert(`You cannot ${action == 2 ? "cancel" : "update"} this reservation. You can ${action == 2 ? "cancel" : "update"} reservation within 5 days of booking.`);

            showMessageDialog("Deleted", `You cannot ${action == 2 ? "cancel" : "update"} this reservation. You can ${action == 2 ? "cancel" : "update"} reservation within 5 days of booking.`);
        } else {
            if (action == 2) {
                deleteOrder(id)
            } else {
                editOrder(id)
            }
        }
    }

    return (
        <div>
            <div className="">
                <div className="container-fluid p-5 mb-5" style={{ backgroundColor: '#59456620' }}>
                    <div className="row">
                        <div className="col-md-2 mb-6">
                            <img src='https://cdni.iconscout.com/illustration/premium/thumb/book-a-train-ticket-online-6276502-5217098.png' style={{ objectFit: 'cover', height: '100px', marginLeft: '20px' }} />
                        </div>
                        <div className="col-md-10 mb-6">
                            <h5 className="display-5">My Reserved Tickets</h5>
                            <p className="lead"> View My Reserved Tickets</p>
                        </div>
                    </div>
                    <hr className="my-1" />
                </div>
                {bookings ? <div>
                    <div class=" mt-5 mb-5" >
                        <div class="d-flex justify-content-center" >
                            <div class="col-md-8" >
                                <Row xs={1} md={1} className="g-4" id="by" class="rounded">
                                    {bookings.map((booking, index) => (
                                        <div class="row p-2  border rounded pb-4 pt-4 " style={{ background: "hsl(0,0%,75%,0.3)", marginTop: "30px" }}>

                                            <div class="col-md-3 mt-1"><img
                                                class="img-fluid img-responsive rounded product-image"
                                                src="https://bsmedia.business-standard.com/_media/bs/img/article/2019-09/30/full/1569790979-4055.jpg"
                                                style={{ height: '130px', marginTop: "14px" }} />
                                            </div>

                                            <div class="col-md-6 mt-1">
                                                <h5>{index + 1}. &nbsp;{booking?.trainName} - ( {booking?.noOfTickets} Tickets)
                                                    <span class="badge bg-secondary ms-2">{booking?.status}</span></h5>
                                                <div class="d-flex flex-row">
                                                    <div className='fst-italic text-muted mb-3'> Booked at {booking?.bookedDate} ,  by Mr/Mrs.{booking?.cusName}</div>
                                                </div>
                                                <p class="text-justify  para mb-0">
                                                    If you want to cancel your reservation, please do it within 5 days of booking. Otherwise, you can't cancel your reservation.
                                                </p>
                                            </div>

                                            <div class="align-items-center align-content-center col-md-3 border-left mt-1">

                                                <div class="d-flex flex-row align-items-center">
                                                    <h4 class="mr-1">Rs. {booking?.total}.00</h4>
                                                </div>
                                                <h6 class="text-success">   Thank you Mr/Mrs.{booking?.cusName}</h6>
                                                <div class="d-flex flex-column mt-4">
                                                    <button onClick={() => { handleAction(1, booking?.id, booking?.bookedDate) }} style={{ border: "0", backgroundColor: booking.status == "Pending" ? "#b14700" : "" }} className="btn btn-success btn-sm mb-2">
                                                        <text>Edit Details</text>
                                                    </button>
                                                    <button class="btn btn-danger btn-sm " style={{ border: "0", backgroundColor: booking.status == "Pending" ? "#722828" : "" }} type="button" onClick={(e) => handleAction(2, booking?.id, booking?.bookedDate)} >
                                                        <text>Cancle Reservation</text>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>
                </div> : <div class="alert alert-primary mt-5" role="alert" style={{ textAlign: 'center' }}>
                    <h3>There is no any Reservations</h3>
                </div>}
            </div>
            <MessageDialog showd={show} {...messageData} />
        </div>
    )
}

export default ViewMyBookings