import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {

    let NavToLogin=useNavigate()
    let [errMsg,setErrorMsg]=useState("")
    let [loading,setLoading]=useState(true)
    let [formStatus,setFormSatatus]=useState(true)
    async function ForgetForm(val)
    {
      setLoading(false)
      let req= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",val)
      .catch((err)=>
      {
        setErrorMsg(err.response.data.message)
        setLoading(true)
  
      })
  
      if(req?.data.statusMsg =="success")
      {
        setFormSatatus(false)
        setLoading(true)
      }
    
    }
    let validation=Yup.object({
        email:Yup.string().required("Email is Requierd").email("Enter Valid E-mail"),
      })
      let codeValid=Yup.object({
        resetCode:Yup.string().required("Code is Required").matches(/^[0-9]{5,6}$/,"Enter Valid Code")
      })
      let forgetPassForm= useFormik(
        {
          initialValues:{
            email:"",
          },
          onSubmit:ForgetForm,
          validationSchema:validation
        }
       );
       let CodeForm=useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit:codeVerify,
        validationSchema:codeValid
       })
       async function codeVerify(value) {
       let request=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",value)
       .catch((error)=>
       {
        setErrorMsg(error.response.data.message)
       })  

       if(request?.data.status=="Success")
       {
        NavToLogin("/resetpass")
       }
      
     }
  return <>
    {formStatus ?  <div className="container me-5 mt-5">
      {errMsg?<div className='alert alert-danger w-75 mt-5'>{errMsg}</div>:""}
    <form onSubmit={forgetPassForm.handleSubmit}>
      
      
      <label className='mb-2' htmlFor="email">Email</label>
      <input onBlur={forgetPassForm.handleBlur} onChange={forgetPassForm.handleChange} type="email" name="email" id="email" className='form-control w-75 mb-2' />
      {(forgetPassForm.errors.email && forgetPassForm.touched.email)?<div className='alert alert-danger w-75'>
        {forgetPassForm.errors.email}
      </div>:""}
      
    {loading?<button disabled={!(forgetPassForm.dirty && forgetPassForm.isValid)} className=' btn  main-bg text-white mt-4' type="submit">Send</button>
      :<button className=' btn  main-bg text-white mt-4' type="button">
         <i className='fa-solid fa-spinner fa-spin'></i>
        </button>}
    </form>

    </div>: <div className="container me-5 mt-5">
      {errMsg!=""?<div className='alert alert-danger w-75 mt-5'>{errMsg}</div>:""}
    <form onSubmit={CodeForm.handleSubmit}>
      <label className='mb-2' htmlFor="resetCode">Reset Code</label>
      <input value={CodeForm.values.resetCode} onBlur={CodeForm.handleBlur} onChange={CodeForm.handleChange} type="" name="resetCode" id="resetCode" className='form-control w-75 mb-2' />
      {(CodeForm.errors.resetCode && CodeForm.touched.resetCode)?<div className='alert alert-danger w-75'>
        {CodeForm.errors.resetCode}
      </div>:""}
      
    {loading?<button disabled={!(CodeForm.dirty && CodeForm.isValid)} className=' btn  main-bg text-white mt-4' type="submit">Verify</button>
      :<button className=' btn  main-bg text-white mt-4' type="button">
         <i className='fa-solid fa-spinner fa-spin'></i>
        </button>}
    </form>
    </div>} 
  </>
}
