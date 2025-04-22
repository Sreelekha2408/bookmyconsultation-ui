import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Fragment, useEffect, useState } from "react";
import { bookAnAppointment, getRequest } from "../../util/fetch";
import moment from "moment";
import { toast } from "react-toastify";

export default function BookAppointment({ doctor, setModal }) {
  const { firstName, lastName, id } = doctor;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [allSlots, setAllSlots] = useState([]);
  const [formValidation, setFormValidation] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (e) => {
    setTimeSlot(e.target.value);
    setFormValidation(false);
  };
  useEffect(() => {
    async function getTimeSlots() {
      const date = moment(selectedDate).format("YYYY-MM-DD");
      const response = await getRequest(
        `http://localhost:8080/doctors/${id}/timeSlots?date=${date}`
      );
      if (response.ok) {
        const { timeSlot } = await response.json();
        setAllSlots(timeSlot);
      }
    }
    if (selectedDate) {
      getTimeSlots();
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!timeSlot) {
      setFormValidation(true);
      return;
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const {
      id: userId,
      emailAddress,
      firstName: userFirstName,
      lastName: userLastName,
    } = userDetails;
    const payload = {
      doctorId: id,
      doctorName: `${firstName} ${lastName}`,
      userId: userId,
      userName: `${userFirstName} ${userLastName}`,
      userEmailId: emailAddress,
      timeSlot: timeSlot,
      appointmentDate: moment(selectedDate).format("YYYY-MM-DD"),
      createdDate: moment(new Date()).format("YYYY-MM-DD"),
      symptoms: symptoms,
      priorMedicalHistory: medicalHistory,
    };
    const response = await bookAnAppointment(payload);
    if (response) {
      setFormValidation(false);
      toast.success("Booked Appointment Successfully.", {
        autoClose: 3000,
        progress: 0.3,
        hideProgressBar: true,
        icon: true,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setModal(false);
    }
  };
  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          width: "40%",
          gap: 20,
        }}
      >
        <TextField
          name="doctorName"
          aria-readonly
          label="DoctorName"
          disabled
          value={`${firstName} ${lastName}`}
          required
          variant="standard"
          InputProps={{
            style: {
              fontSize: "16px",
            },
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date"
            format="dd/MM/yyyy"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControl>
          <InputLabel id="demo-simple-select-outlined-label">
            Timeslot
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={timeSlot}
            onChange={handleChange}
            name="timeSlot"
            variant="standard"
          >
            {allSlots.map((slot, index) => {
              return (
                <MenuItem key={`${slot}-${index}`} value={slot}>
                  {slot}
                </MenuItem>
              );
            })}
          </Select>
          {formValidation && (
            <FormHelperText error>Select a time slot</FormHelperText>
          )}
        </FormControl>
        <TextField
          label="Medical History"
          multiline
          minRows={3}
          name="medicalHistory"
          variant="standard"
          onChange={(e) => setMedicalHistory(e.target.value)}
        />
        <TextField
          label="Symptoms"
          multiline
          minRows={3}
          name="symptoms"
          variant="standard"
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ flex: 1 }}
        >
          BOOK APPOINTMENT
        </Button>
      </form>
    </Fragment>
  );
}
