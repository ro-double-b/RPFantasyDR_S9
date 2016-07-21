import React from 'react';
import Message from './Message.jsx';

class ChatSpace extends React.Component {
	constructor(props) {
		super(props);

		// { this.props.messages.map((message) => 
		// 						<Message message={ message }} /> 
		// 					)
		// 				}
	}



	render() {
		return (
			<div className="chat-space">
		    <div className="chat-container">
		      <ul>
		        <li className="other">Oh my god I love this part!</li>
		        <li className="me">HAHAHA</li>
		        <li className="me">He's the best</li>
		        <li className="other">Wait, gonna get some food</li>
		        <li className="other">Pause for a sec</li>
		        <li className="me">K</li>
		      </ul>
		    </div>
		    <form action="">
		      <input id="m" autoComplete="off" /><button>Send</button>
		    </form>
		  </div>
		);
	}
}

export default ChatSpace;