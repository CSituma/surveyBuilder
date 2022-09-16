import { useState, useEffect } from "react";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
  checkIfElementExists,
  createNewStorageItem,
  customAlertTimer,
  deleteOneItem,
  getLocalStorageItem,
  id,
} from "../utils/HelperFunctions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputFormTypes from "../components/Input/InputFormTypes";
///import { useQuestionnairesContextWrapper } from "../context/Questionnaires";

export default function Preview() {
  const [Questionnaires, setQuestionnaires] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  //const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentQuestion = getLocalStorageItem("currentQuestion");
  const [Questionnaire, setQuestionnaire] = useState();

  useEffect(() => {
    const data = getLocalStorageItem("Questionnaires");
    setQuestionnaires(data);
  }, []);

  useEffect(() => {
    const data = Questionnaires?.filter(
      (questions) =>
        questions?.questionnaireName === currentQuestion?.questionnaireName
    );
    setQuestionnaire(data);
  }, [Questionnaires, currentQuestion?.questionnaireName]);

  const questionnaireExists = checkIfElementExists(Questionnaire);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const item = Array.from(Questionnaire);
    const [draggedQuestion] = item.splice(result.source.index, 1);
    item.splice(result.destination.index, 0, draggedQuestion);
    setQuestionnaire(item);

  };

  const editItem = (index, event) => {
    Questionnaire[index][event.target.name] = event.target.value;
    Object.assign(Questionnaire[index],{edit:true});
    createNewStorageItem("currentQuestion", Questionnaire[index]);
    navigate("/createQuestion", { replace: true });
  };

  const deleteItem = (index, e) => {
    Questionnaire[index][e.target.name] = e.target.value;
    const currentQuestionIndex = Questionnaires.map(
      (question) => question.id
    ).indexOf(Questionnaire[index].id);
    deleteOneItem(Questionnaires, currentQuestionIndex);
    deleteOneItem(Questionnaire, index);
    setQuestionnaires(Questionnaires);
    createNewStorageItem("Questionnaires", Questionnaires);
    customAlertTimer(setIsDeleted);
    setQuestionnaire(Questionnaire);
  };

  const deleteQuestionnaire = () => {
    setQuestionnaires([]);
    createNewStorageItem("currentQuestion", []);
  };

  return (
    <div className="row">
      {!currentQuestion ? (
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
                {currentQuestion?.questionnaireName}
              </h3>
              {isDeleted ? (
                <Alert variant="danger"> Question Deleted</Alert>
              ) : (
                ""
              )}
              <p> {currentQuestion?.questionnaireDescription}</p>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId={id}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {questionnaireExists ? (
                      Questionnaire?.map((questionnaire, index) => (
                        <Draggable
                          key={questionnaire?.id}
                          draggableId={questionnaire?.id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="list-group-item"
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <Card className="card col-lg-6 m-2 col-sm-12 p-2 bg-secondary text-white shadow-lg rounded">
                                <div>
                                  <div>
                                    {index + 1}. {questionnaire?.question}
                                  </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                  <InputFormTypes
                                    formType={questionnaire?.answerType}
                                    choices={questionnaire?.multipleChoices}
                                  />{" "}
                                  <div>
                                    <div className=" z-index-9">
                                      <FaPencilAlt
                                        className="m-3"
                                        onClick={(event) =>
                                          editItem(index, event)
                                        }
                                      />
                                      <FaTrashAlt
                                        className="m-3"
                                        onClick={(event) =>
                                          deleteItem(index, event)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </li>
                          )}
                        </Draggable>
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
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="card-body">
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={deleteQuestionnaire}
            >
              Delete Questionnaire
            </button>
            <button type="button" className="btn btn-primary float-end ">
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
