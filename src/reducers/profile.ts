import {
  LOAD_USER_PROFILE_FAIL,
  LOAD_USER_PROFILE_SUCCESS
} from "../actions/types";

export interface State {
  username: string;
}

const initialState: State = {
  username: ""
};

interface Action {
  type: string;
  payload: any; // Update the type according to your actual payload type
}

export default function reducer(state: State = initialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username
      };
    case LOAD_USER_PROFILE_FAIL:
      return {
        ...state,
        username: ""
      };
    default:
      return state;
  }
}
