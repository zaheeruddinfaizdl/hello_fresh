import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

export interface Props extends AlertProps {
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function FloatingMessageAlert({
  severity = "success",
  message,
  setOpen,
  open,
}: Props) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          variant="filled"
          severity={severity}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

