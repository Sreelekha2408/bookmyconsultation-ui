import { Fragment, useEffect, useState } from "react";
import { useLogin } from "../login/useLogin";
import { Box, Button, Modal, Paper, Typography } from "@material-ui/core";
import { getRequest } from "../../util/fetch";
import moment from "moment";
import RateAppointment from "./RateAppointment";
import { url } from "../../util/apiConfig";
import "./Appointment.css";
import { showNotification } from "../../common/notification";
import { ERROR } from "../../common/constants";

export default function Appointments() {
  const isLoggedIn = useLogin();
  const [appointments, setAppointments] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({});

  useEffect(() => {
    async function getAppointments(id) {
      try {
        const response = await getRequest(
          `${url.userAppointments}/${id}/appointments`
        );
        const data = await response.json();
        setAppointments(data);
      } catch (e) {
        showNotification(ERROR, "Something went wrong, please try again later");
      }
    }

    if (isLoggedIn) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      getAppointments(userDetails.id);
    }
  }, [isLoggedIn]);

  return (
    <Fragment>
      {!isLoggedIn ? (
        <Typography variant="h6" className="appointmentHeaderText">
          Login to see appointments
        </Typography>
      ) : (
        <div className="appointmentsContainer">
          {appointments.map((appointment) => {
            return (
              <Paper
                elevation={2}
                className="appointmentCard"
                key={appointment.id}
              >
                <Typography variant="h6">
                  Doctor Name : {appointment.doctorName}
                </Typography>
                <Typography variant="body1">
                  Date :
                  {moment(appointment.appointmentDate).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="body1">
                  Symptoms : {appointment.symptoms}
                </Typography>
                <Typography variant="body1">
                  Prior Medical History : {appointment.priorMedicalHistory}
                </Typography>
                <div className="btnContainer">
                  <Button
                    variant="contained"
                    color="primary"
                    className="appointmentBtn"
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
        <Box className="modalBody">
          <Typography variant="h5" className="modalText">
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
