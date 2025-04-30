import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import { getDoctorBySpeciality, getSpecialities } from "../../util/fetch";
import "./DoctorsList.css";
import { Box, Button, Modal, Paper, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";
import { EMPTY, ERROR } from "../../common/constants";
import { showNotification } from "../../common/notification";

export default function DoctorsList() {
  const [specialities, setSpecialities] = useState([]);
  const [value, setValue] = useState(EMPTY);
  const [doctors, setDoctors] = useState([]);
  const [modal, setModal] = useState(false);
  const [doctor, setDoctor] = useState();
  const [buttonType, setButtonType] = useState(EMPTY);

  useEffect(() => {
    async function fetchSpecialities() {
      try {
        const response = await getSpecialities();
        const doctorsResponse = await getDoctorBySpeciality(EMPTY);
        response.length &&
          setSpecialities(
            response.map((item) => ({ value: item, label: item }))
          );
        doctorsResponse.length && setDoctors(doctorsResponse);
      } catch (e) {
        showNotification(ERROR, "Something went wrong, please try again later");
      }
    }
    fetchSpecialities();
  }, []);

  async function handleOnChange(option) {
    setValue(option);
    try {
      const response = await getDoctorBySpeciality(
        option ? option.value : EMPTY
      );
      setDoctors(response);
    } catch (e) {
      showNotification(ERROR, "Something went wrong, please try again later");
    }
  }

  return (
    <Fragment>
      <div className="doctorFilter">
        <Select
          className="basic-single"
          classNamePrefix="select"
          isClearable={!!value}
          name="speciality"
          options={specialities}
          value={value}
          onChange={handleOnChange}
        />
      </div>
      <div className="doctorListContainer">
        {doctors.map((doctor) => {
          return (
            <Paper elevation={2} className="doctorDetailsPaper" key={doctor.id}>
              <Typography variant="h6">
                Doctor Name : {`${doctor.firstName} ${doctor.lastName}`}
              </Typography>
              <Typography variant="body1" className="specialityText">
                Speciality : {doctor.speciality}
              </Typography>
              <Typography variant="body1" className="doctorRating">
                Rating :
                <Rating
                  name="simple-controlled"
                  value={doctor.rating}
                  readOnly
                />
              </Typography>
              <div className="actionBtnContainer">
                <Button
                  variant="contained"
                  color="primary"
                  className="appointmentBtn"
                  onClick={() => {
                    setDoctor(doctor);
                    setModal(true);
                    setButtonType("appointment");
                  }}
                >
                  BOOK APPOINTMENT
                </Button>
                <Button
                  variant="contained"
                  className="viewDetailsBtn"
                  onClick={() => {
                    setDoctor(doctor);
                    setModal(true);
                    setButtonType("doctor");
                  }}
                >
                  View Details
                </Button>
              </div>
            </Paper>
          );
        })}
      </div>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={
            buttonType === "appointment"
              ? "appointmentBody"
              : "doctorDetailsBody"
          }
        >
          <Typography variant="h5" className="btnStyle">
            {buttonType === "appointment"
              ? "Book an Appointment"
              : "Doctor Details"}
          </Typography>
          {buttonType === "appointment" ? (
            <BookAppointment doctor={doctor} setModal={setModal} />
          ) : (
            <DoctorDetails doctor={doctor} setModal={setModal} />
          )}
        </Box>
      </Modal>
    </Fragment>
  );
}
