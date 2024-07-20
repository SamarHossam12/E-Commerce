import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'


export default function ResetPassword() {
    let NavToLogin=useNavigate()
    let [errMsg,setErrorMsg]=useState("")
    let [loading,setLoading]=useState(true)
     async function resetPassword(val)
     {
        setLoading(false)

        let req= await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",val)
        .catch((err)=>{
            setErrorMsg(err.response.data.message)
            setLoading(true)
        }) 
        
    if(req.data.token)
    {
      NavToLogin('/login')
      setLoading(true)
    }
    
     }
     let validation=Yup.object({
        email:Yup.string().required("Email is Requierd").email("Enter Valid E-mail"),
        newPassword:Yup.string().required("password is Required").
        matches(/^[A-Z][a-zA-Z!@#$%^&*(_]{6,16}$/,"Enter Valid Password"),
        
    })
    
    let Formik2=useFormik({
        initialValues:{
            email:"",
            newPassword:""
        },
        onSubmit:resetPassword,
        validationSchema:validation

    })
 
  return <>
    <div className="container me-5">
      {errMsg!=""?<div className='alert alert-danger w-75 mt-5'>{errMsg}</div>:""}
    <form onSubmit={Formik2.handleSubmit}>
      
      
      <label className='mb-2' htmlFor="email">Email</label>
      <input onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} type="email" name="email" id="email" className='form-control w-75 mb-2' />
      {(Formik2.errors.email && Formik2.touched.email)?<div className='alert alert-danger w-75'>
        {Formik2.errors.email}
      </div>:""}
      
      <label className='mb-2' htmlFor="newPassword">New Password</label>
      <input onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} type="password" name="newPassword" id="newPassword" className='form-control w-75 mb-2' />
      {(Formik2.errors.newPassword && Formik2.touched.newPassword)?<div className='alert alert-danger w-75'>
        {Formik2.errors.newPassword}
      </div>:""}

    {loading?<button disabled={!(Formik2.dirty && Formik2.isValid)} className=' btn  main-bg text-white mt-4' type="submit">Reset</button>
      :<button className=' btn  main-bg text-white mt-4' type="button">
         <i className='fa-solid fa-spinner fa-spin'></i>
        </button>}
    </form>

    </div>
  </>

}
