import React, { useEffect, useState } from 'react'
import '../Style/card.css'

export default function Admin() {
    const [username , setusername] = useState("");
    const [password , setpassword] = useState("");
    const [admindetails , setadmindetails] = useState([]);
    const fetchitem = async()=>{
        const res = await fetch("http://localhost:4000/admin");
        const data = await res.json();
        setadmindetails(data.result);
    }

    useEffect(()=>{
        fetchitem();
    },[])

    const submit = async(e) =>{
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4000/admin" , {
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    username , password
                })
            })
            const data = await res.json();
            setusername();
            setpassword();
            alert(data.message);
        } catch (error) {
            console.error("message:",error.message);
        }
    }
  return (
    <>
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
      {admindetails.map((item) => (
        <div>
          <table className="table">
            <tr className="table">
              <th className="table" colSpan={2}>Admindetails</th>
            </tr>
            <tr className="table">
              <th className="table">name</th>
              <th className="table">password</th>
            </tr>
            <tr className="table">
              <td className="table">{item.username}</td>
              <td className="table">{item.password}</td>
            </tr>
          </table>
        </div>
      ))}
    </>
  );
}
