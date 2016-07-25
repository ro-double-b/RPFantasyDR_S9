import React from "react";

import Landing from './Landing';
import Link from './Link';
import Video from "./Video.jsx";
import ChatSpace from "./ChatSpace.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const input = document.querySelector("input");
    input.onchange = function(e) {
      document.getElementById("landing").style.display = "none";
    };
  }

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
