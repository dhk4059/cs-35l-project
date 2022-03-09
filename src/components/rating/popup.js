import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Rating from './rating.js'
function Popup() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add reviews
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <Rating></Rating>



          <right>
            <br></br>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            </right>

       
          
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Popup
