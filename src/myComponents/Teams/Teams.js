import React, { useEffect,useState } from 'react'
import tw from "twin.macro"
import Axios from 'axios'
import Slider from 'react-slick'
import AnimationRevealPage from '../../helpers/AnimationRevealPage'
import TeamCardGrid from "../../components/cards/ProfileThreeColGrid"
import TeamMember from '../../components/cards/TeamMembers'
import swal from 'sweetalert'
function Teams() {
    const [investigator,setInvestigator]=useState([{}])
    const [researcher,setResearcher]=useState([{}])
    const [graduate,setGraduate]=useState([{}])
    const [administration,setAdministration]=useState([{}])
    const [alumni,setAlumni]=useState([{}])

    useEffect(()=>{
        Axios.get('http://localhost:9000/team/investigator').then(res=>{
            setInvestigator(res.data)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
        Axios.get('http://localhost:9000/team/graduate').then(res=>{
            setGraduate(res.data)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
        Axios.get('http://localhost:9000/team/administration').then(res=>{
            setAdministration(res.data)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
        Axios.get('http://localhost:9000/team/researchers').then(res=>{
            setResearcher(res.data)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
        Axios.get('http://localhost:9000/team/alumni').then(res=>{
            setAlumni(res.data)
        }).catch(()=>{
            swal({title:"Network Error",text:"Please Connect to an active Internet Connection",icon:"warning"}).then(()=>window.location.reload())
        })
    },[])
    
    return (
        <AnimationRevealPage>
            <TeamMember endpoint="investigator" head="Prinicipal Investigators" data={investigator}/>
            <TeamMember endpoint="researchers" head="Researchers" data={researcher}/>
            <TeamMember endpoint="graduate" head="Graduate Students" data={graduate}/>
            <TeamMember endpoint="administration" head="Administration" data={administration}/>
            <TeamMember endpoint="alumni" head="Alumni" data={alumni}/>
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