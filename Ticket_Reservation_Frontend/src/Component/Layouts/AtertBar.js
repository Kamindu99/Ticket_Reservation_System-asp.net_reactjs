import React, { useState, useEffect } from 'react';
import './AlertBox.css';

const Alert = ({ role, message, onRedirect, clearAlert }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (role == 'success') {
                window.location.replace(onRedirect);
            }
            clearAlert();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return visible ? (
        <div className="baratert">
            <div className="alert" style={{ backgroundColor: `${role == 'error' ? "#ba1515" : '#15ba6a'}` }}>
                {message}
            </div>
        </div>
    ) : null;
};

export default Alert;
