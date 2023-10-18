import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MessageDialog = (props) => {
    const [display, setdisplay] = useState(false);

    useEffect(() => {
        setdisplay(props.show);
    }, [props.show]);

    const handleClose = () => {
        setdisplay(false);
        props.setMessageData();
        if (props.callback) {
            if (props.callback == 'reload') {
                window.location.reload();
            } else {
                window.location.replace(props.callback);
            }
        }
    }

    return (
        <>
            <Modal show={display} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MessageDialog;
