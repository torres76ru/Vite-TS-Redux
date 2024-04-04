import axios from "axios";
import { LOAD_USER_PROFILE_FAIL, LOAD_USER_PROFILE_SUCCESS } from "./types";
import { Dispatch } from "redux";
import { API_URL } from "../App";

export const load_user = () => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.get(`${API_URL}accounts/user`, config);
    if (res.data.error)
      dispatch({
        type: LOAD_USER_PROFILE_FAIL
      });
    else
      dispatch({
        type: LOAD_USER_PROFILE_SUCCESS,
        payload: res.data
      });
  } catch (err) {
    dispatch({
      type: LOAD_USER_PROFILE_FAIL
    });
  }
};
