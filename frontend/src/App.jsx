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
import AdminLayout from './pages/admin/AdminLayout.jsx'
import { AppContext } from './context/AppContext.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import { useContext } from 'react'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddCategory from './pages/admin/AddCategory.jsx'
import AddMenu from './pages/admin/AddMenu.jsx'
import Categories from './pages/admin/Categories.jsx'
import Menus from './pages/admin/Menus.jsx'
import Orders from './pages/admin/Orders.jsx'
import Bookings from './pages/admin/Bookings.jsx'
const App = () => {
  const adminPath = useLocation().pathname.includes("admin");
  const {admin}=useContext(AppContext)
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
        {/*Admin Routes*/}
        <Route path="/admin" element={admin ? <AdminLayout /> : <AdminLogin />}>
          <Route index element={admin ? <Dashboard /> : <AdminLogin />} />
          <Route path="add-category" element={admin ? <AddCategory /> : <AdminLogin />} />
          <Route path="add-menu" element={admin ? <AddMenu /> : <AdminLogin />} />
          <Route path="categories" element={admin ? <Categories /> : <AdminLogin />} />
          <Route path="menu" element={admin ? <Menus /> : <AdminLogin />} />
          <Route path="orders" element={admin ? <Orders /> : <AdminLogin />} />
          <Route path="bookings" element={admin ? <Bookings /> : <AdminLogin />}/>
          
          </Route>
          

        
      </Routes>
      {!adminPath&&<Footer/>} 
    </div>
  )
}

export default App