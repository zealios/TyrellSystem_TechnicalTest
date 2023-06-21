import React from 'react';

const Card = ({ text }) => {
  return (
    <div className="m-1 border border-solid border-black rounded-lg flex justify-center items-center" style={{ width: '50px', height: '75px' }}>
      <span>{text}</span>
    </div>
  );
};

export default Card;
