import React, { useState, useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message.length > 0) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        if (onClose) {
          onClose();
        }
      }, 2000);
    }
  }, [message]);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
          <button
            className="ml-2 text-gray-400 hover:text-gray-300"
            onClick={handleClose}
          >&#10005;</button>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Toast;
