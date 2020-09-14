import { ThunkAction } from "redux-thunk"
import { RootState } from "../reducers"
import { Action } from "redux"

export interface UserProfile {
   firstname: string,
   surname: string,
   email: string,
   society: string
}

export const blankProfile: UserProfile = {
   firstname: "",
   surname: "",
   email: "",
   society: "0"
}

export interface AuthResponseBodyProfile {
   firstname: string,
   surname: string,
   email: string,
   society: string
}


export interface AuthResponseBody {
   token: string,
   profile: AuthResponseBodyProfile
}

export interface AuthResponse {
   status: number,
   body: AuthResponseBody
}


export type AppThunk<ReturnType = void> =
   ThunkAction<
      ReturnType,
      RootState,
      unknown,
      Action<string>
   >
