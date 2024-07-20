import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import Categories from './Categories/Categories'
import Products from './Products/Products'
import Wishlist from './Wishlist/Wishlist'
import Cart from './Cart/Cart'
import Login from './Login/Login'
import Register from './Register/Register'
import Notfound from './Notfound/Notfound'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ResetPassword from './ResetPassword/ResetPassword'

export default function App() {
  let Routers=createBrowserRouter([
    {path:"",element:<Layout></Layout>,children:[
      {path:"home",element:<Home></Home>},
      {path:"categories",element:<Categories></Categories>},
      {path:"Products",element:<Products></Products>},
      {path:"Wishlist",element:<Wishlist></Wishlist>},
      {path:"cart",element:<Cart></Cart>},
      {path:"Login",element:<Login></Login>},
      {path:"ForgetPassword",element:<ForgetPassword></ForgetPassword>},
      {path:"resetpass",element:<ResetPassword></ResetPassword>},
      {index:true,element:<Register></Register>},
      {path:"*",element:<Notfound></Notfound>},

    ]}
  ])
  return <>
    <RouterProvider router={Routers}></RouterProvider>
  
  
  
  
  </>
}
