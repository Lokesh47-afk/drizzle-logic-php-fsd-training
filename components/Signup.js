import { useState } from "react";
import { Link } from "react-router-dom";

function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const saveUser = () => {
        // alert(username + " " + password);
        fetch("http://127.0.0.1:8000/api/users",{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                "username":username,
                "password":password
            })
        }).then(
            res => res.json()
        ).then(res => {
            alert("User saved Successfully");
        });
    }

    return(
        <div id="signup-div">
            <h2>Sign Up</h2>
            Username: <input type="text" onChange={(e) => setUsername(e.target.value)}/> <br /> <br />
            Password: <input type="password" onChange={(e) => setPassword(e.target.value)}/> <br /> <br />
            <input type="Submit" value="Sign Up" onClick={saveUser} /> <br /><br />
            <Link to="/login"> Already Registered? Login!!!</Link>
        </div>
    )
}

export default Signup;