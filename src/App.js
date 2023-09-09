import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Table from "./pages/table/table";
import Home from "./pages/home/home";
import TaskForm from "./pages/create-task/create-task";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          
          <Route path="/my-tasks" element={<Table />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/create-task" element={<About />} /> 
          <Route path="/update-task" element={<About />} />  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
