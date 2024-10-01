import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] h-[70%] relative overflow-auto">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          X
        </button>
        <div className="h-full">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
