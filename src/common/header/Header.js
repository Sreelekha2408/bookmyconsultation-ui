import { Box, Button, IconButton, Tab, Tabs } from "@material-ui/core";
import "./Header.css";
import doctorLogo from "../../assets/logo.jpeg";
import { useState } from "react";
import Modal from "react-modal";
import LoginForm from "../../screens/login/Login";
import { Close } from "@material-ui/icons";
import { useLogin } from "../../screens/login/useLogin";
import Register from "../../screens/register/Register";
import { postRequest } from "../../util/fetch";
import { toast } from "react-toastify";
import { url } from "../../util/apiConfig";
import { SUCCESS } from "../constants";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(0);
  const isLoggedIn = useLogin();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "auto",
      width: "320px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      backgroundColor: "white",
      border: "none !important",
      padding: "0px !important",
    },
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

  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  async function handleLogOut() {
    const response = await postRequest(url.logout);
    if (response.ok) {
      const resData = await response.text();
      if (resData === SUCCESS) {
        localStorage.clear();
        toast.success("Logged out successfully!!", {
          autoClose: 3000,
          progress: 0.3,
          hideProgressBar: true,
          icon: true,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  }
  return (
    <div container className="headerContainer">
      <div className="leftContainer">
        <img src={doctorLogo} alt="doctor_logo" className="doctorLogo" />
        <h2 className="headerName">Doctor Finder</h2>
      </div>
      <div>
        {!isLoggedIn && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            className="loginBtn"
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button variant="contained" color="secondary" onClick={handleLogOut}>
            Logout
          </Button>
        )}
      </div>
      <Modal isOpen={openModal} style={customStyles} contentLabel="Modal">
        <div className="loginModalHeader">
          Authentication
          <IconButton onClick={() => setOpenModal(false)}>
            <Close className="closeIcon" />
          </IconButton>
        </div>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Login" {...tabProps(0)} />
          <Tab label="Register" {...tabProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <LoginForm setOpenModal={setOpenModal} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Register setOpenModal={setOpenModal} />
        </CustomTabPanel>
      </Modal>
    </div>
  );
};
export default Header;
