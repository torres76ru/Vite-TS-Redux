import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { load_user } from "./profile";
import { Dispatch } from "redux";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS
} from "./types";
import { API_URL } from "../App";

export const checkAuthenticated = () => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get(API_URL + "accounts/authentificated", config);

    if (res.data.error || res.data.isAuthentificated === "error") {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false
      });
    } else if (res.data.isAuthentificated === "success") {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false
    });
  }
};

export const login =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken")
      }
    };

    const body = JSON.stringify({ username, password });

    try {
      const res: AxiosResponse<{ success: boolean; username: string }> =
        await axios.post(API_URL + "accounts/login", body, config);
      if (res.data.success) {
        dispatch({
          type: LOGIN_SUCCESS
        });

        //@ts-ignore
        dispatch(load_user());
      } else {
        dispatch({
          type: LOGIN_FAIL
        });
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken")
    }
  };

  const body = JSON.stringify({
    withCredentials: true
  });

  try {
    const res: AxiosResponse<{ success: boolean; username: string }> =
      await axios.post(API_URL + "accounts/logout", body, config);
    if (res.data.success) {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL
    });
  }
};
