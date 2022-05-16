import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Redirect } from "react-router";
import Login from "./pages/login";
import Recipe from "./pages/recipe";
import ViewRecipeDetails from "./pages/recipe/viewRecipe";
import WeeklyMenu from "./pages/weekly_menu";
import { getCurrentUser } from "./api/auth";
import CustomizedProgressBars from "./components/spinner";
import NavBar from "./navbar";

import UserContext, { sampleUserContext } from "./context/user";
import { UserInterface } from "./interfaces/user";
import { JWT_FILED_NAME } from "./global";

import "./App.css";
import ViewWeeklyMenu from "./pages/weekly_menu/viewWeeklyMenu";

function getJwtFromQueryParams(): string | null {
  const query = new URLSearchParams(window.location.search);
  const jwt = query.get("jwt");
  if (jwt) {
    return jwt;
  }
  return null;
}

function App() {
  const [currentUser, setCurrentUser] =
    useState<UserInterface>(sampleUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const jwtFromQueryParams = getJwtFromQueryParams();

      if (jwtFromQueryParams !== null) {
        localStorage.setItem(JWT_FILED_NAME, jwtFromQueryParams);
      }

      let currentUser: UserInterface | null = {} as UserInterface;
      try {
        currentUser = await getCurrentUser();
      } catch {
        setIsAuthenticated(false);
      }
      if (currentUser !== null) {
        setCurrentUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading == true) {
    return <CustomizedProgressBars />;
  }
  if (isAuthenticated === false) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <UserContext.Provider value={currentUser}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/recipe" element={<Recipe />}></Route>
          <Route
            path="/recipe/detail/:id"
            element={<ViewRecipeDetails />}
          ></Route>
          <Route path="/weekly-menu" element={<WeeklyMenu />}></Route>
          <Route
            path="/weekly-menu/detail/:id"
            element={<ViewWeeklyMenu />}
          ></Route>
          <Route path="*" element={<Navigate to="/recipe" />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
