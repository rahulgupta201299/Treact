import React,{useState,useEffect} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import TeamIllustrationSrc from "images/team-illustration-2.svg";
import {ReactComponent as SvgDotPattern } from "images/dot-pattern.svg"
import { withRouter } from "react-router";
import Axios from 'axios'
import url from '../../base'
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.img(props => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`,
]);

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
])

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`
]);


function TwoColWithButton ({ 

  subheading = "Our Expertise",
  heading = (
    <>
      Designed & Developed by <span tw="text-primary-500">Professionals.</span>
    </>
  ),
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  primaryButtonText = "View Team Members ->",
  primaryButtonUrl = "https://timerse.com",
  imageSrc = TeamIllustrationSrc,
  buttonRounded = true,
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  textOnLeft = true,
  history
}){
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [member,setMember]=useState([])
  const [width,setWidth]=useState(0)
  useEffect(()=>{
    setWidth(window.innerWidth)
    const updateWindowDimensions = () => {
      setWidth(window.innerWidth)
    };
  
    window.addEventListener("resize", updateWindowDimensions);
  
    return () => window.removeEventListener("resize", updateWindowDimensions) 
},[])
  useEffect(()=>{
    //console.log(url)
    Axios.get(`${url}/category/team`).then(res=>{
      var arr=res.data
      console.log(arr)
      if(arr.length){
        arr.sort((a,b)=>{
          return a.order-b.order
        })
      }
      setMember(arr)
    }).catch(err=> console.log(err))
    },[])
    const CardImage =
    styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    width<400&&width>250 && tw`h-40 w-40`,width<280 && tw`h-20 w-20`,width<348 &&width>280 && tw`h-24 w-24`,width<440 && width>348 && tw`w-32 h-32`,width<770&&width>440 && tw`h-48 w-48`,width<880 && width>770 && tw`h-40 w-40`,width<1015 && width>880 && tw`h-48 w-48`,width>1015&&width<1150&& tw`h-56 w-56`,
    width>1150&& tw`h-64 w-64`,tw`bg-cover bg-center rounded sm:rounded-none`,
    tw`hover:opacity-50`
    ])
  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          {
            member?(
              member.map((card,i)=>(
                <CardImage onClick={()=> history.push(`/meetOurTeam`)} style={{borderRadius:"50%",display:"inline-block",margin:"1%",cursor:"pointer"}} imageSrc={card.image} />
              ))
            ):<Image css={imageCss} src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded}/>
          }
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <PrimaryButton buttonRounded={buttonRounded} as="a" style={{cursor:"pointer"}} onClick={()=>history.push('/meetOurTeam')}>
              {primaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};

export default withRouter(TwoColWithButton)

