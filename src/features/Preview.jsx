import { useState, useEffect } from "react";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
  addToExistingStoredList,
  checkIfElementExists,
  createNewStorageItem,
  customAlertTimer,
  deleteOneItem,
  getLocalStorageItem,
} from "../utils/HelperFunctions";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputFormTypes from "../components/Input/InputFormTypes";
///import { useQuestionnairesContextWrapper } from "../context/Questionnaires";

export default function PreviewFeature() {
  const [Questionnaires, setQuestionnaires] = useState([]);
  useEffect(() => {
    const data = getLocalStorageItem("Questionnaires");
    setQuestionnaires(data);
  }, []);

  console.log(Questionnaires);
  const [isDeleted, setIsDeleted] = useState(false);
  //const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const editItem = (index, event) => {
    Questionnaires[index][event.target.name] = event.target.value;
    Object.assign(Questionnaires[index], { index: index });
    addToExistingStoredList("currentQuestionnaire", Questionnaires[index]);
    navigate("/createQuestion", { replace: true });
  };

  const deleteItem = (index, e) => {
    Questionnaires[index][e.target.name] = e.target.value;
    deleteOneItem(Questionnaires, index);
    customAlertTimer(setIsDeleted);
    setQuestionnaires(Questionnaires);
    //const newQtnaire = Questionnaire.splice(Questionnaires[index], 0)
    createNewStorageItem("Questionnaires", Questionnaires);
  };
  const currentQuestionnaire = getLocalStorageItem("currentQuestionnaire");

  const Questionnaire = Questionnaires?.filter(
    (questions) =>
      questions?.questionnaireName === currentQuestionnaire?.questionnaireName
  );
  console.log(Questionnaire);

  const questionnaireExists = checkIfElementExists(Questionnaire);

  const deleteQuestionnaire = () => {
    setQuestionnaires([]);
    createNewStorageItem("currentQuestionnaire", []);
    //Todo:Add Index
  };

  return (
    <div className="row">
      {!currentQuestionnaire ? (
        <Alert variant="danger">
          {" "}
          Looks Like you have not Created any Questionnaire Yet Please{" "}
          <a href="/home">Create a Questionnaire to get Started </a>
        </Alert>
      ) : (
        <>
          <div className="card col-12 shadow-lg rounded">
            <div className="card-body">
              <h3 className="card-title text-center text-secondary">
                {" "}
                PREVIEW <FaEye />{" "}
              </h3>

              <h3 className="card-title">
                {" "}
                {currentQuestionnaire?.questionnaireName}
              </h3>
              {isDeleted ? (
                <Alert variant="danger"> Question Deleted</Alert>
              ) : (
                ""
              )}
              <p> {currentQuestionnaire?.questionnaireDescription}</p>
            </div>
            {questionnaireExists ? (
              Questionnaire?.map((questionnaire, index) => (
                <ul className="" key={index}>
                  <li className="list-group-item">
                    <div>
                      <div>
                        {index + 1}. {questionnaire?.question}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <InputFormTypes formType={questionnaire?.answerType} />{" "}
                      <div>
                        <FaPencilAlt
                          className="m-3"
                          onClick={(event) => editItem(index, event)}
                        />
                        <FaTrashAlt
                          className="m-3"
                          onClick={(event) => deleteItem(index, event)}
                        />
                      </div>
                    </div>
                  </li>
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
            <button type="button" className="btn btn-primary float-end">
              <a
                href="/createQuestion"
                className="text-white text-decoration-none"
              >
                Add Questions
              </a>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
