import React, { useState, useRef, Fragment } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import "./register.css";
import { postLoginRequest, registerUser } from "../../util/fetch";
import { toast } from "react-toastify";
import { url } from "../../util/apiConfig";

export default function Register(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const mobileRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState({
    email: false,
    mobile: false,
    password: false,
  });

  const handleFormError = (errors) => {
    setFormSubmitted({
      email: true,
      mobile: true,
      password: true,
    });
  };

  const onSubmit = async (data) => {
    const response = await registerUser(url.register, data);
    if (response.ok) {
      const response1 = await postLoginRequest(url.login, {
        email: data.emailId,
        password: data.password,
      });
      if (response1.ok) {
        const userDetails = await response1.json();
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        localStorage.setItem("token", JSON.stringify(userDetails.accessToken));
        toast.success("Registration Successful", {
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
      }
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit, handleFormError)}
        noValidate
        className="registerForm"
      >
        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel htmlFor="firstName">First Name*</InputLabel>
          <Input
            id="firstName"
            inputRef={firstNameRef}
            {...register("firstName", {
              required: "Please fill out this field",
            })}
          />
          {errors.firstName?.type === "required" && (
            <Tooltip
              open={true}
              title={errors.firstName.message}
              placement="bottom-left"
              PopperProps={{
                disablePortal: true,
                style: {
                  zIndex: 1500,
                },
                anchorEl: firstNameRef.current,
              }}
            >
              <span style={{ fontSize: 0 }}></span>
            </Tooltip>
          )}
        </FormControl>

        {/* Last Name */}
        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel htmlFor="lastName">Last Name*</InputLabel>
          <Input
            id="lastName"
            inputRef={lastNameRef}
            {...register("lastName", {
              required: "Please fill out this field",
            })}
          />
          {errors.lastName?.type === "required" && (
            <Tooltip
              open={true}
              title={errors.lastName.message}
              placement="bottom-left"
              PopperProps={{
                disablePortal: true,
                style: {
                  zIndex: 1500,
                },
                anchorEl: lastNameRef.current,
              }}
            >
              <span style={{ fontSize: 0 }}></span>
            </Tooltip>
          )}
        </FormControl>

        {/* Email */}
        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel htmlFor="emailId">Email Id*</InputLabel>
          <Input
            id="emailId"
            inputRef={emailRef}
            type="text"
            {...register("emailId", {
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
          {errors.emailId?.type === "required" ? (
            <Tooltip
              open={true}
              title={errors.emailId.message}
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
            errors.emailId?.type === "pattern" &&
            formSubmitted["email"] && (
              <FormHelperText error>{errors.emailId.message}</FormHelperText>
            )
          )}
        </FormControl>

        {/* Password */}
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

        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel htmlFor="mobile">Mobile No.*</InputLabel>
          <Input
            id="mobile"
            inputRef={mobileRef}
            type="tel"
            {...register("mobile", {
              required: "Please fill out this field",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
              onChange: () => {
                setFormSubmitted({
                  ...formSubmitted,
                  mobile: false,
                });
              },
            })}
          />
          {errors.mobile?.type === "required" ? (
            <Tooltip
              open={true}
              title={errors.mobile.message}
              placement="bottom"
              PopperProps={{
                disablePortal: true,
                style: {
                  zIndex: 1500,
                },
                anchorEl: mobileRef.current,
              }}
            >
              <span style={{ fontSize: 0 }}></span>
            </Tooltip>
          ) : (
            errors.mobile?.type === "pattern" &&
            formSubmitted["mobile"] && (
              <FormHelperText error>{errors.mobile.message}</FormHelperText>
            )
          )}
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="registerButton"
        >
          Register
        </Button>
      </form>
    </Fragment>
  );
}
