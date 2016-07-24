import React from "react";

import Video from "./Video.jsx";
import ChatSpace from "./ChatSpace.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const input = document.querySelector('input')
    input.onchange = function(e) {
      document.getElementById('landing').style.display = 'none';
    }
  }

  render() {
    return (
      <div>
      // landing page
        <div id='landing'>
          <div className='landing-left'>
            <p className='landing-logo'>ReelTime</p>
            <p className='landing-logo small'>Watch tv with your friends in your underwear</p>
          </div>
          <div className='landing-right'>
            <div className='landing-top-right '>
              <input type='file' className='landing-circle' placeholder='drag your files here'></input>
            </div>
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