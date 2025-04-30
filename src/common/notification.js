import { toast } from "react-toastify";
import { toolTipTheme } from "./constants";

export const showNotification = (type, message) => {
  return toast[type](message, {
    autoClose: 3000,
    progress: 0.3,
    hideProgressBar: true,
    icon: true,
    theme: toolTipTheme,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
