import React from 'react';

const Landing = () => (
  <div id="landing">
    <div className="landing-left">
      <p className="landing-logo">ReelTime</p>
      <p className="landing-logo small">Watch tv with your friends in your underwear</p>
    </div>
    <div className="landing-right">
      <div className="landing-top-right ">
        <input type="file" id="files" className="landing-circle" name="file" />
      </div>
    </div>
  </div>
);

export default Landing;
