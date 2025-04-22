import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import "./login.css";
import { postLoginRequest } from "../../util/fetch";
import { toast } from "react-toastify";
import { url } from "../../util/apiConfig";
import { EMPTY } from "../../common/constants";

const LoginForm = (props) => {
  const [email, setEmail] = useState(EMPTY);
  const [emailError, setEmailError] = useState(EMPTY);
  const [password, setPassword] = useState(EMPTY);
  const [passwordError, setPasswordError] = useState(EMPTY);
  const [apiError, setApiError] = useState(EMPTY);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(EMPTY);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(EMPTY);
  };

  const validateFields = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Please fill out this field");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter valid Email");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Please fill out this field");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    const response = await postLoginRequest(url.login, {
      email,
      password,
    });
    const userDetails = await response.json();
    if (response.ok) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      localStorage.setItem("token", JSON.stringify(userDetails.accessToken));
      toast.success("Logged in successfully!!", {
        autoClose: 3000,
        progress: 0.3,
        hideProgressBar: true,
        icon: true,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      props.setOpenModal(false);
    } else {
      setApiError(userDetails.message);
    }
  };

  return (
    <Fragment>
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Email*</InputLabel>
          <Input
            id="component-simple"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <FormHelperText id="component-error-text" error>
            {emailError}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Password*</InputLabel>
          <Input
            id="component-simple"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <FormHelperText id="component-error-text" error>
            {passwordError}
          </FormHelperText>
        </FormControl>
        <Typography variant="body1" color="error">
          {apiError}
        </Typography>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Fragment>
  );
};
export default LoginForm;
