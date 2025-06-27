import React from 'react'
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Card from './Pages/Card';
import Cart from './Pages/Cart';
import Users from "./Pages/Users";
import Admin from './Pages/Admin';
import Course from './Pages/Course';


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/card" element={<Card />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/course" element={<Course />} />
        </Routes>
      </Router>
    </>
  );
}
