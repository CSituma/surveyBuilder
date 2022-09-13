
import { useState, createContext } from "react";
export const QuestionnaireContext = createContext([[],() => {}]);


export default function QuestionnaireContextWrapper({ children }) {
  const [questionnaire, setQuestionnaire] = useState();

 
  return (
    <QuestionnaireContext.Provider value={[questionnaire, setQuestionnaire]}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

