import React from 'react';
import ReactPlayer from 'react-player';

import myVideo1 from './../../assets/newsVideos/1.mp4';
import myVideo2 from './../../assets/newsVideos/2.mp4';
import myVideo3 from './../../assets/newsVideos/3.mp4';



function News() {
  return <div>
    <h1>News</h1>
    <p>
{/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
<ReactPlayer url={[myVideo1]} controls="true" />

    </p>
    <p>
{/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
<ReactPlayer url={[myVideo2]} controls="true" />

    </p>    <p>
{/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
<ReactPlayer url={[myVideo3]} controls="true" />

    </p>
  </div>;
}

export default News;


