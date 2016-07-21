import React from 'react';

/* 
TODO: VIDEO STREAM ARCHITECTURE
	- replace video tag with independant component or maybe pass down video stream as prop?
*/
class Video extends React.Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<div class="video-container">
		    <div class="video-border"></div>
		    <video class="video" controls autoplay>
		      <source src="" type="video/mp4">
		    </video>
		    <div class="video-border"></div>
		  </div>
		)
	}
}

export default Video;