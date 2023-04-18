// Card.js

import React from 'react';
import './card.css';

function Card(props) {
  return (
    <div className="Card" onClick={props.onClick}>
      <img src={props.icon} className="Card-icon" alt="Icon" />
      <h2 className="Card-title">{props.title}</h2>
      <p className="Card-text">{props.text}</p>
    </div>
  );
}

export default Card;
