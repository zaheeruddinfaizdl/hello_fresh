import React, { useEffect, useState } from "react";
import { Typography, Chip } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { WeeklyMenuWithRecipeDetails } from "../../interfaces/weekly_menu";
import {
  addRatingOnWeeklyMenu,
  getRatingForWeeklyMenu,
} from "../../api/rating";
import { getWeeklyMenuBuId } from "../../api/weeklyMenu";
import { GiveRating, ShowRating } from "../../components/rating";
import { RatingWithUserDetailsInterface } from "../../interfaces/rating";
import FloatingMessageAlert from "../../components/floatingMsg";

export default function ViewWeeklyMenu() {
  const { id } = useParams();

  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenuWithRecipeDetails>(
    {} as WeeklyMenuWithRecipeDetails
  );
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showFloatingMessage, setShowFloatingMessage] = useState(false);
  const [floatingMessageText, setFloatingMessageText] = useState("");
  const [floatingMessageSeverity, setFloatingMessageSeverity] = useState<
    "error" | "success"
  >("success");

  const [ratingOnWeeklyMenu, setRatingOnWeeklyMenu] = useState<
    Array<RatingWithUserDetailsInterface>
  >([{}] as Array<RatingWithUserDetailsInterface>);

  const submitRating = async () => {
    try {
      const res = await addRatingOnWeeklyMenu(weeklyMenu.id, {
        rating: rating,
        review: review,
      });
      updateRatingInComponent();
      setFloatingMessageText("Rating added successfully");
      setFloatingMessageSeverity("success");
      setShowFloatingMessage(true);
    } catch (error) {}
  };

  const updateRatingInComponent = async () => {
    try {
      const ratingResult = await getRatingForWeeklyMenu(String(id));
      setRatingOnWeeklyMenu(ratingResult.data);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await getWeeklyMenuBuId(String(id));
        setWeeklyMenu(result.data);
        updateRatingInComponent();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <FloatingMessageAlert
        open={showFloatingMessage}
        setOpen={setShowFloatingMessage}
        severity={floatingMessageSeverity}
        message={floatingMessageText}
      />

      {weeklyMenu.week_number !== undefined && (
        <Typography variant="h5">
          Week Number {weeklyMenu.week_number}
        </Typography>
      )}
      {weeklyMenu.recipies_list !== undefined && (
        <>
          <Typography variant="h5">Recipes:</Typography>
          <ol>
            {weeklyMenu.recipies_list.map((recipe) => (
              <li>
                <Link to={`/recipe/detail/${recipe.id}`}>{recipe.name}</Link>
              </li>
            ))}
          </ol>
        </>
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
        See what others are saying about this menu
      </Typography>
      <br />
      {ratingOnWeeklyMenu.map((rating) => (
        <ShowRating
          ratingValue={rating.rating}
          reviewValue={rating.review}
          userId={rating.user_id}
        />
      ))}
    </>
  );
}
