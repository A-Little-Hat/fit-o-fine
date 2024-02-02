import React from "react";
import { DocGraphics, PotraitDoctorGraphics } from "../Components/Graphics";
import Navbar from "../Components/Navbar";
import potDoc from './potDoc.png'

import './Home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mainHead">
        <div className="hero">
          <div className="row top">
            <div className="row" style={{ "textAlign": "center", "fontSize": "50px" }} >
              <p>Welcome to Fit-o-Fine</p>
              <DocGraphics />
            </div>
          </div>
          <div className="row second">
            <p>Services</p>
            <section id="featured-services" className="featured-services">
              <div className="container" data-aos="fade-up">

                <div className="row">
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                      <div className="icon"><i className="fas fa-heartbeat"></i></div>
                      <h4 className="title"><a href=""> Normal checkup</a></h4>
                      <p className="description">Assessing overall health, vital signs, and potential issues, ensuring preventive care for a healthy lifestyle.</p>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
                      <div className="icon"><i className="fas fa-dna"></i></div>
                      <h4 className="title"><a href="">Blood Test</a></h4>
                      <p className="description">Blood test measures various components in blood, aiding in diagnosing medical conditions and monitoring overall health status.</p>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon"><i className="fas fa-temperature-high"></i></div>
                      <h4 className="title"><a href="">Body temperature</a></h4>
                      <p className="description">Body temperature is the measurement of heat in the human body, typically around 98.6 degrees Fahrenheit (37 degrees Celsius).</p>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                      <div className="icon"><i className="fas fa-hand-holding-medical"></i></div>
                      <h4 className="title"><a href="">Medicine use</a></h4>
                      <p className="description">Medicine usage involves following prescribed doses and instructions for safe and effective treatment of medical conditions.</p>
                    </div>
                  </div>

                </div>

              </div>
            </section>
          </div>
          <div className="row third">

            <section id="about" className="about">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h2>About Us</h2>
                  <p>Our core values are built around the thought of patient-first and that each doctor at Manipal Hospitals is a human care expert, going above and beyond the call of duty as they live by the belief that every single life is priceless. When they embark on these journeys, stories emerge - stories of grit, determination and never giving up. Join us on a journey to discover stories that reinforce your belief in 'Life's On'</p>
                </div>

                <div className="row">
                  <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
                    {/* <a href="https://youtu.be/h39m-e8JHDc" className="glightbox play-btn mb-4"></a> */}
                    {/* <PotraitDoctorGraphics /> */}
                    <img src={potDoc} />
                  </div>

                  <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">

                    <div className="icon-box">
                      <div className="icon"><i className="bx bx-heart"></i></div>
                      <h4 className="title"><a href="">HEALTH IS WEALTH</a></h4>

                      <p className="description">Regular check-ups can help find potential health issues before they become a problem. When you see your doctor regularly, they are able to detect health conditions or diseases early. Early detection gives you the best chance for getting the right treatment quickly, avoiding any complications.</p>
                    </div>

                    <div className="icon-box">
                      <div className="icon"><i className="bx bx-health"></i></div>
                      <h4 className="title"><a href="">EMERGENCY</a></h4>
                      <p className="description">Medical emergencies require immediate attention and can be life-threatening. Promptly call emergency services and administer basic first aid if trained. Common medical emergencies include heart attacks, strokes, severe bleeding, choking, and unconsciousness. Quick action can save lives.</p>
                    </div>

                    <div className="icon-box">
                      <div className="icon"><i className="bx bx-help-circle"></i></div>
                      <h4 className="title"><a href="">SERVICES </a></h4>
                      <p className="description">Comprehensive medical services for optimal healthcare, featuring advanced treatments, expert professionals, and compassionate patient care.</p>
                    </div>

                  </div>
                </div>

              </div>
            </section>


          </div>
          {/* <div className="container-fluid"> */}


          <div className="row nameSection" >
            <h2>Contact</h2>
            </div>
          </div>
        </div >
      </>
      );
};
      export default Home;
