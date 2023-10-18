import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div className={`modalOverlay ${isOpen ? 'active' : ''}`}>
            <div className="modalContent">
                <CloseOutlined className="closeButton" onClick={onClose} />
                {children}
            </div>
        </div>
    );
};

export default Modal;
