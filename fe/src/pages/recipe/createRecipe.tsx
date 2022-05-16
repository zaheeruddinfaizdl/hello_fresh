import React, { useState } from "react";
import Modal from "../../components/modal";
import { Recipe } from "../../interfaces/recipe";
import RecipeForm from "./form";

import { createRecipe } from "../../api/recipe";
interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  reRunParentComponent: Function;
}
export default function CreateRecipe({
  openModal,
  setOpenModal,
  reRunParentComponent,
}: Props) {
  const handleSubmit = async (recipe: Recipe) => {
    try {
      await createRecipe(recipe);
      reRunParentComponent();
    } catch (e) {}

    setOpenModal(false);
  };
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      modalTitle="Create Recipe"
      openModalButtonTitle="Create Recipe"
      modalActionButtonTitle="Save Recipe"
    >
      <RecipeForm
        handleSubmit={handleSubmit}
        initialRecipeValue={{
          id: "",
          classification: "",
          ingredients: [{ name: "", quantity: "" }],
          instructions: [""],
          name: "",
          nutirtional_info: [{ name: "", amount: "" }],
        }}
        submitButtonText="Save Recipe"
      />
    </Modal>
  );
}
