import React from "react";

import Video from "./Video.jsx";
import ChatSpace from "./ChatSpace.jsx";
import Landing from './Landing';

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

        // link page
        <div id="link">
          <div id="link-message">
            YAY
          </div>
        </div>
        <div className="wrapper">
          <Video />
          <ChatSpace socket={this.props.socket} />
          <button id="start-stream">Start Stream</button>
        </div>
      </div>
    )
  }
}

export default App;
