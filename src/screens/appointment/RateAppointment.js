import {
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Fragment, useState } from "react";
import { postRequest } from "../../util/fetch";
import { toast } from "react-toastify";

export default function RateAppointment({ appointmentDetails, setOpenModal }) {
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState();
  const [ratingError, setRatingError] = useState(false);
  const { appointmentId, doctorId } = appointmentDetails;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setRatingError(true);
      return;
    }
    const payload = {
      appointmentId: appointmentId,
      doctorId: doctorId,
      rating: rating,
      comments: comments,
    };
    const response = await postRequest(
      "http://localhost:8080/ratings",
      payload
    );
    if (response.ok) {
      const data = await response.text();
      if (data === "success") {
        toast.success("Rating submitted Successful", {
          autoClose: 3000,
          progress: 0.3,
          hideProgressBar: true,
          icon: true,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      setOpenModal(false);
    }
  };
  return (
    <Fragment>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "40%",
          padding: 16,
        }}
        onSubmit={handleOnSubmit}
      >
        <TextField
          label="Comments"
          multiline
          minRows={3}
          name="default"
          variant="standard"
          onChange={(e) => setComments(e.target.value)}
        />
        <Typography
          variant="body1"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Rating:
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
              setRatingError(false);
            }}
          />
        </Typography>
        {ratingError && <FormHelperText error>Select a rating</FormHelperText>}
        <Button variant="contained" color="primary" type="submit">
          RATE APPOINTMENT
        </Button>
      </form>
    </Fragment>
  );
}
