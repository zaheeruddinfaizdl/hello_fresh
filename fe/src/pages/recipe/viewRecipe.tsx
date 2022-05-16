import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Recipe } from "../../interfaces/recipe";

import { GiveRating, ShowRating } from "../../components/rating";
import { getRecipeDetailsById } from "../../api/recipe";
import { addRatingOnRecipe, getRatingForRecipe } from "../../api/rating";
import { RatingWithUserDetailsInterface } from "../../interfaces/rating";
interface Props {
  recipe: Recipe;
}

export default function ViewRecipeDetails() {
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const [ratingOnRecipe, setRatingOnRecipe] = useState<
    Array<RatingWithUserDetailsInterface>
  >([{}] as Array<RatingWithUserDetailsInterface>);

  const submitRating = async () => {
    try {
      const res = await addRatingOnRecipe(recipe.id, {
        rating: rating,
        review: review,
      });
      updateRating();
    } catch (error) {}
  };

  const updateRating = async () => {
    try {
      const ratingOnRecipe = await getRatingForRecipe(String(id));
      setRatingOnRecipe(ratingOnRecipe.data);
    } catch (error) {}
  };

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const recipeResult = await getRecipeDetailsById(String(id));
        setRecipe(recipeResult.data);
        updateRating();
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      <Typography variant="h5">
        Name: <b>{recipe.name}</b>
      </Typography>
      <Typography variant="h5">
        Classification: <b>{recipe.classification}</b>
      </Typography>
      <Typography variant="h5">Ingredients:</Typography>
      {recipe.ingredients !== undefined && (
        <ol>
          {recipe.ingredients.map((ing) => (
            <li>
              <Typography>{ing.name}</Typography>
              <Typography>{ing.quantity}</Typography>
            </li>
          ))}
        </ol>
      )}

      <Typography variant="h5">Instructions</Typography>
      {recipe.instructions !== undefined && (
        <ol>
          {recipe.instructions.map((instruction) => {
            return (
              <li>
                <Typography>{instruction}</Typography>
              </li>
            );
          })}
        </ol>
      )}
      <Typography variant="h5">Nutritions</Typography>
      {recipe.nutirtional_info !== undefined && (
        <ol>
          {recipe.nutirtional_info.map((nutirtions) => {
            return (
              <li>
                <Typography>{nutirtions.name}</Typography>
                <Typography>{nutirtions.amount}</Typography>
              </li>
            );
          })}
        </ol>
      )}

      <GiveRating
        ratingValue={rating}
        setRating={setRating}
        reviewValue={review}
        setReview={setReview}
        submitRating={submitRating}
      />
      <br />
      <Typography variant="h5">
        See what others are saying about {recipe.name}
      </Typography>
      <br />
      {ratingOnRecipe.map((rating) => (
        <ShowRating
          ratingValue={rating.rating}
          reviewValue={rating.review}
          userId={rating.user_id}
        />
      ))}
    </>
  );
}
