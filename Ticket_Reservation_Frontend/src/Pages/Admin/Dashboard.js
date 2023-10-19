import React from "react";
import { useState, useEffect } from "react";
function AdminHome() {

    const [name, setName] = useState("");
    const [userType1, setUserType] = useState("");

    // get localStorage data
    useEffect(() => {
        const userType = localStorage.getItem('myData');
        const userTypeObject = JSON.parse(userType);
        const userName = userTypeObject.userRole;
        console.log(userName)
        setUserType(userName);
        if (userName == '1') {
            //set name
            setName('Traveler Agent')
        }
        else {
            setName('Backoffice Agent')
        }
    }, [])

    const DashBoardItems = [
        {
            id: 1,
            title: "Agent Management",
            description: "Allow you to Manage all the agents and their details",
            icon: "fa fa-user",
            link: "/allagents",
            userRole: "2"
        },
        {
            id: 2,
            title: "Train Management",
            description: "Allow you to Manage all the trains and their details",
            icon: "fa fa-train",
            link: "/alltrains",
            userRole: "1"
        },
        {
            id: 3,
            title: "Ticket Booking Management",
            description: "Allow you to Manage all the ticket bookings",
            icon: "fa fa-book",
            link: "/allbookings",
            userRole: "2"
        },
        {
            id: 4,
            title: "User Management",
            description: "Allow you to Manage all the users and their details",
            icon: "fa fa-users",
            link: "/allusers",
            userRole: "1"
        }
    ]

    return (

        <div
            style={{
                backgroundColor: "hsla(90, 100%, 89%, 0.55)",
            }}
        >
            <div className="container-fluid p-5 mb-5" style={{ backgroundColor: '#59456620' }}>
                <div className="row">
                    <div className="col-md-2 mb-6">
                        <img src='https://cdn-icons-png.flaticon.com/512/29/29302.png' style={{ objectFit: 'cover', height: '100px', marginLeft: '90px' }} />
                    </div>
                    <div className="col-md-10 mb-6">
                        <h5 className="display-5">{name} DashBoard</h5>
                        <p className="lead"> You can manage all the details here in this dashboard</p>
                    </div>
                </div>
                <hr className="my-1" />
            </div>


            <div class="">
                <div class="row ms-2 me-2">
                    <div class="col-lg-10 col-xl-auto mx-auto">
                        <div
                            class="card flex-row my-3 border-5 shadow rounded-5 overflow-hidden"
                            style={{ backgroundColor: "hsla(90, 0%, 100%, 0.7)" }}
                        >
                            <div class="card-img-left d-none d-md-flex"></div>
                            <div class="card-body p-4 p-sm-5">


                                <div class="d-flex flex-row align-items-center carditemsss">
                                    {DashBoardItems.map((DashBoardItem) => (
                                        <div onClick={() => { window?.location?.replace(DashBoardItem?.link) }} class="card me-5" style={{ width: "18rem" }} hidden={userType1 == DashBoardItem?.userRole ? true : false}>
                                            <div class="ms-3 mt-2  mb-4">
                                                <i class={DashBoardItem?.icon}></i>

                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title" style={{ fontSize: '18px' }}>{DashBoardItem?.title}</h4>
                                                <p class="card-text mb-4" style={{ fontSize: '15px', color: 'gray' }} >{DashBoardItem?.description}</p>
                                                <a href={DashBoardItem?.link} class="card-link" style={{ textDecoration: 'none' }}> Explore &gt;&gt;</a>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>
                        <br />  <br />  <br />
                    </div>

                </div>
            </div>
        </div>

    );
}

export default AdminHome;