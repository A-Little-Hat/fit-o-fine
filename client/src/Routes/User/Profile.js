import React from "react";
import { connect } from "react-redux";
import Navbar from "../../Components/Navbar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Profile({ user }) {
    return (
        <>
            <Navbar />
            
            <div className="container my-4" >
                {/* TODO: Later here display metamask details */}
                <Card className="mb-3" style={{backgroundColor:'#F1F3F3'}}>
                    <Card.Body>
                        <p className="text-center text-muted m-0">
                           <font color="black"> You are login with metamask</font>
                        </p>
                    </Card.Body>
                </Card>
                <Card style={{backgroundColor:'#F1F3F3'}}>
                    <Card.Body>
                        {user ? (
                            <>
                                <div >
                                    <span
                                        className="material-icons-two-tone"
                                        style={{ fontSize: "4rem" }}
                                    >
                                                                            </span>
                                </div>
                                <h5 className="card-title" >
                                     {user.name}{" "}
                                    {user.role === "admin" && "(Admin)"}
                                    {user.role !== "admin" && (
                                        <>
                                            {" "}
                                            {user.verified
                                                ? "(Verified)"
                                                : "(Not Verified)"}
                                        </>
                                    )}
                                </h5>
                                <hr />
                                <p className=" mb-0 text-muted">
                                    Address
                                </p>
                                <p>{user.addr}</p>
                                <p className=" mb-0 text-muted">Email</p>
                                <p>{user.email}</p>
                                <p className=" mb-0 text-muted">
                                    Contact Number
                                </p>
                                <p>{user.con}</p>
                                <p className=" mb-0 text-muted">Type
                                </p>
                                <p>{user.type}</p>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                
                            </>
                        
                        ) 
                        : (
                            <p>
                                Please register first then you will use out
                                dapp. <Link to="/register">Register</Link>
                            </p>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

const mapsStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapsStateToProps)(Profile);
