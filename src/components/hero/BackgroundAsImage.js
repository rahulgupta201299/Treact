import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import swal from 'sweetalert'
import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import { Link } from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";
import {FaPlayCircle} from 'react-icons/fa'
const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;


const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-500 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;


const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-500 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
  padding-bottom: 56.25% !important;
  padding-top: 0px !important;
  ${tw`rounded`}
  iframe {
    ${tw`rounded bg-black shadow-xl`}
  }
`;


function BackgroundAsImage(){
  const [phone,setPhone]=useState(true)
  const [left,setLeft]=useState('')
  const [open,setOpen]=useState(false)
  const [imageSize,setImageSize]=useState("40%")
  useEffect(() => {
    if(window.innerWidth<1024){
      setPhone(false)
      setLeft('')
    }
    else{
      setPhone(true)
      setLeft('100px')
    }
    const updateWindowDimensions = () => {
      const Width = window.innerWidth;
      if(Width<1024){
        setPhone(false)
        setLeft('')
        setImageSize("70%")
      }
      else{
        setPhone(true)
        setLeft('100px')
        setImageSize("40%")
      }
    };
  
    window.addEventListener("resize", updateWindowDimensions);
  
    return () => window.removeEventListener("resize", updateWindowDimensions) 
  
  }, []);
  //const RightColumn = ;
  const RightColumn = open? tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`:tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-56 lg:pl-72`;
  const navLinks = [
    <NavLinks style={{margin:"10px"}} key={1}>
      <NavLink to="/meetOurTeam">
        Meet the Team
      </NavLink>
      <NavLink to="/research_projects">
        Research Projects
      </NavLink>
      <NavLink to="/publications">
        Publictaions
      </NavLink>
      <NavLink to="/research_facilities">
        Research Facilities
      </NavLink>
      {
        phone? <><br/><br/></>:null
      }
      <NavLink style={{marginLeft:`${left}`}} to="/about">
        About Us
      </NavLink>

      <NavLink to="/opportunities">
        Opportunities
      </NavLink>
      <NavLink to="/events">
        Events
      </NavLink>
      <NavLink to="/contact_us">
        Contact Us
      </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink to="/mission">
        Mission and Vision
      </PrimaryLink>
    </NavLinks>
  ];
  const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url("https://i.ibb.co/nczkWJx/hero-academic.png");
  background-size: ${imageSize};
  background-repeat: no-repeat;
`;
const handleClick=()=>{
  swal({icon:'success',text:'Hey Rahul!'})
}
  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            <Notification style={{fontSize:"30px"}}>Department of Neurophysiology</Notification>
            <Heading>
              <span style={{fontSize:"60px"}}>Centre for Consciousness Studies</span>
              <br />
              <SlantedBackground>NIMHANS</SlantedBackground>
            </Heading>
            <PrimaryAction onClick={handleClick}>Read Customer Stories</PrimaryAction>
          </LeftColumn>
          <RightColumn>
            {
              open?(
                <>
                <button style={{marginLeft:"96.5%",cursor:"pointer",borderRadius:"100%",backgroundColor:"white",padding:"4px"}} onClick={()=>setOpen(false)}><AiOutlineClose /></button>
                <StyledResponsiveVideoEmbed
                  url="//player.vimeo.com/video/374265101?title=0&portrait=0&byline=0&autoplay=0&responsive=1"
                  background="transparent"
                />
                </>
              ):
              <PrimaryAction style={{cursor:"pointer"}} onClick={()=>setOpen(true)}><FaPlayCircle size={35} style={{display:"inline-block"}}/> Watch Video</PrimaryAction>
            }
          </RightColumn>
        </TwoColumn>
      </HeroContainer>
    </Container>
  );
};

export default BackgroundAsImage

/*


      
      */