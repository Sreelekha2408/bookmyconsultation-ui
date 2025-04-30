import {
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Fragment, useState } from "react";
import { postRequest } from "../../util/fetch";
import { url } from "../../util/apiConfig";
import { EMPTY, ERROR, SUCCESS } from "../../common/constants";
import { showNotification } from "../../common/notification";

export default function RateAppointment({ appointmentDetails, setOpenModal }) {
  const [comments, setComments] = useState(EMPTY);
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
    try {
      const response = await postRequest(url.rating, payload);
      if (response.ok) {
        const data = await response.text();
        if (data === SUCCESS) {
          showNotification(SUCCESS, "Rating submitted Successful!!");
        }
        setOpenModal(false);
      }
    } catch (e) {
      showNotification(ERROR, "Something went wrong, please try again later");
    }
  };
  return (
    <Fragment>
      <form className="form" onSubmit={handleOnSubmit}>
        <TextField
          label="Comments"
          multiline
          minRows={3}
          name="default"
          variant="standard"
          onChange={(e) => setComments(e.target.value)}
        />
        <Typography variant="body1" className="ratingText">
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
