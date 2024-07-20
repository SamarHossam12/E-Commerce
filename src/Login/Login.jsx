import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Login() {

  let NavToLogin=useNavigate()
  let [errMsg,setErrorMsg]=useState("")
  let [loading,setLoading]=useState(true)
  async function LoginForm(val)
  {
    setLoading(false)
    let req= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",val)
    .catch((err)=>
    {
      setErrorMsg(err.response.data.message)
      setLoading(true)

    })

    if(req?.data.message=="success")
    {
      NavToLogin('/home')
      setLoading(true)
    }
  
  }
  let validation=Yup.object({
    email:Yup.string().required("Email is Requierd").email("Enter Valid E-mail"),
    password:Yup.string().required("password is Required").
    matches(/^[A-Z][a-zA-Z!@#$%^&*(_]{6,16}$/,"Enter Valid Password"),
    
  })
 let SigninForm= useFormik(
  {
    initialValues:{
      
      email:"",
      password:"",
    
    },
    onSubmit:LoginForm,
    validationSchema:validation
  }
 );

  return <>
  <h1 className='text-center mt-4'>Login Now</h1>
    <div className="container me-5">
      {errMsg!=""?<div className='alert alert-danger w-75 mt-5'>{errMsg}</div>:""}
    <form onSubmit={SigninForm.handleSubmit}>
      
      
      <label className='mb-2' htmlFor="email">Email</label>
      <input onBlur={SigninForm.handleBlur} onChange={SigninForm.handleChange} type="email" name="email" id="email" className='form-control w-75 mb-2' />
      {(SigninForm.errors.email && SigninForm.touched.email)?<div className='alert alert-danger w-75'>
        {SigninForm.errors.email}
      </div>:""}
      
      <label className='mb-2' htmlFor="password">Password</label>
      <input onBlur={SigninForm.handleBlur} onChange={SigninForm.handleChange} type="password" name="password" id="password" className='form-control w-75 mb-2' />
      {(SigninForm.errors.password && SigninForm.touched.password)?<div className='alert alert-danger w-75'>
        {SigninForm.errors.password}
      </div>:""}
      <NavLink className="nav-link fs-6" to="/ForgetPassword">Forget Password ? </NavLink>

    {loading?<button disabled={!(SigninForm.dirty && SigninForm.isValid)} className=' btn  main-bg text-white mt-4' type="submit">Login</button>
      :<button className=' btn  main-bg text-white mt-4' type="button">
         <i className='fa-solid fa-spinner fa-spin'></i>
        </button>}
    </form>

    </div>
  </>
}
