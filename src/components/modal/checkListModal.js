import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CheckList from '../checkbox';


function CheckListModal({ setShow, show, question }) {

  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Multiple Choice Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
          <p>Create Multi-Choice Options for {question? question :"your QQuestion"}</p>
            <CheckList handleClose={handleClose}/>
          </ListGroup>
        </Modal.Body>
     
      </Modal>
    </div>
  );
}

export default CheckListModal;