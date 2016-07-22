import React from 'react';

/* 
TODO: VIDEO STREAM ARCHITECTURE
	- replace video tag with independant component or maybe pass down video stream as prop?
*/
class Video extends React.Component {
	constructor (props) {
		super(props);	
	}

	componentDidMount() {
    // Begin animating the video when it starts playing
    const video = document.querySelector('video');
    video.addEventListener('canplay', function(e) {
      video.className += ' video-reveal', 800;
      setTimeout(() => video.className = 'video', 2000);
    });
	}

	render() {
		return (
			<div className="video-container">
		    <div className="video-border"></div>
		    <video className="video" controls autoPlay>
		      <source src="" type="video/mp4"></source>
		    </video>
		    <div className="video-border"></div>
		  </div>
		)
	}
}

export default Video;