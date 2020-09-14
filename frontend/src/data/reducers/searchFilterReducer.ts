import { SearchFiltersType, UPDATE_SEARCH_FILTERS } from "../actions/types";
import { SearchFiltersState } from "../types/stateTypes";

const intialState: SearchFiltersState = {
  includePast: false,
  useStart: false,
  start: new Date(Date.now()),
  useEnd: false,
  end: new Date(Date.now())
}

export function searchFilterReducer(state = intialState, action: SearchFiltersType): SearchFiltersState {
  switch(action.type) {
    case UPDATE_SEARCH_FILTERS:
      return action.payload;
    default:
      return state;
  }
}