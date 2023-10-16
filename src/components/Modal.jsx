import React, { useState, useRef, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent" ref={modalRef}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
