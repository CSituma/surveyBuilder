
import { Button, Card, Alert, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { useState, useContext } from "react"
import { addToExistingStoredList, createNewStorageItem, customAlertTimer, getCurrentQuestionnaireName } from "../utils/HelperFunctions";
import { FaEyeSlash } from "react-icons/fa";
import CheckListModal from '../components/modal/checkListModal';
import { QuestionnairesContext } from '../context/Questionnaires';


export default function CreateQuestion() {
    const [answerType, setAnswerType] = useState('');
    const [isAnswerchoosen, setIsAnswerchoosen] = useState(false);
    const [formError, setFormError] = useState(false);
    const [isFormSaved, setIsFormSaved] = useState(false);

    const currentQuestionnaire = getCurrentQuestionnaireName();
    const [Questionnaires] = useContext(QuestionnairesContext);

    const [formData, setFormData] = useState({

        questionnaireName: currentQuestionnaire?.questionnaireName,
        question: currentQuestionnaire?.question,
        questionnaireDescription: currentQuestionnaire?.questionnaireDescription

    });
    const { questionnaireName, questionnaireDescription, question } = formData;



    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSelect = (e) => {
        setIsAnswerchoosen(true);
        setAnswerType(e);
    }

    const updateCurrentQuestionnaire = {
        questionnaireDescription, questionnaireName
    }

    const edit = (e) => {
        e.preventDefault();
        Object.assign(formData, { answerType: answerType });
        Questionnaires[currentQuestionnaire.index] = formData;

        createNewStorageItem('Questionnaires', Questionnaires);
        createNewStorageItem('currentQuestionnaire', updateCurrentQuestionnaire);
        customAlertTimer(setIsFormSaved);
    }

    console.log(formData);


    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if (isAnswerchoosen) {
                Object.assign(formData, { answerType: answerType });
                addToExistingStoredList('Questionnaires', formData);
                createNewStorageItem('currentQuestionnaire', updateCurrentQuestionnaire);
                customAlertTimer(setIsFormSaved);
            } else {
                customAlertTimer(setFormError);
            }
        } catch (error) {
            console.log(error)
            // TODO: better error handling
        }
    }



    return (
        <>
            {!currentQuestionnaire ?
                <Alert variant="danger">
                    Oops, Looks like you have no Questionnaire Yet!
                    Please <a href="/home">Create a Questionnaire to get Started </a ></Alert> :

                <Row xs={1} md={2} className="g-4">
                    <Col>
                        <Card className="text-center shadow-lg row bg-white  bg-body rounded ">
                            <Card.Body className="shadow-lg bg-body rounded ">
                                {isFormSaved ? <Alert variant="success"> Question Succesfully Saved </Alert> : ''}
                                <div id="previewBtn" className="sticky-top">
                                    <Button variant="dark" className="float-end"> <a href="/preview" className='text-white text-decoration-none'>Preview <FaEyeSlash />{" "}</a> </Button>
                                </div>
                                <div className="text-secondary">
                                    <textarea type="text"
                                        className="form-control form-control-lg text-center  border-0"
                                        onChange={handleChange}
                                        value={questionnaireName}
                                        name="questionnaireName"
                                        id="questionnaireName"
                                        data-toggle="tooltip"
                                        placeholder='Write Questionnaire Name'
                                        data-placement="top"
                                        title="Edit Questionnaire Name"
                                        aria-label="Questionnaire Name Input"
                                        required></textarea>

                                </div>
                                <div className="text-secondary ">
                                    <textarea type="text"
                                        className="form-control form-control-lg text-center border-top-0"
                                        onChange={handleChange}
                                        value={questionnaireDescription}
                                        name="questionnaireDescription"
                                        placeholder="Write a short Description of Questionnaire"
                                        id="questionnaireDescription"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Write a short Description of Questionnaire"
                                        aria-label="Questionnaire Description Input"
                                        required></textarea>

                                </div>
                                <br />

                                <form onSubmit={handleSubmit} className="border shadow-lg p-5 border-secondary">
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
                                            required />
                                    </div>
                                    <br />
                                    {formError ? <Alert variant="danger">Please Select an answer </Alert> : ''}
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
                                        <Dropdown.Item eventKey="MultipleChoice">Multiple Choice</Dropdown.Item>
                                        <Dropdown.Divider />
                                        {/* <Dropdown.Item eventKey="some link">I don't know what to pick</Dropdown.Item> */}
                                    </DropdownButton>
                                    {formData.answerType === "Multiple Choice" ? <CheckListModal /> : ''}

                                    <div className="card-body">
                                        {!currentQuestionnaire?.index && !currentQuestionnaire?.question ?

                                            <Button className=" form-control form-control-lg bg-black info text-center "
                                                type="submit"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Click to save Question"
                                                aria-label="Save Question Button"> Save </Button>
                                            : (

                                                <Button className=" form-control form-control-lg bg-black info text-center "
                                                    type="button"
                                                    onClick={edit}
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Click to save Question"
                                                    aria-label="Save Question Button"> Edit </Button>

                                            )


                                        }

                                    </div>
                                </form>

                            </Card.Body>

                        </Card>
                    </Col>


                </Row>


            }

        </>
    );
}

