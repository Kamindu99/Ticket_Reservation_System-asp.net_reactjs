import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewAllBooking() {
    const [alltrains, setAlltrains] = useState([]);

    // flech data
    useEffect(() => {
        axios.get("https://traingo.onrender.com/api/booking").then((res) => {
            console.log(res.data);
            setAlltrains(res.data);
        });
    }, []);

    // delete booking
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://traingo.onrender.com/api/booking/${id}`);

            alert("Booking Deleted Successfully");
            window.location.href = "/allbookings";
        } catch (error) {
            console.error("Error deleting Booking data:", error);
        }
    };

    // booking handle
    const handleActive = async (id, train) => {
        try {

            await axios.put(`https://traingo.onrender.com/api/booking/${id}`, {
                ...train,
                status: "Approved",
            });
            alert("Booking Approved Successfully");
            window.location.href = "/allbookings";
        } catch (error) {
            console.error("Error updating train data:", error);
        }
    };

    return (
        <>
            <header className="bg-primary text-white text-center py-2 mb-3">
                <h1>All Reservation Details</h1>
                <p>View All Reservation Details</p>
            </header>
            {
            },
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Booked Date</th>
                            <th>Customer Name</th>
                            <th>Train Name</th>
                            <th>Train Time</th>
                            <th>No of Tickets</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alltrains.map((train) => (
                            <tr key={train.id}>
                                <td>{train.bookedDate} </td>
                                <td>{train.cusName}</td>
                                <td>{train.trainName}</td>
                                <td>{train.traintime}</td>
                                <td>{train.noOfTickets}</td>
                                <td>{Number(train.total).toFixed(2)}</td>
                                <td>
                                    <button
                                        disabled={train.status === "Approved"}
                                        className={train.status === "Approved" ? "btn btn-success" : "btn btn-warning"}
                                        onClick={() => handleActive(train.id, train)}
                                        style={{ marginLeft: "5px" }} // Add left margin to create spacing
                                    >
                                        {train.status}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        disabled={train.status === "Approved"}
                                        className={"btn btn-danger"}
                                        onClick={() => handleDelete(train.id)}
                                        style={{ marginLeft: "5px" }} // Add left margin to create spacing
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewAllBooking;
