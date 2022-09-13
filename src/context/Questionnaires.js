
import { useState, createContext, useEffect, useContext } from "react";
import { getLocalStorageItem } from "../utils/HelperFunctions";

export const QuestionnairesContext = createContext([[], () => { }]);


export default function QuestionnairesContextWrapper({ children }) {
  const [Questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    const data = getLocalStorageItem("Questionnaires");
    setQuestionnaires(data);
  
  }, [])
  return (
    <QuestionnairesContext.Provider value={[Questionnaires, setQuestionnaires]}>
      {children}
    </QuestionnairesContext.Provider>
  );
}
export function useQuestionnairesContextWrapper() {
  const QuestionnairesList = useContext(QuestionnairesContext);
  return QuestionnairesList;
}
