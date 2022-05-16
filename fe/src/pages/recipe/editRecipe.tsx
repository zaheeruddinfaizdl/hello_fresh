import React, { useState } from "react";
import Modal from "../../components/modal";
import { Recipe } from "../../interfaces/recipe";
import RecipeForm from "./form";

import { editRecipe } from "../../api/recipe";
interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  recipeToEdit: Recipe;

  reRunParentComponent: Function;
}
export default function EditRecipe({
  openModal,
  setOpenModal,
  recipeToEdit,
  reRunParentComponent,
}: Props) {
  const handleSubmit = async (recipe: Recipe) => {
    try {
      await editRecipe(recipe);
      reRunParentComponent();
    } catch (e) {}

    setOpenModal(false);
  };
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      modalTitle="Edit Recipe"
      openModalButtonTitle="Create Recipe"
      modalActionButtonTitle="Save Recipe"
    >
      <RecipeForm
        submitButtonText="Edit Recipe"
        handleSubmit={handleSubmit}
        initialRecipeValue={recipeToEdit}
      />
    </Modal>
  );
}
