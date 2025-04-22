import { Fragment, useEffect, useState } from "react";
import { useLogin } from "../login/useLogin";
import { Box, Button, Modal, Paper, Typography } from "@material-ui/core";
import { getRequest } from "../../util/fetch";
import moment from "moment";
import RateAppointment from "./RateAppointment";
import { url } from "../../util/apiConfig";

export default function Appointments() {
  const isLoggedIn = useLogin();
  const [appointments, setAppointments] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({});

  useEffect(() => {
    async function getAppointments(id) {
      const response = await getRequest(
        `${url.userAppointments}/${id}/appointments`
      );
      const data = await response.json();
      setAppointments(data);
    }

    if (isLoggedIn) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      getAppointments(userDetails.id);
    }
  }, [isLoggedIn]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: "2px 2px 2px 1px rgb(0 0 0 / 20%)",
    borderRadius: "5px",
  };
  return (
    <Fragment>
      {!isLoggedIn ? (
        <Typography
          variant="h6"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Login to see appointments
        </Typography>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "24px",
            alignItems: "center",
            padding: 24,
          }}
        >
          {appointments.map((appointment) => {
            return (
              <Paper
                elevation={2}
                style={{
                  height: "auto",
                  width: "100%",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
                key={appointment.id}
              >
                <Typography variant="h6">
                  Doctor Name : {appointment.doctorName}
                </Typography>
                <Typography variant="body1">
                  Date :{" "}
                  {moment(appointment.appointmentDate).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="body1">
                  Symptoms : {appointment.symptoms}
                </Typography>
                <Typography variant="body1">
                  Prior Medical History : {appointment.priorMedicalHistory}
                </Typography>
                <div
                  style={{
                    marginTop: "20px",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      setAppointmentDetails(appointment);
                      setOpenModal(true);
                    }}
                  >
                    RATE APPOINTMENT
                  </Button>
                </div>
              </Paper>
            );
          })}
        </div>
      )}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
            Rate an Appointment
          </Typography>
          <RateAppointment
            appointmentDetails={appointmentDetails}
            setOpenModal={setOpenModal}
          />
        </Box>
      </Modal>
    </Fragment>
  );
}
