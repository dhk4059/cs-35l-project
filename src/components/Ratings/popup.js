import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Rating from "./rating.js";
function Popup({setReset}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <h4>Add a Review</h4>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Rating closePopUp={handleClose} resetView={setReset}></Rating>

            <br></br>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
