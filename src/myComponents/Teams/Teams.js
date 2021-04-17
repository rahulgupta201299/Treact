import React, { useEffect,useState } from 'react'
import tw from "twin.macro"
import Axios from 'axios'
import Slider from 'react-slick'
import AnimationRevealPage from '../../helpers/AnimationRevealPage'
import TeamCardGrid from "../../components/cards/ProfileThreeColGrid"
import TeamMember from '../../components/cards/TeamMembers'
import swal from 'sweetalert'
function Teams() {
    const [category,setCategory]=useState([{}])
    
    useEffect(()=>{
        
        Axios.get('/category/team').then(res=>{
            var arr=res.data
            arr.sort((a,b)=>{
                return a.order-b.order
            })
            setCategory(arr)
            console.log(arr)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
    },[])
    
    return (
        <AnimationRevealPage>
            {
                category.map((card,i)=>(
                    <TeamMember head={card.heading} />
                ))
            }
        </AnimationRevealPage>
    )
}

export default Teams

/*

<div>
            <AnimationRevealPage>
            
                <TeamCardGrid subheading={<Subheading>Our Team</Subheading>} />
            </AnimationRevealPage>
        </div>

        */