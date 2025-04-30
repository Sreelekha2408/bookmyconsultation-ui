import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import "./DoctorsList.css";

export default function DoctorDetails({ doctor, setModal }) {
  const {
    firstName,
    lastName,
    highestQualification,
    totalYearsOfExp,
    emailId,
    dob,
    rating,
    speciality,
    address,
    mobile,
  } = doctor;

  return (
    <div className="doctorInfo">
      <Typography variant="body1">
        Doctor’s name : {`${firstName} ${lastName} ${highestQualification}`}
      </Typography>
      <Typography variant="body1">
        Total Experience : {totalYearsOfExp}
      </Typography>
      <Typography variant="body1">Speciality : {speciality}</Typography>
      <Typography variant="body1">
        Date of Birth : {moment(dob).format("DD/MM/YYYY")}
      </Typography>
      <Typography variant="body1">City : {address.city}</Typography>
      <Typography variant="body1">Email : {emailId}</Typography>
      <Typography variant="body1">Mobile : {mobile}</Typography>
      <Typography variant="body1" className="doctorRating">
        Rating :
        <Rating name="simple-controlled" value={rating} readOnly />
      </Typography>
    </div>
  );
}
