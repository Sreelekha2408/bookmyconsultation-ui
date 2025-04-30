import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
};

export default Controller;
