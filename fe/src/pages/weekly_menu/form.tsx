import React from "react";
import { Formik } from "formik";
import { Recipe } from "../../interfaces/recipe";
import { Button, Chip } from "@mui/material";

interface Props {
  recipiesList: Array<Recipe>;
  handleRemoveRecipe: Function;
  handleSubmit: (r: Recipe[]) => Promise<void>;
  submitButtonText: "Save Weekly Menu" | "Edit Weekly Menu";
}

export default function CreateMenuForm({
  recipiesList,
  handleSubmit,
  handleRemoveRecipe,
  submitButtonText,
}: Props) {
  if (recipiesList === undefined) return <></>;
  return (
    <Formik
      enableReinitialize
      initialValues={recipiesList}
      onSubmit={async (recipiesList) => {
        await handleSubmit(recipiesList);
      }}
    >
      {({ values, handleSubmit }) => (
        <>
          <div>
            {values.map((recipe) => {
              return (
                <Chip
                  key={recipe.id}
                  label={recipe.name}
                  onDelete={() => {
                    handleRemoveRecipe(recipe);
                  }}
                ></Chip>
              );
            })}
          </div>
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {submitButtonText}
          </Button>
        </>
      )}
    </Formik>
  );
}
