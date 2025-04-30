import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import "./TabContainer.css";

const TabContainer = function (props) {
  return (
    <Typography component="div" className="tabStyle">
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
