import React, { useState } from "react";
import Modal from "../../components/modal";
import { Recipe } from "../../interfaces/recipe";
import CreateMenuForm from "./form";
import { createNewWeeklyMenuAPI } from "../../api/weeklyMenu";

interface Props {
  openModal: boolean;
  setOpenModal: Function;
  inputRecipiesList: Array<Recipe>;
  reRunParentComponent: Function;
}

export default function CreateWeeklyMenu({
  inputRecipiesList,
  openModal,
  setOpenModal,
  reRunParentComponent,
}: Props) {
  const [recipiesList, setRecipiesList] = useState([...inputRecipiesList]);
  const handleRemoveRecipe = (recipeToRemove: Recipe) => {
    const newRecipiesList = recipiesList.filter((recipe) => {
      return recipeToRemove.id != recipe.id;
    });
    setRecipiesList(newRecipiesList);
  };
  const handleSubmit = async (inputRecipies: Recipe[]) => {
    try {
      const recipeIds = inputRecipies.map((recipe) => recipe.id);
      await createNewWeeklyMenuAPI(recipeIds);
      setOpenModal(false);
      reRunParentComponent();
    } catch (error) {
      error.message;
    }
  };
  return (
    <Modal
      openModalButtonTitle="Create New Menu"
      openModal={openModal}
      setOpenModal={setOpenModal}
      modalTitle="Create Weekly Menu"
    >
      <CreateMenuForm
      submitButtonText="Save Weekly Menu"
        handleSubmit={handleSubmit}
        recipiesList={recipiesList}
        handleRemoveRecipe={handleRemoveRecipe}
      />
    </Modal>
  );
}
