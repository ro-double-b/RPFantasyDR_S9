import React from 'react';

const Link = (props) => (
  <div id="link">
    <div id="link-message">
      Send your friend the following link: http://localhost:3000/?id={props.myId}
    </div>
  </div>
);

Link.propTypes = {
  myId: React.PropTypes.string,
};

export default Link;
