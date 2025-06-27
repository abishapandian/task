import React, { useEffect, useState } from "react";
import "../Style/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [userdetails , setuserdetails] = useState([])
  const [editid , seteditid] = useState("");
  const [popup , setpopup] = useState("");
  const [editusername , seteditusername] = useState("");
  const [editpassword, seteditpassword] = useState("");



  const fetchitem = async() =>{
    try {
       const res = await fetch("http://localhost:4000/users");
       const data = await res.json();
       setuserdetails(data.result);
    } catch (error) {
      console.error("message:" , error.message);
    }
  }

  useEffect(()=>{
    fetchitem();
  },[])

  const submit = async(e) => {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:4000/users",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            username,password
        })
        })
        const data = await res.json();
        setusername("");
        setpassword("");
        fetchitem();
        alert(data.message);
    }catch (error) {
        console.error("message:" , error.message)
    }
  };
  const openeditpopup = (item) =>{
    seteditid(item.id);
    seteditusername(item.username);
    seteditpassword(item.password)
    setpopup(true);
  }
  const edit = async(e) =>{
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/users/${editid}`,{
        method:"PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
          username:editusername , password:editpassword
        })
      })
      seteditusername();
      seteditpassword();
      fetchitem();
    } catch (error) {
      console.error("message:", error.message)
    }
  }
  const deleteitem = async(id)=>{
    try {
      const res = await fetch(`http://localhost:4000/users/${id}`,{
        method:"delete"
      });
      fetchitem();
      
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <>
      <section>
        <div>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></input>
        </div>
        <br />
        <div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
        </div>
        <br />
        <button type="submit" onClick={submit}>
          SUBMIT
        </button>
      </section>
      <ul>
        {userdetails.map((item) => (
          <div>
            <div>{item.username}</div>
            <div>{item.password}</div>
            <button type="submit" onClick={() => openeditpopup(item)}>
              EDIT
            </button>
            <button type="submit" onClick={()=>deleteitem(item.id)}>DELETE</button>
          </div>
        ))}
      </ul>

      {popup && (
        <div className="table">
          <form>
            <div>
              <input
                type="text"
                value={editusername}
                onChange={(e) => seteditusername(e.target.value)}
              ></input>
            </div>
            <br />
            <div>
              <input
                type="password"
                value={editpassword}
                onChange={(e) => seteditpassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button type="submit" onClick={edit}>
                UPDATE
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
