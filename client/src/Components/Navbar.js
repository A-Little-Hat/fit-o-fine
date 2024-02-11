import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// import './css/mainNavbar.css'

const Navbar = ({ user }) => {
    return (
        <div style={{ "width": "99vw","padding":"10px","display":"flex","color":"white","backgroundColor": "#525CEB", "justifyContent":"space-between" }}>
            {/* <nav> */}
                {/* <div style={{ "backgroundColor": "pink", "width": "95vw", "height": "50px",}}> */}
                    <Link to="/" style={{ "width": "100px", "height": "50px",  "color":"white", "textDecoration":"none" }}>
                        Fit-o-Fine
                    </Link>

                    <Link to="/profile" style={{ "width": "20px", "height": "50px", "color":"white", "textDecoration":"none" }}>
                        Profile
                    </Link>
                    {user && user.role === "admin" && (
                        <>

                            <Link
                                
                                to="/org-request"
                                style={{ "width": "20px", "height": "50px", "color":"white", "textDecoration":"none" }}
                            >
                                Approvals
                            </Link>


                            <Link
                                
                                to="/view-org"
                                style={{ "width": "40px", "height": "50px",  "color":"white", "textDecoration":"none" }}
                            >
                                View Organizations
                            </Link>


                        </>
                    )}
                    {user && user.role !== "admin" && (
                        <>

                            <Link
                                
                                to="/add-patient"
                                style={{ "width": "50px", "height": "50px",  "color":"white", "textDecoration":"none" }}
                            >
                                Add Patient
                            </Link>


                            <Link
                                
                                to="/view-patient"
                                style={{ "width": "50px", "height": "50px",  "color":"white", "textDecoration":"none" }}
                            >
                                View Patient
                            </Link>


                            <Link
                                
                                to="/search"
                                style={{ "width": "20px", "height": "50px",  "color":"white", "textDecoration":"none" }}
                            >
                                Search
                            </Link>

                        </>
                    )}

                    <ul className="navbar-nav">

                        {!user && (
                            <li className="nav-item">
                                <Link to="/login" style={{ "width": "50px", "height": "50px",  "color":"white", "textDecoration":"none" }}>
                                    Org Login/ADMIN
                                </Link>
                            </li>
                        )}
                    </ul>
                    <Link to="/patientLogin" style={{  "height": "50px",  "color":"white", "textDecoration":"none" }}>
                        Patient-Login
                    </Link>
                {/* </div> */}
            {/* </nav> */}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(Navbar);
