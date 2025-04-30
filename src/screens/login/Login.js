import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useRef, useState } from "react";
import "./login.css";
import { postLoginRequest } from "../../util/fetch";
import { url } from "../../util/apiConfig";
import { EMPTY, ERROR, SUCCESS } from "../../common/constants";
import { useForm } from "react-hook-form";
import { showNotification } from "../../common/notification";

const LoginForm = (props) => {
  const [apiError, setApiError] = useState(EMPTY);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState({
    email: false,
    password: false,
  });

  const handleFormError = (errors) => {
    setFormSubmitted({
      email: true,
      password: true,
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await postLoginRequest(url.login, {
        email: data.email,
        password: data.password,
      });
      const userDetails = await response.json();
      if (response.ok) {
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        localStorage.setItem("token", JSON.stringify(userDetails.accessToken));
        showNotification(SUCCESS, "Logged in successfully!!");
        props.setOpenModal(false);
      } else {
        setApiError(userDetails.message);
      }
    } catch (e) {
      showNotification(ERROR, "Something went wrong, please try again later");
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit, handleFormError)}
        noValidate
        className="loginForm"
      >
        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel htmlFor="email">Email*</InputLabel>
          <Input
            id="email"
            inputRef={emailRef}
            type="text"
            {...register("email", {
              required: "Please fill out this field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              onChange: () => {
                setFormSubmitted({
                  ...formSubmitted,
                  email: false,
                });
              },
            })}
          />
          {errors.email?.type === "required" ? (
            <Tooltip
              open={true}
              title={errors.email.message}
              placement="bottom-left"
              PopperProps={{
                disablePortal: true,
                style: {
                  zIndex: 1500,
                },
                anchorEl: emailRef.current,
              }}
            >
              <span style={{ fontSize: 0 }}></span>
            </Tooltip>
          ) : (
            errors.email?.type === "pattern" &&
            formSubmitted["email"] && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )
          )}
        </FormControl>
        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel htmlFor="password">Password*</InputLabel>
          <Input
            id="password"
            inputRef={passwordRef}
            type="password"
            {...register("password", {
              required: "Please fill out this field",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              onChange: () => {
                setFormSubmitted({
                  ...formSubmitted,
                  password: false,
                });
              },
            })}
          />
          {errors.password?.type === "required" ? (
            <Tooltip
              open={true}
              title={errors.password.message}
              placement="bottom"
              PopperProps={{
                disablePortal: true,
                style: {
                  zIndex: 1500,
                },
                anchorEl: passwordRef.current,
              }}
            >
              <span style={{ fontSize: 0 }}></span>
            </Tooltip>
          ) : (
            errors.password?.type === "minLength" &&
            formSubmitted["password"] && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )
          )}
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
