import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

function Home() {

  const [trendingEvents, setTrendingEvents] = useState([
    {
      itemname: 'Badulla Colombo Express',
      itemDesc: 'Badulla Colombo Express is a train service operated by Sri Lanka Railways. The train runs daily from Badulla to Colombo.',
      itemImage: 'https://ceylontoday.lk/wp-content/uploads/2022/03/23f551ce92298ad37dd8dd829166e62a.jpg'
    },
    {
      itemname: 'Colombo Kandy Express',
      itemDesc: 'Colombo Kandy Express is a train service operated by Sri Lanka Railways. The train runs daily from Colombo to Kandy.',
      itemImage: 'https://imgeng.jagran.com/images/2022/apr/railways1650074183526.jpg'
    },
    {
      itemname: 'Colombo Jaffna Express',
      itemDesc: 'Colombo Jaffna Express is a train service operated by Sri Lanka Railways. The train runs daily from Colombo to Jaffna.',
      itemImage: 'https://images.livemint.com/img/2023/02/02/600x338/Vande_Metro_1675296807624_1675296807838_1675296807838.jpg'
    },
    {
      itemname: 'Colombo Matara Express',
      itemDesc: 'Colombo Matara Express is a train service operated by Sri Lanka Railways. The train runs daily from Colombo to Matara.',
      itemImage: 'https://www.seat61.com/images/SriLanka-s11-train-ext.jpg'
    },
    {
      itemname: 'Colombo Galle Express',
      itemDesc: 'Colombo Galle Express is a train service operated by Sri Lanka Railways. The train runs daily from Colombo to Galle.',
      itemImage: 'https://www.seat61.com/images/SriLanka-commuter-train2.jpg'
    },
    {
      itemname: 'Colombo Anuradhapura Express',
      itemDesc: 'Colombo Anuradhapura Express is a train service operated by Sri Lanka Railways. The train runs daily from Colombo ',
      itemImage: 'https://www.mfa.gov.lk/images/stories/Newspapers/BUP_DFT_DFT-6-5.jpg'
    },
    {
      itemname: 'Colombo Batticaloa Express',
      itemDesc: 'Colombo Batticaloa Express is a train service operated by Sri Lanka Railways. The train runs daily from Colombo ',
      itemImage: 'https://cdn.hirunews.lk/Data/News_Images/201905/1558927716_3427115_hirunews_Train-delay.jpg'
    },
    {
      itemname: 'Colombo Trincomalee Express',
      itemDesc: 'Colombo Trincomalee Express is a train service operated by Sri Lanka Railways. The train runs daily from Colombo ',
      itemImage: 'https://d1c4d7gnm6as1q.cloudfront.net/Pictures/480xany/4/5/4/25454_tn_lk-icf-emu_02.jpg'
    }
  ])

  // Divide the trending events into groups of four
  const groupedEvents = trendingEvents.reduce((acc, event, index) => {
    if (index % 4 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(event);
    return acc;
  }, []);

  const serviceData = [
    {
      name: 'Ticket Booking',
      img: 'https://png.pngtree.com/png-vector/20220906/ourmid/pngtree-train-ticket-png-image_6139639.png',
      desc: 'A ticket is a voucher that indicates that an individual is entitled to admission to an event or establishment.'
    },
    {
      name: 'Seat Reservation',
      img: 'https://www.vogelsitze.com/wp-content/uploads/Magnio_Vip_Front_B-150x150.png',
      desc: 'A seat reservation is a guarantee that you will have a seat on a train. It is not a ticket and does not allow you to travel.'
    },
    {
      name: 'Train Tracking',
      img: 'https://static.vecteezy.com/system/resources/thumbnails/024/724/482/small/railroad-track-isolated-on-transparent-background-generative-ai-railway-track-png.png',
      desc: 'Train tracking is the process of determining the location of a train and its direction of travel using a variety of technologies.'
    }
  ]

  return (
    <div>
      {/* <header className="bg-primary text-white text-center py-5">
        <h1>Welcome to Train Go</h1>
        <p>Your one-stop destination for booking train tickets.</p>
      </header> */}

      <div className="intro" id="home">
        <h1 className="animate">Welcome to Train Go</h1>
        <p>Your one-stop destination for booking train tickets.</p>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <br /> <br /> <br />
            <h2>Find Your Journey</h2>
            <p style={{ fontSize: "20px" }}>
              "Train Go" is the premier train booking system designed to provide
              travelers in Sri Lanka with a seamless and efficient way to plan,
              book, and manage their train journeys. This innovative application
              offers a range of features and benefits, making it the go-to
              choice for both local commuters and tourists exploring the
              picturesque landscapes of Sri Lanka
            </p>
            <a className="btn btn-primary w-50 h-30" href="/trainsList">
              Book Now
            </a>
          </div>
          <div className="col-md-6">
            <img
              style={{ borderRadius: "10px" }}
              src="https://media.istockphoto.com/id/457433171/photo/red-high-speed-train-with-blurred-motion.jpg?s=612x612&w=0&k=20&c=dtaL6VyNhrKhM1-tQIE7OF3WcpVgc9SFEjFVmcOFFLM="
              alt="Train"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <br />
      {/* Propular Reservations Section */}

      <h1 class="text-center mt-2" style={{ color: "#000099", fontFamily: "Times New Roman, Times, serif" }}>
        Propular Reservations
      </h1>

      <div style={{ marginInlineStart: '5%', marginInlineEnd: '5%', fontSize: "20px" }} >
        <Carousel className="avac" interval={null} indicators={false} accessKey="">
          {groupedEvents.map((events, idx) => (
            <Carousel.Item key={idx}>
              <div className="row">
                {events.map((trendingEvent, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card mt-3 trendingev">
                      <div className="row no-gutters">
                        <div className="col-md-6">
                          <img
                            style={{ height: '200px', objectFit: 'cover', borderRadius: '0' }}
                            className="card-img"
                            src={trendingEvent.itemImage}
                            alt="Card image cap"
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body" style={{ position: 'relative', height: '200px', marginLeft: '-14%' }}>
                            <h5 className="card-title" style={{ color: '#a80319', fontWeight: '700', fontSize: '18px' }}>
                              {trendingEvent.itemname}
                            </h5>
                            <h5
                              className="card-title"
                              style={{ color: 'black', fontWeight: '300', fontSize: '12px', fontFamily: 'inherit' }}
                            >
                              {trendingEvent.itemDesc}
                            </h5>
                            <button
                              className="btn btn-warning btn-sm"
                              style={{
                                position: 'absolute',
                                bottom: 10,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: '10px',
                                fontWeight: '600',
                                width: '100px',
                              }}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Services */}
      <section className="services-container mt-5" id="serviceContaint" style={{ fontSize: "20px" }}>
        <div className="text-center">
          <h5 className="brand-color">OUR SERVICES</h5>
          <h2>Services We Provide</h2>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="w-75 row">
            {
              serviceData.map(service =>
                <div className="col-md-4 col-sm-6 col-12 text-center">
                  <img src={service.img} alt="" style={{ width: '150px', height: '150px' }} />
                  <p className="text-primary">{service.desc}</p>
                </div>
              )
            }
          </div>
        </div>
      </section>

      <br />
      {/* terms and conditions */}
      <h1 class="text-center mt-2" style={{ color: "#000099", fontFamily: "Times New Roman, Times, serif" }}>
        Terms and Conditions
      </h1>

      <ul class=" container" style={{ fontSize: "20px" }}>
        <li>If you wish to cancel the journey, you have to visit the nearest Railway station where the mTicketing service is available together with reservation tickets issued to you and it is a mandatory requirement to provide your NIC/passport to the counter for verification purpose.</li>
        <li>All tickets issued through the Service are the property of Sri Lanka Railways. Tickets are non-transferable and should be handed over to the destination station before leaving the station after the journey. Sri Lanka Railways officers have the authority to request and check the tickets at any given moment</li>
        <li>Passengers must provide the booking reference number along with their NIC or passport in person at the Station Counter and ticket will not be issued to any third party.</li>
        <li>Travelling on any other trains by using these types of tickets are strictly prohibited. An ordinary travelling ticket should be purchased for travelling to a transits station to catch a reserved train.</li>
        <li>A reference number along with ticket details will be sent via email to commuters who make the reservation via website and/or mobile app.</li>
        <li>Passengers are advised to be present at the station at least 15 minutes prior to the departure time of the train.</li>
        <li>Each adult passenger will be allowed, to bring on board their luggage, free of charge as per SLR’s general regulation. (Refer to general commercial rules set out below. For any enquiries meet a railway office.) The commuters will have to store luggage in the Luggage cabin by themselves. Luggage/baggage stored in the Luggage cabin is subject to availability. SLR would not provide additional space to accommodate their luggage.</li>
      </ul>
      <br />

      {/* Client says */}

      <section class="client_section layout_padding">
        <div class="container">

          <h1 class="text-center mt-2" style={{ color: "#000099", fontFamily: "Times New Roman, Times, serif" }}>
            What Our Clients Say
          </h1>

        </div>
        <div class="container px-0" style={{ fontSize: "18px" }}>
          <div id="customCarousel2" class="carousel  carousel-fade" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="box">
                  <div class="client_info">
                    <div class="client_name">
                      <h5>
                        Vihanga Janith
                      </h5>
                      <h6>
                        Software Engineer
                      </h6>
                    </div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p>
                    This is the best place to book train tickets. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <div class="box">
                  <div class="client_info">
                    <div class="client_name">
                      <h5>
                        Amanda Nethmini
                      </h5>
                      <h6>
                        Technical Lead
                      </h6>
                    </div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p>
                    Train Go is the best place to book train tickets. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <div class="box">
                  <div class="client_info">
                    <div class="client_name">
                      <h5>
                        Kavindu Perera
                      </h5>
                      <h6>
                        IT Head
                      </h6>
                    </div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p>
                    Sri Lanka Railways is the best place to book train tickets. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their  this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <div class="box">
                  <div class="client_info">
                    <div class="client_name">
                      <h5>
                        Kamindu Gayantha
                      </h5>
                      <h6>
                        IT Manager
                      </h6>
                    </div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p>
                    Reserving train tickets is very easy with Train Go. I booked a train ticket from and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket. I booked a train ticket from Blue Sky Lands and I am very happy
                    with their service. I recommend this to anyone who is looking for a train ticket.
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel_btn-box">
              <a class="carousel-control-prev" href="#customCarousel2" role="button" data-slide="prev">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#customCarousel2" role="button" data-slide="next">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <br />

      {/* About Us */}
      <section id="contact" style={{ fontSize: "20px" }}>
        <div className="container mt-3 contactContent">
          <h1 class="text-center mt-2" style={{ color: "#000099", fontFamily: "Times New Roman, Times, serif" }}>
            Contact Us
          </h1>

          <div className="row mt-4">
            <div className="col-lg-6">
              <div style={{ overflow: 'hidden', resize: 'none', maxWidth: '100%', width: '500px', height: '500px' }}>
                <div id="g-mapdisplay" style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
                  <iframe
                    style={{ height: '100%', width: '100%', border: '0' }}
                    frameBorder="0"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d103329.15090654448!2d79.89016195319431!3d6.932805683917763!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259111dcc54c1%3A0x7e0e50512471cb0b!2sWay%20%26%20Works%20Department%2C%20Sri%20Lanka%20Railway!5e1!3m2!1sen!2slk!4v1697555294032!5m2!1sen!2slk"
                  ></iframe>
                </div>
                <a className="the-googlemap-enabler" href="https://www.bootstrapskins.com/themes" id="enable-maps-data">
                  premium bootstrap themes
                </a>
                <style>{`#g-mapdisplay img{max-width:none!important;background:none!important;font-size: inherit;font-weight:inherit;}`}</style>
              </div>

            </div>

            <div className="col-lg-6 d-flex align-items-center">
              <form className="w-100" >
                If you have any questions or would like to contact us, please fill out the form below and We will get back to you as soon as possible.
                {/* Form fields */}<br /><br />
                <input type="text" className="form-control form-control" name="name" placeholder="Name" />
                <input type="email" className="form-control mt-3" name="email" placeholder="Email" />
                <input type="text" className="form-control mt-3" name="subject" placeholder="Subject" />
                <div className="mb-3 mt-3">
                  <textarea className="form-control" rows={5} id="comment" name="message" placeholder="Message"></textarea>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary mt-3" style={{ width: '100%' }}>Send Mail</button>
              </form>
            </div>

          </div>
        </div>
      </section>
      <br />  <br />

      {/* Footer */}
    </div>
  );
}

export default Home;
