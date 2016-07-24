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
        <input type="file" id="files" name="file" />
        <button id="start-stream">Start Stream</button>
      </div>
    )
  }
}


export default App;
