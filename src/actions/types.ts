// Auth dispatch states
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const AUTHENTICATED_FAIL = "AUTHENTICATED_FAIL";
export const AUTHENTICATED_SUCCESS = "AUTHENTICATED_SUCCESS";
// Profile Dispatch states
export const LOAD_USER_PROFILE_FAIL = "LOAD_USER_PROFILE_FAIL";
export const LOAD_USER_PROFILE_SUCCESS = "LOAD_USER_PROFILE_SUCCESS";

// Define action interfaces
interface LoadUserProfileSuccessAction {
  type: typeof LOAD_USER_PROFILE_SUCCESS;
  payload: any; // Define the type of payload
}

interface LoadUserProfileFailAction {
  type: typeof LOAD_USER_PROFILE_FAIL;
}

export type AuthActionTypes =
  | LoadUserProfileSuccessAction
  | LoadUserProfileFailAction;
