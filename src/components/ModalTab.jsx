import React from 'react';

const ModalTab = ({ isActive, children }) => {
    return <div style={{ display: isActive ? 'block' : 'none' }}>{children}</div>;
};

export default ModalTab;
