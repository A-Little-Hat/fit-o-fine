import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.js";
import Login from "./Routes/Auth/Login.js";
import AuthProvider from "./Redirects/AuthProvider.js";
import Profile from "./Routes/User/Profile.js";
import Register from "./Routes/Auth/Register.js";
import RegisterProvide from "./Redirects/RegisterProvide.js";
import AdminProvider from "./Redirects/AdminProvider.js";
import Request from "./Routes/Request.js";
// import AddPatient from "./Components/Forms/AddPatient.js";
import NewPatient from "./Components/Forms/NewPatient.js";
import ViewOrg from "./Routes/ViewOrg.js";
import AddPatient from "./Components/Forms/AddPatient.js"

import Patient from "./Routes/Patient.js"
import RecordSearch from "./Routes/RecordSearch.js";
import Report from "./Components/Report/";
import PatientLogin from './Components/PatientLogin'

import "react-toastify/dist/ReactToastify.css";

import About from "./Routes/About";
function App() {
    console.log("app")
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About/>}/>
                <Route element={<AuthProvider />}>

                    <Route path="/profile" element={<Profile />} />
                    <Route element={<RegisterProvide />}>
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<AdminProvider />}>
                        <Route path="/org-request" element={<Request />} />
                        <Route path="/view-org" element={<ViewOrg />} />
                    </Route>
                     </Route>
                     <Route path="/add-patient" element={<AddPatient/>}/>
                     <Route path="/search" element={<RecordSearch/>}/>
                     <Route path="/view-patient" element={<Patient/>}/>
                     <Route path="/new-patient" element={<NewPatient/>}/>
                     <Route path="/view" element={<Report/>} />  

                     
                    <Route path="/PatientLogin" element={<PatientLogin />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
