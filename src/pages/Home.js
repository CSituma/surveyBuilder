import { Button } from "react-bootstrap";
import { useState } from "react"
import ModalComponent from "../components/modal/InputModal";
import { useUserContextWrapper } from "../context/UserContext";

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useUserContextWrapper();

  return (
    <div className="home">
      <p className="text-center p-5">Welcome, {user}🤗</p>
      <div className="d-grid gap-2 p-5">
        <Button
          className="p-3 shadow-lg mb-5 rounded"
          data-toggle="tooltip"
          data-placement="top"
          title="Create a List of Questions"
          variant="dark"
          size="lg"
          name="createQuestionnaireBtn"
          id="createQuestionnaireBtn"
          aria-label="create Questionnaire Button"
          onClick={handleShow}
        >
          Create Questionnaire
        </Button>
        {/* Custom Modal Component re-used across the app */}
        <ModalComponent
          handleClose={handleClose}
          show={show}
          modalTitle="Name the Questionnaire"
          modalDescription=" Please give a name to the list of Questions you are about to create"
          formInputName="questionnaireName"
          formInputType="text"
          formInputPlaceholder="e.g-Luanda farmers October Survey"
          formErrorMessage="Your Questionnaire's name should be more than 3 letters"
          formInputNameExistsError="This Questionnaire Name already Exists,Choose another name "
          buttonText="Next"
        />

        <Button
          className="p-3 shadow-lg mb-5 rounded"
          data-toggle="tooltip"
          data-placement="top"
          title="View Questions you have Created"
          background="info"
          size="lg"
          name="viewQuestionnaireBtn"
          id="viewQuestionnaireBtn"
          aria-label="View Questionnaire Button"
        >
         <a href="/myquestionnaires" className="text-white texxt-decoration-none">View my Questionnaires</a>
        </Button>
      </div>
    </div>
  );
};

export default Home;
