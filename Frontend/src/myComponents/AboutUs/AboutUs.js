import Axios from 'axios'
import React,{useState,useEffect} from 'react'
import AnimationRevealPage from '../../helpers/AnimationRevealPage'
import NewSlider from '../../components/cards/NewSlider'
import { Link } from 'react-router-dom'
function AboutUs() {
    const [data,setData]=useState([])
    useEffect(()=>{
        Axios.get('http://localhost:9000/new/blog').then(res=>{
            var arr=res.data
            arr.sort((a,b)=>{
                return (a.order-b.order)
            })
            setData(arr)
            console.log(arr)
        })
    },[])
    return (
        <AnimationRevealPage>
            {
                data.map((card,i)=>(
                    <>
                    <Link to={`/new/${card.path}`}>Go here</Link>
                    {card.LeftImageRightText!=='undefined'?(card.LeftImageRightText? <h1>Here image will be on leftside and desc on the right side</h1>:<h1>Here desc will be left side and image will be on right side</h1>):null}
                    {card.slider!=='undefined'?<NewSlider />: null}
                    </>
                ))
            }
        </AnimationRevealPage>
    )
}

export default AboutUs
