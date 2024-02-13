import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";


const Navbar = ({ user, isAuth }) => {
    
    
    return (
        <div style={{ "width": "99vw", "padding": "10px", "display": "flex", "color": "white", "backgroundColor": "#525CEB", "justifyContent": "space-between" }}>
            <Link to="/" style={{ "width": "100px", "height": "50px", "color": "white", "textDecoration": "none" }}>
                Fit-o-Fine
            </Link>


            { !isAuth  && user && user.role === "admin" && (
                <>
                    <Link to="/profile" style={{ "width": "20px", "height": "50px", "color": "white", "textDecoration": "none" }}>
                        Profile
                    </Link>
                    <Link

                        to="/org-request"
                        style={{ "width": "20px", "height": "50px", "color": "white", "textDecoration": "none" }}
                    >
                        Approvals
                    </Link>


                    <Link

                        to="/view-org"
                        style={{ "width": "40px", "height": "50px", "color": "white", "textDecoration": "none" }}
                    >
                        View Organizations
                    </Link>


                </>
            )}
            { !isAuth  && user && user.role !== "admin" && (
                <>
                    <Link to="/profile" style={{ "width": "20px", "height": "50px", "color": "white", "textDecoration": "none" }}>
                        Profile
                    </Link>

                    <Link

                        to="/add-patient"
                        style={{ "width": "50px", "height": "50px", "color": "white", "textDecoration": "none" }}
                    >
                        Add Patient
                    </Link>


                    <Link

                        to="/view-patient"
                        style={{ "width": "50px", "height": "50px", "color": "white", "textDecoration": "none" }}
                    >
                        View Patient
                    </Link>


                    <Link

                        to="/search"
                        style={{ "width": "20px", "height": "50px", "color": "white", "textDecoration": "none" }}
                    >
                        Search
                    </Link>

                </>
            )}

            <ul className="navbar-nav">

                {!isAuth  && !user && (
                    <li className="nav-item">
                        <Link to="/login" style={{ "width": "50px", "height": "50px", "color": "white", "textDecoration": "none" }}>
                            Org Login/ADMIN
                        </Link>
                    </li>
                )}
            </ul>
            {!isAuth  && !user && (
                <Link to="/patientLogin" style={{ "height": "50px", "color": "white", "textDecoration": "none" }}>
                    Patient-Login
                </Link>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(Navbar);
