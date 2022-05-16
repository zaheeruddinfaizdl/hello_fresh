import React from "react";
import { Formik, FieldArray } from "formik";
import { TextField } from "@mui/material";
import { Recipe } from "../../interfaces/recipe";
import { Box } from "@mui/system";
import { Tooltip, IconButton, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Add from "@mui/icons-material/Add";

interface Props {
  initialRecipeValue: Recipe;
  handleSubmit: (r: Recipe) => Promise<void>;
  submitButtonText: "Save Recipe" | "Edit Recipe";
}

export default function RecipeForm({
  initialRecipeValue: recipe,
  handleSubmit,
  submitButtonText,
}: Props) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
    >
      <Formik
        initialValues={recipe}
        onSubmit={async (values, e) => {
          await handleSubmit(values);
          console.log(values);
        }}
      >
        {({ values: recipe, handleChange, setFieldValue, handleSubmit }) => (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="classification"
              label="Classification"
              value={recipe.classification}
              onChange={handleChange}
            />

            <FieldArray
              name="ingredients"
              render={(arrayHelpers) => (
                <>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <TextField
                        label="Ingredient - Name"
                        value={ingredient.name}
                        style={{ marginRight: "15px" }}
                        onChange={(e) => {
                          setFieldValue(
                            `ingredients[${index}].name`,
                            e.target.value
                          );
                        }}
                      ></TextField>
                      <TextField
                        label="Ingredient - Quantity"
                        value={ingredient.quantity}
                        onChange={(e) => {
                          setFieldValue(
                            `ingredients[${index}].quantity`,
                            e.target.value
                          );
                        }}
                      ></TextField>
                      <IconButton
                        disabled={
                          recipe.ingredients.length === 1 ? true : false
                        }
                        onClick={() => {
                          const newValues = recipe.ingredients.splice(index, 1);
                          setFieldValue(`recipe.ingredients`, newValues);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </div>
                  ))}{" "}
                  <Tooltip title="Add More Ingredients">
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => {
                        arrayHelpers.push({ name: "", quantity: "" });
                      }}
                    >
                      Ingredient
                    </Button>
                  </Tooltip>
                </>
              )}
            />

            <FieldArray
              name="instructions"
              render={(instructions) => (
                <>
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index}>
                      <TextField
                        style={{ width: "90%" }}
                        label="Instructions"
                        value={instruction}
                        onChange={(e) => {
                          setFieldValue(
                            `instructions[${index}]`,
                            e.target.value
                          );
                        }}
                      />
                      <IconButton
                        disabled={
                          recipe.instructions.length === 1 ? true : false
                        }
                        onClick={() => {
                          const newValues = recipe.instructions.splice(
                            index,
                            1
                          );
                          setFieldValue(`recipe.instructions`, newValues);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </div>
                  ))}{" "}
                  <Tooltip title="Add More Instructions">
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => {
                        instructions.push("");
                      }}
                    >
                      Instruction
                    </Button>
                  </Tooltip>{" "}
                </>
              )}
            />

            <FieldArray
              name="nutirtional_info"
              render={(n) => (
                <>
                  {recipe.nutirtional_info.map((nutirtional_info, index) => (
                    <div key={index}>
                      <TextField
                        label="Nutrtion - Name"
                        value={nutirtional_info.name}
                        style={{ marginRight: "15px" }}
                        onChange={(e) => {
                          setFieldValue(
                            `nutirtional_info[${index}].name`,
                            e.target.value
                          );
                        }}
                      ></TextField>
                      <TextField
                        label="Nutrtiona - Amount"
                        value={nutirtional_info.amount}
                        onChange={(e) => {
                          setFieldValue(
                            `nutirtional_info[${index}].amount`,
                            e.target.value
                          );
                        }}
                      ></TextField>
                      <IconButton
                        disabled={
                          recipe.nutirtional_info.length === 1 ? true : false
                        }
                        onClick={() => {
                          const newValues = recipe.nutirtional_info.splice(
                            index,
                            1
                          );
                          setFieldValue(`recipe.nutirtional_info`, newValues);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Tooltip title="Add More Nutirtions">
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => {
                        n.push({ name: "", amount: "" });
                      }}
                    >
                      Nutirtion
                    </Button>
                  </Tooltip>
                  <div>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {submitButtonText}
                    </Button>
                  </div>
                </>
              )}
            />
          </>
        )}
      </Formik>
    </Box>
  );
}
