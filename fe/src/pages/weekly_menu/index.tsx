import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { WeeklyMenuWithRecipeIds } from "../../interfaces/weekly_menu";
import { getPaginatedWeeklyMenus } from "../../api/weeklyMenu";
import { Typography } from "@mui/material";
import EditWeeklyMenu from "./editWeeklyMenu";
import RoleGuarded from "../../components/roleGuarded";
import { EDIT_WEEKLY_MENU_ROLES } from "./roles";

function WeeklyMenu() {
  const [weeklyMenuWithRecipeIds, setWeeklyMenuWithRecipeIds] = useState<
    Array<WeeklyMenuWithRecipeIds>
  >([]);
  const [weeklyMenuIdSelected, setWeeklyMenuIdSelected] = useState("");
  const [openEditWeeklyMenuForm, setOpenEditWeeklyForm] = useState(false);
  const [reRun, setReRun] = useState(false);
  const [weeklyMenuToEdit, setWeeklyMenuToEdit] = useState(
    {} as WeeklyMenuWithRecipeIds
  );
  const triggerReRun = () => {
    setReRun(!reRun);
  };

  useEffect(() => {
    (async () => {
      try {
        const weeklyMenuWithRecipeIds = await getPaginatedWeeklyMenus(1, 52);
        setWeeklyMenuWithRecipeIds(weeklyMenuWithRecipeIds.data);
      } catch {}
    })();
  }, [reRun]);

  if (weeklyMenuIdSelected !== "") {
    return <Navigate to={`/weekly-menu/detail/${weeklyMenuIdSelected}`} />;
  }

  if (weeklyMenuWithRecipeIds.length === 0) {
    return (
      <Typography>
        No Weekly Menus Created yet. If you are admin you can create by going to{" "}
        <Link to="/recipies">/recipies</Link> page
      </Typography>
    );
  }

  return (
    <>
      {openEditWeeklyMenuForm === true && (
        <EditWeeklyMenu
          openModal={openEditWeeklyMenuForm}
          setOpenModal={setOpenEditWeeklyForm}
          reRunParentComponent={triggerReRun}
          weeklyMenu={weeklyMenuToEdit}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Week Number</TableCell>
              <TableCell align="right">Recipies</TableCell>
              <RoleGuarded rolesAllowed={EDIT_WEEKLY_MENU_ROLES}>
                <TableCell align="right">Action</TableCell>
              </RoleGuarded>
            </TableRow>
          </TableHead>
          <TableBody>
            {weeklyMenuWithRecipeIds.map((weeklyMenu) => {
              const recipiesListLength = weeklyMenu.recipies_list.length;
              return (
                <TableRow
                  hover
                  key={weeklyMenu.id}
                  onClick={() => {
                    console.log("clicking weekly menu row");
                    setWeeklyMenuIdSelected(weeklyMenu.id);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {weeklyMenu.week_number}
                  </TableCell>
                  <TableCell align="right">
                    {recipiesListLength === 1
                      ? "1 Recipe"
                      : `${recipiesListLength} Recipies`}
                  </TableCell>
                  <RoleGuarded rolesAllowed={EDIT_WEEKLY_MENU_ROLES}>
                    <TableCell align="right">
                      <Tooltip title="Edit Menu">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setWeeklyMenuToEdit(weeklyMenu);
                            setOpenEditWeeklyForm(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </RoleGuarded>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default WeeklyMenu;
