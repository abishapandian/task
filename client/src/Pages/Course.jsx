import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Course() {
  const [username , setusername] = useState("");
  const [course, setcourse] = useState("");
  const [coursedetails , setuserdetails] = useState([]);
  const [editusername, seteditusername] = useState("");
  const [editcourse, seteditcourse] = useState("");
  const [editid , seteditid] = useState();
  const [popup , setpopup] = useState(false);

  const fetchitem = async() =>{
    const res = await fetch("http://localhost:4000/course")
    const data = await res.json();
    setuserdetails(data.result);
  }

  useEffect(()=>{
    fetchitem();
  },[])

  const additem = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/course" , {
        method:"POST" , 
        headers:{"Content-type" : "application/json"} , 
        body:JSON.stringify({
          username , course
        })
      })
      const data = await res.json();
      setusername("");
      setcourse("");
      fetchitem();
      alert(data.message);
    } catch (error) {
      console.error(error.message)
    }
  }

  const edit = (item) =>{
    seteditusername(item.username);
    seteditcourse(item.course);
    seteditid(item.id)
    setpopup(true);
  }

  const edititem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/course/${editid}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          editusername,
          editcourse,
        }),
      });
      setpopup(false);
      fetchitem();
    } catch (error) {
      console.error(error.message);
    }
  };


  const deleteitem = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/course/${id}`, {
        method: "DELETE"
      });
      fetchitem();
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <>
      <section>
        <form onSubmit={additem}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              value={course}
              onChange={(e) => setcourse(e.target.value)}
            ></input>
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </section>

      {coursedetails.map((item) => (
        <div>
          {item.username}
          {item.course}
          <button type="submit" onClick={() => edit(item)}>
            EDIT
          </button>
          <button type="submit" onClick={() => deleteitem(item.id)}>
            DELETE
          </button>
        </div>
      ))}

      {popup && (
        <form onSubmit={edititem}>
          <div>
            <input
              type="text"
              value={editusername}
              onChange={(e) => seteditusername(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              value={editcourse}
              onChange={(e) => seteditcourse(e.target.value)}
            ></input>
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      )}
    </>
  );
}
