import React,{useEffect,useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useParams} from 'react-router'
import axios from 'axios'
import './Member.scss'
import swal from 'sweetalert'
import url from '../../base'
function Member() {
    const {id}=useParams()
    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get(`${url}/team/TeamMember/${id}`).then(res=>{
            setData(res.data)
            console.log(res.data)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
    },[])
    return (
        <div className="container">
            {
                data ? data.map((card,i)=>(
                    <>
                    <div className="contain">
                        <img className="image" src={card.image} />
                    </div>
                    <div className="contain">
                        <strong><h1 className="heading">About Myself</h1></strong>
                    </div>
                    </>
                )):null
            }
        </div>
    )
}

export default withRouter(Member)
