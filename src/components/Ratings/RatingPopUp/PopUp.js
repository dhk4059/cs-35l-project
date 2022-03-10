import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Rating from "./Rating.js";
import { auth } from "../../../util/firebaseConfig.js";

function Popup({ setReset }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={(event) => {
          event.preventDefault();
          handleShow();
        }}
        style={{ visibility: auth.currentUser !== null ? "visible" : "hidden" }}
      >
        <h4>Add a Review</h4>
      </Button>
      {/* popup once add review is clicked */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* popup content with review in the form of star ratings and text */}
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
