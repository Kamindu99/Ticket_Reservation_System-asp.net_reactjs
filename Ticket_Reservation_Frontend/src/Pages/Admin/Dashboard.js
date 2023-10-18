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

  return (
    <div>
      <div
        style={{
          backgroundColor: "hsla(90, 100%, 89%, 0.55)",
        }}
      >
        <div id="bodyadd">
          <div className="infoadmin">
            <div>
              <div class="container">
                <div
                  class="row"
                //   style={{
                //     backgroundImage:
                //     //   "url('https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp')",
                //     backgroundSize: "cover",
                //     backgroundPosition: "center",
                //     backgroundRepeat: "no-repeat",
                //     height: "100vh",

                //   }}
                >
                  <div class="col-lg-10 col-xl-auto mx-auto">
                    <div
                      class="card flex-row my-3 border-5 shadow rounded-5 overflow-hidden"
                      style={{ backgroundColor: "hsla(90, 0%, 100%, 0.7)" }}
                    >
                      <div class="card-img-left d-none d-md-flex"></div>
                      <div class="card-body p-4 p-sm-5">
                        <center>
                          {" "}
                          <h1>{name} DashBoard</h1>
                        </center>
                        <hr class="my-4" />

                        <div class="d-flex flex-row align-items-center mb-5">
                          <div class="form-outline mb-2 ">

                            <button
                              class="btn btn-lg btn-secondary btn-login fw-bold text-uppercase"
                              type="submit"
                            >
                              <a
                                href="/allagents"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {" "}
                                <i
                                  class="fa fa-user mr-2"
                                  aria-hidden="true"
                                ></i>{" "}
                                Agent  Management{" "}
                              </a>

                            </button>

                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="form-outline mb-2 ">

                            <button
                              class="btn btn-lg btn-secondary btn-login fw-bold text-uppercase"
                              type="submit"
                            >
                              <a
                                href="/alltrains"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {" "}
                                <i
                                  class="fa fa-car mr-2"
                                  aria-hidden="true"
                                ></i>
                                Train Management
                              </a>
                            </button>

                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="form-outline mb-2 ">
                            {(userType1 == "1") ?
                              <button
                                class="btn btn-lg btn-secondary btn-login fw-bold text-uppercase"
                                type="submit"
                              >
                                <a
                                  href="/allbookings"
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {" "}
                                  <i
                                    class="fa fa-hotel mr-2"
                                    aria-hidden="true"
                                  ></i>
                                  Ticket Booking Management
                                </a>
                              </button>
                              : (null)}
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-5">
                          <div class="form-outline mb-2 ">
                            {(userType1 == "1") ?
                              <button
                                class="btn btn-lg btn-secondary btn-login fw-bold text-uppercase"
                                type="submit"
                              >
                                <a
                                  href="/allusers"
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {" "}
                                  <i
                                    class="fa fa-swimmer mr-2"
                                    aria-hidden="true"
                                  ></i>
                                  User Management
                                </a>
                              </button>
                              : (null)}
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="form-outline mb-2 ">

                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <div class="form-outline mb-2 ">

                          </div>
                        </div>
                        <hr class="my-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;