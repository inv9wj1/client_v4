
import React, { useEffect, useState  } from "react";
import videoPlaceHolder from './../../assets/images/video-placeholder.jpg'


import Vid1 from './../../assets/newsVideos/Mainframe_Weekly_newsletter.mp4';
import Vid2 from './../../assets/newsVideos/Mainframe_Weekly_newsletter.mp4';




import {
  Playlist,
  goToNextVideo,
  goToPreviousVideo
} from "reactjs-video-playlist-player";

import './../../css/globals.css'
import './../../css/playlist.css'
import Buttons from './../../components/Buttons/Buttons'

function News() {
  const [videoList, setVideoList] = useState([
    {
      thumbnail: "https://via.placeholder.com/500/FFA500/FFFFFF",
      url: Vid1,
      imgAlt: "Image 1 not found"
    },
    {
      thumbnail: "https://via.placeholder.com/500/FF0000/FFFFFF",
      url: Vid2,
      imgAlt: "Image 2 not found"
    }
    // {
    //   thumbnail: " ",
    //   url: Vid3,
    //   imgAlt: "Image 3 not found"
    // },
    // {
    //   thumbnail: "https://via.placeholder.com/500/FFFF00/000000",
    //   url:
    //     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    //   imgAlt: "Image 4 not found"
    // },
    // {
    //   thumbnail: "",
    //   url:
    //     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    //   imgAlt: "Image 5 not found"
    // }
  ]);

  const [currentVideo, setCurrentVideo] = useState(0);
  const vidRef = React.createRef(null);

  const params = {
    videos: videoList,
    autoPlay: true,
    showQueue: true,
    playForward: true,
    defaultQueueItemPlaceholderThumbnail: videoPlaceHolder,
    currentVideo: currentVideo,
    setCurrentVideo: setCurrentVideo,
    vidRef: vidRef
  };

  return (
    <div className='App'>
      <h3 id='title_news'>
        <span>MBC</span> Live 🎥
      </h3>
      <div>
        <Playlist playlistParams={params} />
        <Buttons
          goToNextVideo={goToNextVideo}
          goToPreviousVideo={goToPreviousVideo}
          params={params}
        />
      </div>
    </div>
  )

}
export default News;


