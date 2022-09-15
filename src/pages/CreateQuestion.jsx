import {
  Button,
  Card,
  Alert,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  addToExistingStoredList,
  checkIfElementExists,
  createNewStorageItem,
  customAlertTimer,
  getcurrentQuestionName,
  getLocalStorageItem,
  id,
} from "../utils/HelperFunctions";
import { FaEyeSlash } from "react-icons/fa";
import CheckListModal from "../components/modal/checkListModal";
import { useNavigate } from "react-router-dom";
export default function CreateQuestion() {
  const [answerType, setAnswerType] = useState("");
  const [formError, setFormError] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const currentQuestion = getcurrentQuestionName();
  const [Questionnaires, setQuestionnaires] = useState([]);
  const [multipleChoices, setMultipleChoices] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    
    {
    id:id,
    questionnaireName: currentQuestion?.questionnaireName,
    question: currentQuestion?.question,
    questionnaireDescription: currentQuestion?.questionnaireDescription,
  }
  
  );
  const { questionnaireName, questionnaireDescription, question } = formData;
  
  useEffect(() => {
    const data = getLocalStorageItem("Questionnaires");
    setQuestionnaires(data);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelect = (e) => {
    setAnswerType(e);
  };

 
  const updatecurrentQuestion = {
    questionnaireDescription,
    questionnaireName,
    answerType,
    multipleChoices,
    question
  };



  const edit = (e) => {
    Object.assign(formData, { answerType: answerType },{multipleChoices});
    Questionnaires[currentQuestion.indexValue] = formData;
    createNewStorageItem("Questionnaires", Questionnaires);
    createNewStorageItem("currentQuestion", updatecurrentQuestion);
    customAlertTimer(setIsFormSaved);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (checkIfElementExists(answerType)) {
      edit();
      setFormData({ question: "", answerType: "" });
    } else {
      customAlertTimer(setFormError);
    }
  };

  const submit = () => {
    Object.assign(formData, { answerType: answerType },{multipleChoices});
    addToExistingStoredList("Questionnaires", formData);
    createNewStorageItem("currentQuestion", updatecurrentQuestion);
    customAlertTimer(setIsFormSaved);
    navigate("/preview");
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (checkIfElementExists(answerType)) {
        submit();
        setFormData({ question: "", answerType: "" });
      } else {
        customAlertTimer(setFormError);
      }
    } catch (error) {
      console.log(error);
      // TODO: better error handling
    }
  };

  return (
    <>
      {!currentQuestion ? (
        <Alert variant="danger">
          Oops, Looks like you have no Questionnaire Yet! Please{" "}
          <a href="/home">Create a Questionnaire to get Started </a>
        </Alert>
      ) : (
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card className="text-center shadow-lg row bg-white  bg-body rounded ">
              <Card.Body className="shadow-lg bg-body rounded ">
                {isFormSaved ? (
                  <Alert variant="success"> Question Succesfully Saved </Alert>
                ) : (
                  ""
                )}
                <div id="previewBtn" className="sticky-top">
                  <Button variant="dark" className="float-end">
                    {" "}
                    <a
                      href="/preview"
                      className="text-white text-decoration-none"
                    >
                      Preview <FaEyeSlash />{" "}
                    </a>{" "}
                  </Button>
                </div>
                <div className="text-secondary">
                  <textarea
                    type="text"
                    className="form-control form-control-lg text-center  border-0"
                    onChange={handleChange}
                    value={questionnaireName}
                    name="questionnaireName"
                    id="questionnaireName"
                    data-toggle="tooltip"
                    placeholder="Questionnaire Name"
                    data-placement="top"
                    title="Edit Questionnaire Name"
                    aria-label="Questionnaire Name Input"
                    required
                  ></textarea>
                </div>
                <div className="text-secondary ">
                  <textarea
                    type="text"
                    className="form-control form-control-lg text-center border-top-0"
                    onChange={handleChange}
                    value={questionnaireDescription}
                    name="questionnaireDescription"
                    placeholder="Write  short Description of Questionnaire"
                    id="questionnaireDescription"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Write  short Description of Questionnaire"
                    aria-label="Questionnaire Description Input"
                    required
                  ></textarea>
                </div>
                <br />

                <form
                  onSubmit={handleSubmit}
                  className="border shadow-lg p-5 border-secondary"
                >
                  <div className="col-12">
                    <textarea
                      className="form-control form-control-lg text-center"
                      type="text"
                      onChange={handleChange}
                      name="question"
                      id="question"
                      value={question}
                      placeholder="Question"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Create a Question"
                      aria-label="Question Input "
                      required
                    />
                  </div>
                  <br />
                  {formError ? (
                    <Alert variant="danger">Please Select an answer </Alert>
                  ) : (
                    ""
                  )}

                  <div className="d-flex text-center">
                    <Card.Title>ANSWER:</Card.Title>

                    <DropdownButton
                      title={answerType}
                      variant="dark"
                      id="dropdown-menu-align-right"
                      required
                      aria-label="Select Answer Type "
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="Text">Text</Dropdown.Item>
                      <Dropdown.Item eventKey="Number">Number</Dropdown.Item>
                      <Dropdown.Item eventKey="Yes/No">Yes/No </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="MultipleChoice"
                        onClick={handleShow}
                      >
                        Multiple Choice
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      {/* <Dropdown.Item eventKey="some link">I don't know what to pick</Dropdown.Item> */}
                    </DropdownButton>
                  </div>

                  <div className="card-body">
                    {!currentQuestion?.indexValue ? (
                      <Button
                        className=" form-control form-control-lg bg-black info text-white text-center "
                        type="submit"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Click to save Question"
                        aria-label="Save Question Button"
                      >
                        {" "}
                        Save{" "}
                      </Button>
                    ) : (
                      <Button
                        className=" form-control form-control-lg bg-black text-white info text-center "
                        type="button"
                        onClick={handleEdit}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Click to save Question"
                        aria-label="Save Question Button"
                      >
                        {" "}
                        Edit{" "}
                      </Button>
                    )}
                  </div>
                </form>
              </Card.Body>
              {answerType === "MultipleChoice" ? (
                <CheckListModal
                  handleShow={handleShow}
                  setShow={setShow}
                  show={show}
                  multipleChoices={multipleChoices}
                  setMultipleChoices={setMultipleChoices}
                  question={question}
                />
              ) : (
                ""
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
