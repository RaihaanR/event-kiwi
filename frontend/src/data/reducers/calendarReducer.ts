import { CalendarEventsState } from "../types/stateTypes";
import { FetchCalType, FETCH_CAL_EVENTS } from "../actions/types"

const initialState: CalendarEventsState = {events: []}

export const calEventReducer = (state = initialState, action: FetchCalType): CalendarEventsState => {
  switch(action.type) {
    case FETCH_CAL_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
}