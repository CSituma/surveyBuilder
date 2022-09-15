import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { checkLocalStorageKey, createNewStorageItem } from "../../utils/HelperFunctions";

export default function InputModal(props) {
  const navigate = useNavigate();
  const
    { handleClose,
      show,
      modalTitle,
      modalDescription,
      formInputName,
      formInputType,
      formInputPlaceholder,
      formErrorMessage,
      formInputNameExistsError,
      buttonText } = props;

  const [formData, setFormData] = useState({});
  const [isformError, setisformError] = useState(false);
  const [questionnaireNameExists, setquestionnaireNameExists] = useState(false);

  const handleChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  ////find new value of formInputName i.e- value of userName from formData object
  const loginValue = Object.values(formData).toString();
  const formError = loginValue.length <= 3;


  function submit() {
    if (formInputName === "userName") {

      localStorage.setItem('User', loginValue);
      navigate("./home");


    } if (formInputName === "questionnaireName") {

      createNewStorageItem('currentQuestion', formData);
      return navigate("/createQuestion");
    }
  }

  const checkIfQuestionnaireExists = () => {
    const questionnaireExists = checkLocalStorageKey(`${formData?.questionnaireName}`);
    if (!questionnaireExists) {
      submit();
    }
    if (questionnaireExists) {
      setquestionnaireNameExists(true);

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setisformError(false);
      if (!formError) {
        setisformError(false);
        checkIfQuestionnaireExists();
      }
      setisformError(true);

    } catch (error) {
      console.log(error)
      //TOdo:Better RRor-handling
    }

  }


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {modalDescription}
            <input className="form-control form-control-lg"
              type={formInputType} onChange={handleChange}
              name={formInputName}
              placeholder={formInputPlaceholder}
              id={formInputName}
              required />
            {isformError && !questionnaireNameExists ? <p className="formError">{formErrorMessage} </p> : ''}
            {questionnaireNameExists ? <p className="formError">{formInputNameExistsError} </p> : ''}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit" >
              {buttonText}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}