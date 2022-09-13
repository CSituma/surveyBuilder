import { useState, useEffect } from "react";

import {

    checkIfElementExists,
    createNewStorageItem,

    getLocalStorageItem,
} from "../utils/HelperFunctions";
import { Alert } from "react-bootstrap";

import InputFormTypes from "../components/Input/InputFormTypes";
///import { useQuestionnairesContextWrapper } from "../context/Questionnaires";

export default function QuestionslIst() {

    const [Questionnaires, setQuestionnaires] = useState([]);
    useEffect(() => {
        const data = getLocalStorageItem("Questionnaires");
        setQuestionnaires(data);

    }, [])

    console.log(Questionnaires);
    const [isDeleted] = useState(false);


    const currentQuestionnaire = getLocalStorageItem("currentQuestionnaire");

    const Questionnaire = Questionnaires.filter(questions => new Set(questions.questionnaireName));

    const questionnaireExists = checkIfElementExists(Questionnaire);


    const deleteQuestionnaire = () => {

        setQuestionnaires([]);
        createNewStorageItem("currentQuestionnaire", []);
        //Todo:Add Index
    }


    return (
        <div className="row">

            {!currentQuestionnaire ? <Alert variant="danger">
                {" "}
                Looks Like you have not Created any
                Questionnaire Yet{" "}
                Please <a href="/home">Create a Questionnaire to get Started </a ></Alert>
                :
                <>
                    {Questionnaire.map((questionnaire, index) => (
                        <>
                            <div className="card col-12 shadow-lg rounded">
                                <div className="card-body">


                                    <h3 className="card-title">
                                        {" "}
                                        Questionnaire: {currentQuestionnaire?.questionnaireName}
                                    </h3>
                                    {isDeleted ? <Alert variant="danger"> Question Deleted</Alert> : ""}
                                    <p> {currentQuestionnaire?.questionnaireDescription}</p>
                                </div>
                                {questionnaireExists ? (
                                    Questionnaire?.map((questionnaire, index) => (
                                        <ul className="list-group list-group-flush">
                                            {Questionnaire?.map((list, index) => (
                                                <div key={index}>
                                                    <li className="list-group-item" >
                                                        <div >
                                                            <div>{index + 1}. {list?.question}</div>


                                                        </div>
                                                        <div className="d-flex  justify-content-between">
                                                            <div><InputFormTypes formType={list?.answerType} /> </div>

                                                        </div>
                                                    </li>
                                                </div>
                                            ))}

                                        </ul>
                                    ))
                                ) : (
                                    <>
                                        <Alert variant="danger">
                                            {" "}
                                            Looks Like you have not Created any Questions for this
                                            Questionnaire Yet{" "}
                                        </Alert>
                                    </>
                                )}
                            </div>

                            <div className="card-body">
                                <button
                                    type="button"
                                    className="btn btn-danger float-end"
                                    onClick={deleteQuestionnaire}
                                >
                                    Delete Questionnaire
                                </button>

                            </div>
                        </>
                    ))}
                </>
            }

        </div>
    );
};
// onClick={event => deleteQuestionnaire(index, event)}

