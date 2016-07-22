import React from "react";

import Video from "./Video.jsx";
import ChatSpace from "./ChatSpace.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
    const chatSpace = document.querySelector('.chat-space');

    // Show the chat area for a few seconds to let the user know about it, then fade away
    setTimeout(() => {
      chatSpace.style.width = '0px';

      document.addEventListener('mousemove', function(e) {
        if (e.pageX >= window.innerWidth - 300) {
          chatSpace.style.width = '300px';
        } else {
          chatSpace.style.width = '0px';
        }
      });
    }, 3000);

    // Begin animating the video when it starts playing
    const video = document.querySelector('video');
    video.addEventListener('canplay', function(e) {
      video.className += ' video-reveal', 800;
      setTimeout(() => video.className = 'video', 2000);
    });
	}

	render() {
		return (
			<div className="wrapper">
				<Video />
				<ChatSpace socket={this.props.socket} />
			</div>
		)
	}
}


export default App;
