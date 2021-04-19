import Axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert'
import './ContactUs.scss'
function ContactUs() {
    const [name,setName]=useState('')
    const [location,setLocation]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [message,setMessage]=useState('')

    const handleClick=()=>{

        const data={
            name:name,
            email:email,
            location:location,
            phone:phone,
            message:message
        }
        Axios.post('http://localhost:9000/contact',data).then(res=>{
            console.log(res.data)
            swal({tite:"Message Sent",text:"We will get back to you soon!",icon:"success"})
        }).catch(()=>{
            swal({title:"Message Not sent",text:"An Error Occured. Try Again!",icon:"warning"})
        })
    }

    return (
        <div className="contact2 bg1" id="contact">
        <div className="container">
            <div className="row contact-container">
            <div className="col-lg-12">
                <div className="card card-shadow border-0 mb-4">
                <div className="row">
                    <div className="col-lg-8">
                    <div className="contact-box p-4">
                        <h4 className="title">Contact Us</h4>
                        <div className="row">
                            <div className="col-lg-6">
                            <div className="form-group mt-3">
                                <input onChange={(e)=>setName(e.target.value)} className="form-control" type="text" placeholder="Name" required/>
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group mt-3">
                                <input onChange={(e)=>setEmail(e.target.value)} className="form-control" type="email" placeholder="Email" required/>
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group mt-3">
                                <input onChange={(e)=>setPhone(e.target.value)} className="form-control" type="phone" placeholder="Phone" required/>
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group mt-3">
                                <input onChange={(e)=>setLocation(e.target.value)} className="form-control" type="text" placeholder="Location" required/>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group mt-3">
                                <textarea onChange={(e)=>setMessage(e.target.value)} style={{height:"120px",overflow:"hidden"}} className="form-control" type="text" placeholder="Descibe your query or message" required/>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <button onClick={handleClick} className="btn btn-danger-gradiant mt-3 mb-3 text-white border-0 py-2 px-3"><span> SUBMIT NOW <i className="ti-arrow-right"></i></span></button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 bg-image bg2">
                    <div className="detail-box p-4">
                        <h5 className="text-white font-weight-light mb-3">ADDRESS</h5>
                        <p className="text-white op-7">601 Sherwood Ave.
                        <br /> San Bernandino</p>
                        <h5 className="text-white font-weight-light mb-3 mt-4">CALL US</h5>
                        <p className="text-white op-7">251 546 9442
                        <br /> 630 446 8851</p>
                        <div className="round-social light">
                        <a href="#" className="ml-0 text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-facebook"></i></a>
                        <a href="#" className="text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-twitter"></i></a>
                        <a href="#" className="text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-youtube"></i></a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default ContactUs
