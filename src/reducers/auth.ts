import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL
} from "../actions/types";

export interface State {
  isAuthentificated: boolean | null;
}

const initialState: State = {
  isAuthentificated: null
};

interface Action {
  type: string;
  payload: any; // Update the type according to your actual payload type
}

export default function (state: State = initialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthentificated: payload
      };
    case LOGIN_SUCCESS:
      return { ...state, isAuthentificated: true };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthentificated: false
      };
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return state;
    default:
      return state;
  }
}
