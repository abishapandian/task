import React, { useEffect, useState } from 'react'
import "../Style/profile.css";


export default function Profile() {
  const [user , setuser] = useState();
  const userdetails = [
    { username: "abi", password: "2712" },
    { username: "sree", password: "2604" },
  ];

  useEffect(()=>{
    const username = JSON.parse(localStorage.getItem("userdata"));
    const user = userdetails.find((value) => (value.username === username));
    setuser(user)
  },[])
  return (
    <div>username:{user.username}</div>
  )
}
