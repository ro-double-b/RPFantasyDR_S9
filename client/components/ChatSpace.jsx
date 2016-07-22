import React from 'react';
import Message from './Message.jsx';

class ChatSpace extends React.Component {
	constructor(props) {
		super(props);
		var socket = io();

		this.state = {
			message: "",
			messages: [
			{className: "other", text:"Oh my god I love this part!"},
			{className: "me", text:"HAHAHA"}
			],
			socket: socket
		};

		// this.setState({
		// 	socket: socket
		// })
    // grab form submission data and emit message to server.
    // also post locally, and use broadcast tag so you don't pick up your own message

    socket.on('chat message', function(msg) {
      console.log('Recieved message from server: ', msg);
      // this.state.messages.push({className:"other", text: msg});
      this.setState({
      	messages: this.state.messages.concat({className:"other", text: msg})
      })
    }.bind(this));
		// { this.props.messages.map((message) => 
		// 						<Message message={ message }} /> 
		// 					)
		// 				}
	}

	// componentdid mount
	// socket instantiated here
	// listener to get messages incoming

	handleChange (event) {
		console.log(event.target.value);
		this.setState({
			message: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		event.stopPropagation();

		console.log(this.state.message);
		this.state.socket.emit('chat message', this.state.message);		
		this.setState({
			messages: this.state.messages.concat({className:"me", text: this.state.message}),
			message: ''
		});
	}

	// componentDidMount() {
	// 	var socket = io();

	// 	this.setState({
	// 		socket: socket
	// 	})
 //    // grab form submission data and emit message to server.
 //    // also post locally, and use broadcast tag so you don't pick up your own message

 //    socket.on('chat message', function(msg) {
 //      console.log('Recieved message from server: ', msg);
 //      this.state.messages.push({className:"other", text: msg})
 //    }.bind(this));
	// }

	render() {
		return (
			<div className="chat-space">
		    <div className="chat-container">
		      <ul>
		        {this.state.messages.map((message) => <Message message={ message } /> )}
		      </ul>
		    </div>
		    <form onSubmit={ this.handleSubmit.bind(this) }>
		      <input type="text" id="m" value={ this.state.message } autoComplete="off" onChange= { this.handleChange.bind(this) } placeholder="Send a message..." />
		      <input type="submit" value="Submit" />
		    </form>
		  </div>
		);
	}
}

export default ChatSpace;