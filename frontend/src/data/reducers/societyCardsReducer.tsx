import { SocietyCardState } from "../types/stateTypes";
import { FetchSocietyType, FETCH_SEARCH_SOCIETY_CARDS, FOLLOW_SOCIETY, UNFOLLOW_SOCIETY } from "../actions/types";
import { FOLLOWING, NOT_FOLLOWING } from "../../constants/constants";

const initialState: SocietyCardState = {
  societies: []
}

export function societyCardsReducer(state = initialState, action: FetchSocietyType): SocietyCardState {
  switch(action.type) {
    case FETCH_SEARCH_SOCIETY_CARDS:
      return {
        ...state,
        societies: action.payload
      };
    case FOLLOW_SOCIETY:
      return {
        ...state,
        societies: state.societies.map(society => {
          if (society.id === action.payload) {
            return ({
              ...society,
              following: FOLLOWING
            });
          } else {
            return society;
          }
        })
      };
    case UNFOLLOW_SOCIETY:
      return {
        ...state,
        societies: state.societies.map(society => {
          if (society.id === action.payload) {
            return ({
              ...society,
              following: NOT_FOLLOWING
            });
          } else {
            return society;
          }
        })
      };
    default:
      return state;
  }
}