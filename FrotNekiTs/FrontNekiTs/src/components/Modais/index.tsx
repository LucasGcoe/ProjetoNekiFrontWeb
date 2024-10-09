import React from 'react';
import { Modal, Button } from 'react-bootstrap';


interface CustomModalProps {
  show: boolean;
  onHide: () => void;
  bodyText: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ show, onHide, bodyText }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;