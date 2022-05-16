import React from "react";

import { Button } from "@mui/material";
import Modal from "../../components/modal";
import { Recipe } from "../../interfaces/recipe";
import { deleteRecipe } from "../../api/recipe";

interface Props {
  openModal: boolean;
  setOpenModal: Function;
  recipeToDelete: Recipe;
  reRunParentComponent: Function;
}
export default function DeleteRecipe({
  openModal,
  setOpenModal,
  recipeToDelete,
  reRunParentComponent,
}: Props) {
  const handleSubmit = async () => {
    try {
      await deleteRecipe(recipeToDelete.id);
      setOpenModal(false);
      reRunParentComponent();
    } catch (error) {}
  };
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      modalTitle="Delete Recipe"
    >
      <>
        <p>
          Are you sure you want to delete <b>{recipeToDelete.name}</b>{" "}
        </p>
        <Button variant="contained" color="error" onClick={handleSubmit}>
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancel
        </Button>
      </>
    </Modal>
  );
}
