import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { Route, Router } from "react-router";

import Login from "./pages/login";
import Recipe from "./pages/recipe";
import WeeklyMenu from "./pages/weekly_menu";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/weekly-menu" element={<WeeklyMenu />} />
    </Routes>
  );
}

export default App;
