import React from "react";

import Video from "./Video.jsx";
import ChatSpace from "./ChatSpace.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
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
