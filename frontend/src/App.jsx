import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MenuDetails from './pages/MenuDetails.jsx'
import Cart from './pages/Cart.jsx'
import Menu from './pages/Menu.jsx'

import Checkout from './pages/Checkout.jsx'
import BookTable from './pages/BookTable.jsx'
import MyBookings from './pages/MyBooking.jsx'
import MyOrders from './pages/MyOrders.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Contact from './pages/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import { useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer.jsx'
const App = () => {
  const adminPath = useLocation().pathname.includes("admin")
  return (
    <div>
      <Toaster/>
     {!adminPath&&<Navbar/>} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:id" element={<MenuDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
      {!adminPath&&<Footer/>} 
    </div>
  )
}

export default App