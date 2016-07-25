import React from 'react';

const Message = (props) => (
  <li className={props.message.className}>{props.message.text}</li>
);

Message.propTypes = {
  message: React.PropTypes.object.isRequired,
};

export default Message;
