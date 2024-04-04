import { useState, useEffect } from "react";
import axios from "axios";

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState<string | null>("");

  const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}accounts/csrf_cookie`
        );
      } catch (err) {}
    };
    fetchData();
    setcsrftoken(getCookie("csrf_token"));
  }, []);

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken || ""} />
  );
};

export default CSRFToken;
