import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import './css/mainNavbar.css'

const Navbar = ({ user }) => {
    return (
        <div className="navbar-dark">
            <nav className="main navbar navbar-expand-lg ">
                <div className="nav" style={{"backgroundColor":"black"}}>
                    <Link className="linkMain navbar-brand" to="/">
                        Fit-o-Fine
                    </Link>
    
                    <Link className="linkMain navbar-brand" to="/profile">
                        Profile
                    </Link>
                            {user && user.role === "admin" && (
                                <>
                                    
                                        <Link
                                            className="navbar-brand"
                                            to="/org-request"
                                        >
                                            Approvals
                                        </Link>
                                    
                                    
                                        <Link
                                            className="navbar-brand"
                                            to="/view-org"
                                        >
                                            View Organizations
                                        </Link>
                                    
                                  
                                </>
                            )}
                            {user && user.role !== "admin" && (
                                <>
                                    
                                        <Link
                                            className="navbar-brand"
                                            to="/add-patient"
                                        >
                                            Add Patient
                                        </Link>
                                   
                                    
                                        <Link
                                            className="navbar-brand"
                                            to="/view-patient"
                                        >
                                            View Patient
                                        </Link>
                                    

                                        <Link
                                            className="navbar-brand"
                                            to="/search"
                                        >
                                            Search
                                        </Link>
                                                          
                                </>
                            )}
                           
                        <ul className="navbar-nav">
                            
                            {!user && (
                                <li className="nav-item">
                                    <Link className="linkMain navbar-brand" to="/login">
                                        Org Login/ADMIN
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <Link className="linkMain navbar-brand" to="/patientLogin">
                            Patient Login
                        </Link>
                    </div>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(Navbar);
