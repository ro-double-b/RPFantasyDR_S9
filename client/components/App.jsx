import React from "react";
import Video from "./Video.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state({
			messages: [] //needs className (me or other) and message body
		})
	}

	render() {
		return (
			<div>
				<Video />
				<ChatSpace messages=({ this.state.messages })
			</div>
		)
	}
}

export default App;

