import { USER_LOGIN, UserType, LOAD_USER_DATA, USER_LOGOUT, INVALID_USER, } from "../actions/types";
import { UserState } from "../types/stateTypes";
import { blankProfile } from "../types/dataInterfaces";

const initialState: UserState = {
   loading: true,
   isLoggedIn: false,
   userToken: "",
   profile: blankProfile,
   isSoc: false

}

export function userReducer(state = initialState, action: UserType): UserState {
   switch (action.type) {
      case USER_LOGIN:
         return {
            ...state,
            isLoggedIn: true,
            userToken: action.payload.body.token,
            profile: action.payload.body.profile,
            isSoc: action.payload.body.profile.society !== "0",
            loading: false
         }
      case LOAD_USER_DATA:
         var isSoc = false;
         if (action.payload.profile !== undefined) {
            isSoc = action.payload.profile.society !== "0";
         }
         return {
            ...state,
            isLoggedIn: action.payload.isLoggedIn,
            userToken: action.payload.userToken,
            profile: action.payload.profile,
            loading: action.payload.loading,
            isSoc: isSoc,
         }
      case USER_LOGOUT:
         return {
            ...state,
            isLoggedIn: false,
            userToken: initialState.userToken,
            profile: initialState.profile,
            loading: true,
            isSoc: false
         }
      case INVALID_USER:
         return {
            ...state,
            loading: false,
            isLoggedIn: false,
            userToken: "",
            profile: blankProfile,
            isSoc: false
         }

      default:
         return state;

   }

}