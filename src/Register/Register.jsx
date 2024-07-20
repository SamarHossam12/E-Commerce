import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
  let NavToLogin=useNavigate()
  let [errMsg,setErrorMsg]=useState("")
  let [loading,setLoading]=useState(true)
  async function RegisterForm(val)
  {
    setLoading(false)
    let req= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",val)
    .catch((err)=>
    {
      setErrorMsg(err.response.data.message)
      setLoading(true)

    })

    if(req?.data.message=="success")
    {
      NavToLogin('/Login')
      setLoading(true)
    }
  
  }
  let validation=Yup.object({
    name:Yup.string().required("Name is Required").min(3,"Min Character 3").max(20,"Max Characters 10"),
    email:Yup.string().required("Email is Requierd").email("Enter Valid E-mail"),
    password:Yup.string().required("password is Required").
    matches(/^[A-Z][a-zA-Z!@#$%^&*(_]{6,16}$/,"Enter Valid Password"),
    rePassword:Yup.string().required(" Confirm Your Password !").oneOf([Yup.ref("password")],
    "Re Password isn't Matched"),
    phone:Yup.string().required("Phone Number is Required").matches(/^01[1250][0-9]{8}$/,"Enter Valid Phone"),
  
  })
 let SignUpForm= useFormik(
  {
    initialValues:{
      name:"",
      phone:"",
      email:"",
      password:"",
      rePassword:"",
    },
    onSubmit:RegisterForm,
    validationSchema:validation
  }
 );
  
  return <>
    <h1 className='text-center mt-4'> Register Now</h1>
    <div className="container me-5">
      {errMsg!=""?<div className='alert alert-danger w-75 mt-5'>{errMsg}</div>:""}
    <form onSubmit={SignUpForm.handleSubmit}>
      <label className='mb-2' htmlFor="name">Name</label>
      <input onBlur={SignUpForm.handleBlur} onChange={SignUpForm.handleChange} type="text" name="name" id="name" className='form-control w-75 mb-2 ' />
      {(SignUpForm.errors.name && SignUpForm.touched.name)?<div className='alert alert-danger w-75'>
        {SignUpForm.errors.name}
      </div>:""}
      
      <label className='mb-2' htmlFor="email">Email</label>
      <input onBlur={SignUpForm.handleBlur} onChange={SignUpForm.handleChange} type="email" name="email" id="email" className='form-control w-75 mb-2' />
      {(SignUpForm.errors.email && SignUpForm.touched.email)?<div className='alert alert-danger w-75'>
        {SignUpForm.errors.email}
      </div>:""}
      <label className='mb-2' htmlFor="phone">Phone</label>
      <input onBlur={SignUpForm.handleBlur} onChange={SignUpForm.handleChange} type="tel" name="phone" id="phone" className='form-control w-75 mb-2 ' />
      {(SignUpForm.errors.phone && SignUpForm.touched.phone)?<div className='alert alert-danger w-75'>
        {SignUpForm.errors.phone}
      </div>:""}
      <label className='mb-2' htmlFor="password">Password</label>
      <input onBlur={SignUpForm.handleBlur} onChange={SignUpForm.handleChange} type="password" name="password" id="password" className='form-control w-75 mb-2' />
      {(SignUpForm.errors.password && SignUpForm.touched.password)?<div className='alert alert-danger w-75'>
        {SignUpForm.errors.password}
      </div>:""}
      <label className='mb-2' htmlFor="rePassword">RePassword</label>
      <input onBlur={SignUpForm.handleBlur} onChange={SignUpForm.handleChange} type="password" name="rePassword" id="rePassword" className='form-control w-75 mb-2' />
      {(SignUpForm.errors.rePassword && SignUpForm.touched.rePassword)?<div className='alert alert-danger w-75'>
        {SignUpForm.errors.rePassword}
      </div>:""}
    
    {loading?<button disabled={!(SignUpForm.dirty && SignUpForm.isValid)} className=' btn  main-bg text-white mt-4' type="submit">Register</button>
      :<button className=' btn  main-bg text-white mt-4' type="button">
         <i className='fa-solid fa-spinner fa-spin'></i>
        </button>}
    </form>

    </div>
  </>
}
