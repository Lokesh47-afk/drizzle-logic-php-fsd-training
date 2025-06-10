import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

function Users(){
     const [users_data,setUsers]=useState([0]);
    
    const [updated_username,setUpdatedUsername] = useState('');
    const [updated_password,setUpdatedPassword] = useState('');

     useEffect(() => {
            fetch("http://localhost:8000/api/users")
            .then(resp => resp.json())
            .then((resp)=>{
                    console.log(resp);
                    setUsers(resp);
            })
     },[]);

     const updateUser = (id) => {
        // alert("User id clicked : " + id);
        // call PUT API
        fetch("http://127.0.0.1:8000/api/users/" + id,{
            method:"PUT",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                "username":updated_username,
                "password":updated_password
            })
        }).then(
            res => res.json()
        ).then(res => {
            alert("User Updated Successfully");
        });
     }

     const deleteUser = (id) => {
        // alert("User id clicked : " + id);
        // call DELETE API
          fetch("http://127.0.0.1:8000/api/users/" + id,{
            method:"DELETE",          
            
        }).then(
            res => res.json()
        ).then(res => {
            alert("User Deleted Successfully")         
           
        });
     }

    return(
        <>
        <Link to="/home" >Home</Link>
             <table id="users-table">
                    <thead>
                        <tr> 
                            <th>Id</th>                           
                            <th>Username</th>
                            <th>Password</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users_data.map((user) => (
                            <tr>
                                <td>{user.id}</td>
                                <td><input type='text' defaultValue={user.username} onChange={(e) => setUpdatedUsername(e.target.value)}/></td>
                                <td><input type='text' defaultValue={user.password} onChange={(e) => setUpdatedPassword(e.target.value)}/></td>
                                <td><button onClick={() => updateUser(user.id)}>Update</button></td>
                                <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>                   
                </table>

        </>
    )
}

export default Users;