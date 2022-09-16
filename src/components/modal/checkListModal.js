import {useState} from "react"
import { ListGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import CheckList from '../checkbox';


function CheckListModal({  question, multipleChoices, setMultipleChoices }) {
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);


  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal
        onShow={handleShow}
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
            <p>Create Multi-Choice Options for {question ? question : "your QQuestion"}</p>
            <CheckList handleClose={handleClose}
              multipleChoices={multipleChoices}
              setMultipleChoices={setMultipleChoices} />
          </ListGroup>
        </Modal.Body>

      </Modal>
    </div>
  );
}

export default CheckListModal;