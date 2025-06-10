import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    //useState Hook....
    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const validate =() =>{
       // alert(userName + "" + password);
        if(userName == "admin" && password == "admin123"){
            navigate("/home");
        }else{
            alert("Please verify credentials....")
        }
      //  alert("validating user....");
        //navigate("/home");
    }
    return(
        <div id="login-div">
            Username: <input type="text" onChange={(e) =>setUsername(e.target.value)} /> <br/> <br />
            Password: <input type="password" onChange={(e) =>setPassword(e.target.value)}/> <br/> <br />
            <input type="Submit" value="login" onClick={validate}/> <br/> <br />
           <Link to="/signup">Not yet Registered?? sign up</Link>
        </div>
    )   
}

export default Login;