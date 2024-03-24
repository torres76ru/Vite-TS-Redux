import { useEffect, useState } from "react";
import { API_URL } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";

const ModalLogin = () => {
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = () => {
    axios.get(API_URL + "accounts/csrf_cookie").then((response) => {
      const token = getCookie("csrftoken");
      setCsrfToken(token);
      if (token) {
        checkAuthenticated(token);
      }
    });
  };

  const checkAuthenticated = (token: string) => {
    axios
      .get(API_URL + "accounts/authenticated", {
        headers: { "X-CSRFToken": token }
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const guestLinks = () => (
    <>
      <Link to="/login">Login</Link>
    </>
  );

  return <div>{guestLinks()}</div>;
};

export default ModalLogin;
