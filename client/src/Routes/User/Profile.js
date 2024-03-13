import React from "react";
import { connect } from "react-redux";
import Navbar from "../../Components/Navbar";
// import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Profile({ user }) {
    return (
        <>
            <Navbar />

            <div className="container my-4" >
                {/* TODO: Later here display metamask details */}
                {/* <Card className="mb-3" style={{backgroundColor:'#F1F3F3'}}>
                    <Card.Body> */}
                <p className="text-center text-muted m-0">
                    <font color="black"> You are login with metamask</font>
                </p>
                {/* </Card.Body>
                </Card>
                <Card style={{backgroundColor:'#F1F3F3'}}>
                    <Card.Body> */}
                {user ? (
                    // <>
                    //     <h5 className="card-title" >
                    //          {user.name}{" "}
                    //         {user.role === "admin" && "(Admin)"}
                    //         {user.role !== "admin" && (
                    //             <>
                    //                 {" "}
                    //                 {user.verified
                    //                     ? "(Verified)"
                    //                     : "(Not Verified)"}
                    //             </>
                    //         )}
                    //     </h5>
                    //     <hr />
                    //     <span className=" mb-0 text-muted">
                    //         Address
                    //     </span>
                    //     <span>{user.addr}</span>
                    //     <span className=" mb-0 text-muted">Email</span>
                    //     <span>{user.email}</span>
                    //     <span className=" mb-0 text-muted">
                    //         Contact Number
                    //     </span>
                    //     <span>{user.con}</span>
                    //     <span className=" mb-0 text-muted">Type
                    //     </span>
                    //     <span>{user.type}</span> 
                    // </>
                    <div class="container">
                        <div class="card mt-5">
                            <div class="card-header">
                                <h5 class="card-title">
                                    {user.name}
                                    {user.role === "admin" && "(Admin)"}
                                    {user.role !== "admin" && (
                                        <>
                                            {user.verified ? "(Verified)" : "(Not Verified)"}
                                        </>
                                    )}
                                </h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-unstyled">
                                    <li class="mb-2">
                                        <span class="text-muted">Address:</span> {user.addr}
                                    </li>
                                    <li class="mb-2">
                                        <span class="text-muted">Email:</span> {user.email}
                                    </li>
                                    <li class="mb-2">
                                        <span class="text-muted">Contact Number:</span> {user.con}
                                    </li>
                                    <li class="mb-2">
                                        <span class="text-muted">Type:</span> {user.type}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                )
                    : (
                        <p>
                            Please register first then you will use out
                            dapp. <Link to="/register">Register</Link>
                        </p>
                    )}
                {/* </Card.Body>
                </Card> */}
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
