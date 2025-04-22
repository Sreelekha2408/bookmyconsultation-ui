import React, { Fragment } from "react";
import Header from "../../common/header/Header";
import { Box, Tab, Tabs } from "@material-ui/core";
import DoctorList from "../doctorList/DoctorList";
import Appointments from "../appointment/Appointment";

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Fragment>
      <Header />
      <Box>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Doctors" />
          <Tab label="APPOINTMENT" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <DoctorList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Appointments />
        </CustomTabPanel>
      </Box>
    </Fragment>
  );
};
export default Home;
