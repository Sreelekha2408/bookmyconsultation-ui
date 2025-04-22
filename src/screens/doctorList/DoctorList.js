import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import { getDoctorBySpeciality, getSpecialities } from "../../util/fetch";
import "./doctorsList.css";
import { Box, Button, Modal, Paper, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";

export default function DoctorsList() {
  const [specialities, setSpecialities] = useState([]);
  const [value, setValue] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [modal, setModal] = useState(false);
  const [doctor, setDoctor] = useState();
  const [buttonType, setButtonType] = useState("");

  useEffect(() => {
    async function fetchSpecialities() {
      const response = await getSpecialities();
      const doctorsResponse = await getDoctorBySpeciality("");
      response.length &&
        setSpecialities(response.map((item) => ({ value: item, label: item })));
      doctorsResponse.length && setDoctors(doctorsResponse);
    }
    fetchSpecialities();
  }, []);

  async function handleOnChange(option) {
    setValue(option);
    const response = await getDoctorBySpeciality(option ? option.value : "");
    setDoctors(response);
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: buttonType === "appointment" ? "40%" : "20%",
    bgcolor: "background.paper",
    boxShadow: "2px 2px 2px 1px rgb(0 0 0 / 20%)",
    borderRadius: "5px",
  };

  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "24px",
          alignItems: "center",
        }}
      >
        {doctors.map((doctor) => {
          return (
            <Paper
              elevation={2}
              style={{
                height: "auto",
                width: "40%",
                // backgroundColor: "yellow",
                padding: 16,
                display: "flex",
                flexDirection: "column",
              }}
              key={doctor.id}
            >
              <Typography variant="h6">
                Doctor Name : {`${doctor.firstName} ${doctor.lastName}`}
              </Typography>
              <Typography
                variant="body1"
                style={{ marginTop: "20px", marginBottom: "10px" }}
              >
                Speciality : {doctor.speciality}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Rating :
                <Rating
                  name="simple-controlled"
                  value={doctor.rating}
                  readOnly
                />
              </Typography>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "20px",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ flex: 1 }}
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
                  style={{ background: "green", color: "white", flex: 1 }}
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
        <Box sx={style}>
          <Typography
            variant="h5"
            style={{
              display: "flex",
              alignItems: "center",
              background: "purple",
              color: "ghostwhite",
              height: "38px",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              padding: 16,
            }}
          >
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
