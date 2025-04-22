import { useEffect, useState } from "react";

export const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);
  return isLoggedIn;
};
