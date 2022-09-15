import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContextWrapper from "./context/UserContext";
import QuestionnaireContextWrapper from "./context/Questionnaire";
import QuestionnairesContextWrapper from "./context/Questionnaires";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(

    <UserContextWrapper>
      <QuestionnaireContextWrapper>
        <QuestionnairesContextWrapper>
          <App />
        </QuestionnairesContextWrapper>
      </QuestionnaireContextWrapper>
    </UserContextWrapper>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
