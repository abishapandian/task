import React, { useState } from 'react'
import "../Style/login.css";
import {useNavigate} from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();
  const [username , setusername] = useState("");
  const [password , setpassword] = useState("");

  const userdetails = [
    { username: "abi", password: "2712" },
    { username: "sree", password: "2604" },
  ];


  const submit = (e) => {
    e.preventDefault();
    if(username.trim() === ""){
      alert("Enter The username")
    }

    const user = userdetails.find((value)=> (value.username === username));
    
    if(user){
      if(user.password === password){
        localStorage.setItem("userdata" , JSON.stringify(username))
        navigate("/Profile")
      }
      else{
        alert("Incorrect Password")
      }
    }
    else{
      alert("invalid User")
    }
  }
  return (
    <>
      <section>
        <form onSubmit={submit}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            ></input>
          </div>
          <br />
          <div>
            <input
              type="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
          </div>
          <br />
          <button type="submit">SUBMIT</button>
        </form>
      </section>
    </>
  );
}
