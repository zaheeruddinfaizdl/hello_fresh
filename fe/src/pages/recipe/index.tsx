import * as React from "react";
import { getPaginatedRecipies } from "../../api/recipe";
import { Recipe } from "../../interfaces/recipe";
import { alpha } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import {
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as Plus,
  Edit as EditIcon,
} from "@mui/icons-material";

import CreateRecipeForm from "./createRecipe";
import RoleGuarded from "../../components/roleGuarded";
import ROLES_ALLOWED from "./roles";
import CreateWeeklyMenu from "../weekly_menu/createWeeklyMenu";
import EditRecipe from "./editRecipe";
import DeleteRecipe from "./deleteRecipe";
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "ingredients",
    numeric: true,
    disablePadding: false,
    label: "Ingredients",
  },
  {
    id: "classification",
    numeric: true,
    disablePadding: false,
    label: "Classification",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];
function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  setOpenCreateWeeklyMenuForm: Function;
  readonly selectedRecipes: Array<Recipe>;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, selectedRecipes, setOpenCreateWeeklyMenuForm } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected === 1
            ? `1 recipe selected`
            : `${numSelected} recipies selected`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Recipies
        </Typography>
      )}
      {numSelected > 0 && (
        <>
          <Tooltip title="Create new Menu">
            <Button
              startIcon={<Plus />}
              variant="outlined"
              onClick={() => {
                setOpenCreateWeeklyMenuForm(true);
              }}
            >
              Create New Weekly Menu
            </Button>
          </Tooltip>
          {/* <Tooltip title="Add to existing Menu" style={{ marginLeft: "5px" }}>
            <Button startIcon={<Plus />} variant="outlined">
              to existing Menu
            </Button>
          </Tooltip> */}
        </>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const [reRun, setReRun] = React.useState(true);
  const [selectedRecipies, setSelectedRecipies] = React.useState<Recipe[]>([]);
  const [openCreateRecipeForm, setOpenCreateRecipeForm] = React.useState(false);
  const [openEditRecipeForm, setOpenEditRecipeForm] = React.useState(false);
  const [openDeleteRecipeForm, setOpenDeleteRecipeForm] = React.useState(false);
  const [recipeToEdit, setRecipeToEdit] = React.useState<Recipe>({} as Recipe);
  const [recipeToDelete, setRecipeToDelete] = React.useState<Recipe>(
    {} as Recipe
  );
  const [openCreateWeeklyMenuForm, setOpenCreateWeeklyMenuForm] =
    React.useState(false);

  const [openRecipeDetailsView, setOpenRecipeDetailsView] =
    React.useState(false);
  const [recipeToViewDetails, setRecipetoViewDetails] = React.useState<Recipe>(
    {} as Recipe
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const [recipies, setRecipes] = React.useState<Array<Recipe>>([]);
  const [totalRecipiesCount, setTotalRecipiesCount] = React.useState(0);
  const rowsPerPage = 5;

  const triggerReRun = () => {
    setReRun(!reRun);
  };

  const handleClick = (event: React.MouseEvent<unknown>, recipe: Recipe) => {
    const selectedIndex = selectedRecipies.indexOf(recipe);
    let newSelected: Recipe[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRecipies, recipe);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRecipies.slice(1));
    } else if (selectedIndex === selectedRecipies.length - 1) {
      newSelected = newSelected.concat(selectedRecipies.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRecipies.slice(0, selectedIndex),
        selectedRecipies.slice(selectedIndex + 1)
      );
    }

    setSelectedRecipies(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    const prevPage = currentPage;
    setCurrentPage(newPage);
    if (newPage > prevPage) {
      fetchNextPageOfRecipies();
    }
  };

  const isSelected = (name: Recipe) => selectedRecipies.indexOf(name) !== -1;

  const fetchNextPageOfRecipies = async () => {
    const response = await getPaginatedRecipies(currentPage, 10);
    if (!response.ok) {
      return console.error(response.message);
    }
    const newRecipies = [...recipies, ...response.data.paginated_recipies];
    setTotalRecipiesCount(response.data.total_recipies);
    setRecipes(newRecipies);
  };
  const fetchFirstPageOfRecipies = async () => {
    const response = await getPaginatedRecipies(0, 10);
    if (!response.ok) {
      return console.error(response.message);
    }
    const newRecipies = [...response.data.paginated_recipies];
    setTotalRecipiesCount(response.data.total_recipies);
    setRecipes(newRecipies);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * rowsPerPage - recipies.length)
      : 0;
  const RECIPES_PER_PAGE = 10;
  React.useEffect(() => {
    (async () => {
      fetchFirstPageOfRecipies();
    })();
  }, [reRun]);

  if (openRecipeDetailsView === true) {
    const path = `/recipe/detail/${recipeToViewDetails.id}`;
    return <Navigate to={path}></Navigate>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <RoleGuarded rolesAllowed={ROLES_ALLOWED.CREATE_RECIPE_ROLES}>
          <>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenCreateRecipeForm(true);
              }}
            >
              {"Create Recipe"}
            </Button>
            {openCreateWeeklyMenuForm && (
              <CreateWeeklyMenu
                reRunParentComponent={triggerReRun}
                openModal={openCreateWeeklyMenuForm}
                setOpenModal={setOpenCreateWeeklyMenuForm}
                inputRecipiesList={selectedRecipies}
              />
            )}
            {openCreateRecipeForm && (
              <CreateRecipeForm
                reRunParentComponent={triggerReRun}
                openModal={openCreateRecipeForm}
                setOpenModal={setOpenCreateRecipeForm}
              />
            )}
            {openEditRecipeForm === true && (
              <EditRecipe
                reRunParentComponent={triggerReRun}
                openModal={openEditRecipeForm}
                setOpenModal={setOpenEditRecipeForm}
                recipeToEdit={recipeToEdit}
              />
            )}
            {openDeleteRecipeForm && (
              <DeleteRecipe
                reRunParentComponent={triggerReRun}
                openModal={openDeleteRecipeForm}
                setOpenModal={setOpenDeleteRecipeForm}
                recipeToDelete={recipeToDelete}
              />
            )}
          </>
        </RoleGuarded>
        {recipies.length === 0 && (
          <Typography>
            No Recipies created yet. If you are admin you can create recipies by
            clicking <b>Create Recipe</b> button
          </Typography>
        )}

        <EnhancedTableToolbar
          numSelected={selectedRecipies.length}
          selectedRecipes={selectedRecipies}
          setOpenCreateWeeklyMenuForm={setOpenCreateWeeklyMenuForm}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead />
            <TableBody>
              {recipies
                .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
                )
                .map((recipe, index) => {
                  // console.log(recipe);
                  const isRecipeSelected = isSelected(recipe);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        setOpenRecipeDetailsView(true);
                        setRecipetoViewDetails(recipe);
                      }}
                      role="checkbox"
                      aria-checked={isRecipeSelected}
                      tabIndex={-1}
                      key={recipe.id}
                      selected={isRecipeSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => {
                            console.log("Checkbox clicked");
                            event.stopPropagation();
                            handleClick(event, recipe);
                          }}
                          color="primary"
                          checked={isRecipeSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {recipe.name}
                      </TableCell>
                      <TableCell align="right">
                        {recipe.ingredients[0]?.name}
                      </TableCell>
                      <TableCell align="right">
                        {recipe.classification}
                      </TableCell>
                      <TableCell align="right">
                        <>
                          <Tooltip title="Edit Recipe">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setRecipeToEdit(recipe);
                                setOpenEditRecipeForm(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Recipe">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setRecipeToDelete(recipe);
                                setOpenDeleteRecipeForm(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={totalRecipiesCount}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
