import React from 'react';

export default ({ message }) => (
	<li className={ message.className }>{ message.text }</li>
);