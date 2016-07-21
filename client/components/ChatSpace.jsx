import React from 'react';
import Message from './Message.jsx';

class ChatSpace extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			{ this.props.messages.map((message) => <Message message={ message }} /> )}
		)
	}
}

export default ChatSpace;