import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { JWT_FILED_NAME } from "../global";
const pages = [
  { pageTitle: "Weekly Menu", pageLocation: "/weekly-menu" },
  { pageTitle: "Recipe", pageLocation: "/recipe" },
];

const LoggedInUserNavBar = () => {
  const logOutUser = () => {
    localStorage.removeItem(JWT_FILED_NAME);
    history.go(0);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {pages.map((page) => (
            <Button
              key={page.pageTitle}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to={page.pageLocation} style={{ textDecoration: "none" }}>
                {page.pageTitle}
              </Link>
            </Button>
          ))}
          <Button color="inherit" onClick={logOutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default LoggedInUserNavBar;
