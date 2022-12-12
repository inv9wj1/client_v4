import React from 'react';
import ReactPlayer from 'react-player';

import Vid1 from './../../assets/newsVideos/1.mp4';
import Vid2 from './../../assets/newsVideos/2.mp4';
import Vid3 from './../../assets/newsVideos/3.mp4';



import "./../../scss/VideoCarousel.css";
import { Carousel } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
 
const News = () => {
  const videoProperties = [
    {
      id: 1,
      title: "Video 1",
      src: Vid1,
      credit: "Video by cottonbro from Pexels",
    },
    {
      id: 2,
      title: "Video 2",
      src: Vid2,
      credit: "Video by cottonbro from Pexels",
    },
    {
      id: 3,
      title: "Video 3",
      src: Vid3,
      credit: "Video by cottonbro from Pexels",
    },
  ];
 
  return (
    <div className="App">
      <Carousel onSlide={setMovieKey(this)}>
        {videoProperties.map((videoObj) => {
          return (
            <Carousel.Item key={videoObj.id}>
              <ReactPlayer
                url={videoObj.src}
                pip={true}
                controls={true}
                playing={false}
              />
              <Carousel.Caption>
                <h3>{videoObj.title}</h3>
                <p>{videoObj.credit}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
 
const setMovieKey = () => {
 const elem = document.getElementsByClassName('carousel-item active')[0];
// const curVideo = elem.getElementsByClassName('carousel-caption')[0];
 // const text=curVideo.getElementsByTagName('h3')[0].textContent;
// console.log("called"+elem.getElementsByClassName('carousel-caption')[0].getElementsByTagName('h3')[0].textContent);
}
export default News;


