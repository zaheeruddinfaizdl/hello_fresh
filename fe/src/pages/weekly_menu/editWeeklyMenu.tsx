import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import { Recipe } from "../../interfaces/recipe";
import CreateMenuForm from "./form";
import { editWeeklyMenuAPI, getWeeklyMenuBuId } from "../../api/weeklyMenu";
import {
  WeeklyMenuWithRecipeDetails,
  WeeklyMenuWithRecipeIds,
} from "../../interfaces/weekly_menu";

interface Props {
  openModal: boolean;
  setOpenModal: Function;
  weeklyMenu: WeeklyMenuWithRecipeIds;
  reRunParentComponent: Function;
}

export default function EditWeeklyMenu({
  weeklyMenu,
  reRunParentComponent,
  openModal,
  setOpenModal
}: Props) {
  const [
    weeklyMenuToEditWithRecipeDetails,
    setWeeklyMenuToEditWithRecipeDetails,
  ] = useState({} as WeeklyMenuWithRecipeDetails);

  const handleRemoveRecipe = (recipeToRemove: Recipe) => {
    const newRecipiesList =
      weeklyMenuToEditWithRecipeDetails.recipies_list.filter((recipe) => {
        return recipeToRemove.id != recipe.id;
      });
    setWeeklyMenuToEditWithRecipeDetails({
      ...weeklyMenuToEditWithRecipeDetails,
      recipies_list: newRecipiesList,
    });
  };

  useEffect(() => {
    (async () => {
      const result = await getWeeklyMenuBuId(String(weeklyMenu.id));
      setWeeklyMenuToEditWithRecipeDetails(result.data);
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const weeklyMenuToEditWithRecipeIds: WeeklyMenuWithRecipeIds = {
        id: weeklyMenuToEditWithRecipeDetails.id,
        recipies_list: weeklyMenuToEditWithRecipeDetails.recipies_list.map(
          (wm) => wm.id
        ),
        week_number: weeklyMenuToEditWithRecipeDetails.week_number,
      };
      await editWeeklyMenuAPI(weeklyMenuToEditWithRecipeIds);
      setOpenModal(false);
      reRunParentComponent();
    } catch (error) {
      error.message;
    }
  };

  return (
    <Modal
      modalTitle="Edit Weekly Menu"
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <CreateMenuForm
        submitButtonText="Edit Weekly Menu"
        handleSubmit={handleSubmit}
        recipiesList={weeklyMenuToEditWithRecipeDetails.recipies_list}
        handleRemoveRecipe={handleRemoveRecipe}
      />
    </Modal>
  );
}
