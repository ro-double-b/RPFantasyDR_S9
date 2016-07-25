import React from 'react';

const Landing = (props) => (
  <div id="landing">
    <div className="landing-left">
      <p>
        <span className="landing-title">ReelTime</span><br />
        <span className="landing-blank">Watch Video with Friends in your Underwear</span><br />
        <span className="landing-description">DESCRIPTION GOES HERE</span>
      </p>
    </div>
    <div className="landing-right">
      <div className="landing-top-right ">
        <p className="landing-drop-text landing-circle">Drop Files Here</p>
        <input type="file" id="files" className="landing-circle drop-box" name="file" onChange={props.setFile} />
      </div>
    </div>
  </div>
);

Landing.propTypes = {
  setFile: React.PropTypes.func.isRequired,
};

export default Landing;
