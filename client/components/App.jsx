import React from "react";

import Landing from './Landing';
import Link from './Link';
import Video from "./Video.jsx";
import ChatSpace from "./ChatSpace.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <Landing />
        <Link />
        <div className="wrapper">
          <Video />
          <ChatSpace socket={this.props.socket} />
          <button id="start-stream">Start Stream</button>
        </div>
      </div>
    );
  }
}

export default App;
