import React,{useState} from 'react';
import './login.css';
import axios from "axios"
import PatientDetails from './PatientDetails';
import Navbar from '../Navbar';
const PatientLogin = () => {
  const [id, setId] = useState("")
  const [org, setOrg] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const form={ID:"",pass:""}
  const[loginForm,setLoginForm]=useState(form)
  const handleInput=(e)=>{
    setLoginForm({...loginForm,[e.target.name]:e.target.value})
  }
// generate 
  function getOrg(str) {
    return str.split('#')[1];
  }
  // use the function:
  // alert(getSecondPart("sometext-20202"));
  const match=()=>{
    setIsAuth(true)
    setId(loginForm.ID)
    setOrg(getOrg(id)) 
    console.log(id,org)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(loginForm)
    await axios.post('http://localhost:4000/login',loginForm).then((Response)=>{
      Response&&Response.data?match():setIsAuth(false)
      Response&&console.log(Response.data)
      setLoginForm(form)
    }).catch((error)=>{
      console.error(error)
    })
  }
  return (
    <React.Fragment>
      <Navbar/>
      {isAuth?<PatientDetails setIsAuth={setIsAuth} pid={id} /> :<div className="body">
      {/* {isAuth?<><p>hello</p><button onClick={()=>{setIsAuth(false)}}>logout</button></>:<div className="body"> */}
    <div className="wrapper">
    <h2>Patient login</h2>
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <input aria-autocomplete={false} autoComplete={false} value={loginForm.ID} onChange={handleInput} name="ID" type="text" placeholder="Enter your ID" required/>
      </div>
      <div className="input-box">
        <input autoComplete={false} value={loginForm.pass} onChange={handleInput} name="pass" type="password" placeholder="Enter your password" required/>
      </div>
      <div className="input-box button">
        <input type="Submit" value="Login"/>
      </div>
    </form>
  </div>
  </div>}
    </React.Fragment>
  );
};

export default PatientLogin;
