import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";

import { Rating, TextField, Stack, Button, Typography } from "@mui/material";
interface BaseRatingProps {
  ratingValue: number;
  reviewValue?: string;
}

interface GiveRatingProps extends BaseRatingProps {
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setReview: React.Dispatch<React.SetStateAction<string>>;
  submitRating: Function;
}

interface ShowRatingProps extends BaseRatingProps {
  userId: string;
}
export function GiveRating({
  ratingValue,
  setRating,
  reviewValue,
  setReview,
  submitRating,
}: GiveRatingProps) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  return (
    <>
      <Typography component="h1">Give Rating</Typography>
      <Stack direction="column" justifyContent="space-between">
        <Rating
          value={ratingValue}
          onChange={(event, newValue) => {
            setShowErrorMessage(false);
            setRating(Number(newValue));
          }}
        />
        <TextField
          label="Write Review (optional)"
          value={reviewValue}
          style={{ width: "50%" }}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></TextField>
        <Button
          style={{ width: "20%" }}
          variant="contained"
          onClick={() => {
            if (ratingValue === 0) {
              return setShowErrorMessage(true);
            }
            submitRating();
          }}
        >
          Submit Rating
        </Button>
        {showErrorMessage === true && (
          <Typography style={{ color: "red" }}>
            Please give your rating by selecting starts
          </Typography>
        )}
      </Stack>
    </>
  );
}

export function ShowRating({
  userId,
  ratingValue,
  reviewValue,
}: ShowRatingProps) {
  return (
    <Stack direction="row">
      <div>
        <AccountCircle />
      </div>
      <div>
        <Typography variant="body1">{userId}</Typography>
        <Rating readOnly value={Number(ratingValue)} />
        <p style={{ maxWidth: "30ch" }}>{reviewValue}</p>
      </div>
    </Stack>
  );
}
