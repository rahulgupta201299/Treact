import React, { useState,useEffect } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as TwitterIcon} from "images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon} from "images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "images/github-icon.svg";
import { withRouter } from "react-router";
import {SiResearchgate,SiGooglescholar} from 'react-icons/si'
import {AiOutlineYoutube} from 'react-icons/ai'
import Axios from "axios";
import MiniCenteredFooter from "components/footers/MiniCenteredFooter";
import { Link } from "react-router-dom";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
//const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
//const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`
const Card = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900`}
  9
`
const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`


/*const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
*/
function TeamMembers({history,head}){

  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [width,setWidth]=useState(0)
  const [sliderRef, setSliderRef] = useState(null);
  const [TeamMember,setTeamMember]=useState([])
  const [count,setCount]=useState(0)
  const [click,setClick]=useState(false)
  const [read,setRead]=useState(30)
  useEffect(()=>{
      setWidth(window.innerWidth)
      const updateWindowDimensions = () => {
        setWidth(window.innerWidth)
      };
    
      window.addEventListener("resize", updateWindowDimensions);
    
      return () => window.removeEventListener("resize", updateWindowDimensions) 
  },[])

useEffect(()=>{
  Axios.get('https://missionvission.herokuapp.com/category/AllTeamMembers').then(res=>{
    var arr=res.data
    arr.sort((a,b)=>{
      return a.order-b.order
    })
    for(var i=0;i<arr.length;i++){
      if(arr[i].category===head){
        setCount(count+1)
      }
    }
    setTeamMember(arr)
    console.log(arr)
  })
},[])

const sliderSettings = {
  arrows: false,
  slidesToShow: count!==0&&count<3? count:2,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: count!==0&&count<2? count:1,
      }
    },

    {
      breakpoint: 750,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
};

  /* Change this according to your needs */
  const CardImage =
    styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    width<400&&width>250 && tw`h-40 w-40`,width<250&& tw`h-32 w-32`,
    width>400&& tw`h-64 w-64`,tw`sm:h-64 bg-cover bg-center rounded sm:rounded-none`,
    tw`hover:opacity-50`
    ])

    const handleRead=()=>{
      setClick(true)
      setRead(1000)
    }
    const handleUnread=()=>{
      setClick(false)
      setRead(30)
    }
  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>{head}</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}> 
          {
          TeamMember.map((card, index) => (
            (card.category===head)?(
              <Card key={index}>
              <CardImage onClick={()=> history.push(`/team/TeamMember/${card._id}`)} style={{borderRadius:"50%",cursor:"pointer"}} imageSrc={card.image} />
              <CardContent>
                <span className="name">{card.name}</span>
                {
                  card.position?(card.position.length>30?<span style={{width:"200px",position:"relative"}} className="position">{card.position.substring(0,read)}<br/>{click?<button onClick={handleUnread} style={{color:"purple"}}> Read less...</button>:<button onClick={handleRead} style={{color:"purple"}}> Read more...</button>}</span>
                  :<span className="position">{card.position} </span>) : null
                }
                
                <CardLinks>
                {
                    card.GoogleScholar?(<a className="link" href={card.GoogleScholar}>
                    <SiGooglescholar className="icon" /></a>):null
                }
                {
                    card.ResearchGate?(<a className="link" href={card.ResearchGate}>
                    <SiResearchgate className="icon"/></a>):null
                }
                {
                    card.LinkedIn?(<a className="link" href={card.LinkedIn}>
                    <LinkedinIcon className="icon" /></a>):null
                }
                {
                    card.Github?(
                        <a className="link" href={card.Github}>
                    <GithubIcon className="icon" /></a>
                    ):null
                }
                {
                    card.Youtube?(<a className="link" href={card.Youtube}>
                    <AiOutlineYoutube className="icon" /></a>):null
                }
                </CardLinks>
              </CardContent>
            </Card>
            ):null
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};

export default withRouter(TeamMembers)

/*
[
    {
      imageSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80",
      position: "Founder",
      name: "Adam Cuppy",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80",
      position: "Sr. Designer",
      name: "Charlotte Hale",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80",
      position: "Jr. Designer",
      name: "Silvester Wize",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80",
      position: "Lead Developer",
      name: "Himali Turn",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=3.45&w=512&h=512&q=80",
      position: "Sr. Developer",
      name: "Troye Sivan",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: "https://i.ibb.co/BKzrFfD/DSC-0132.jpg",
      position: "Quality Assurance",
      name: "Holo Wo",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
  ]
  */


/*
{cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                  <RatingsInfo>
                    <StarIcon />
                    <Rating>{card.rating}</Rating>
                  </RatingsInfo>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    <Text>{card.pricingText}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>{card.description}</Description>
              </TextInfo>
              <PrimaryButton>Book Now</PrimaryButton>
            </Card>
            */
