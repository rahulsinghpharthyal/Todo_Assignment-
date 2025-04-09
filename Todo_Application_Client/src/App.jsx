import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoDocument from "./components/Home/TodoDocument";
import "react-quill/dist/quill.snow.css";

const App = () => {
  return (
    <div className="relative bg-[#f7f7f7]  text-white h-screen p-2">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="todo/:id" element={<TodoDocument />} />
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
