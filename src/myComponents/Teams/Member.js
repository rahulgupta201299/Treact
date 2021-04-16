import React,{useEffect,useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useParams} from 'react-router'
import axios from 'axios'
import swal from 'sweetalert'
function Member() {
    const {category,id}=useParams()
    useEffect(()=>{
        axios.get(`http://localhost:9000/team/TeamMember/${id}`).then(res=>{
            console.log(res.data)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
    },[])
    return (
        <div>
            
        </div>
    )
}

export default withRouter(Member)
