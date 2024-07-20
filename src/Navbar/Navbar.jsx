import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/freshcart-logo.svg"

export default function Navbar() {
  return <>
  <nav className="navbar fw-semibold  navbar-expand-lg p-4">
  <div className="container">
    <NavLink className="navbar-brand me-5 freshcart-head" to="home"><img src={logo} alt="" /></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Wishlist">Wishlist</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="cart">Cart</NavLink>
        </li>
       
        
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="cart">
          <i className="fa-solid fa-cart-shopping fa-lg mt-2 me-2"></i> 
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Register</NavLink>
        </li>
       
       
        
      </ul>
     
    </div>
  </div>
  </nav>


  
  
  
  </>
}
