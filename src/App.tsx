import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavbarComponent from "./components/navbar/Index";

import Sidebar from "./components/navbar/sidebar";
import CreateQuestion from "./pages/CreateQuestion";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import QuestionsListHolder from "./pages/QuestionsListHolder";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Sidebar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/createQuestion" element={<CreateQuestion />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/myquestionnaires" element={<QuestionsListHolder />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
