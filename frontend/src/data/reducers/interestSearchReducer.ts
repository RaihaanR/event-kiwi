import { interestSearchState } from "../types/stateTypes";
import { FetchInterestType, FETCH_SEARCH_INTERESTS } from "../actions/types";

const initialState: interestSearchState = {
  interests: []
}

export function interestSearchReducer(state = initialState, action: FetchInterestType) {
  switch(action.type) {
    case FETCH_SEARCH_INTERESTS:
      return {
        ...state,
        interests: action.payload
      }
    default:
      return state;
  }
}