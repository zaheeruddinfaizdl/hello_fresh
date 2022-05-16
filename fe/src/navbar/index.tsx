import React, { useContext } from "react";
import NavBarForLoggedInUser from "./loggedIn";
import NavBarForLoggedOutUser from "./loggedOut";
import UserContext from "../context/user";

function NavBar() {
  const currentUser = useContext(UserContext);

  if (currentUser !== undefined) {
    return <NavBarForLoggedInUser />;
  }
  return <NavBarForLoggedOutUser />;
}

export default NavBar;
