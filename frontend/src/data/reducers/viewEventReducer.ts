import { ViewEventState } from "../types/stateTypes";
import { blankEventDetails } from "../../constants/types";
import {
   ViewEventType,
   LOAD_EVENT_DETAILS,
   LOADING_EVENT,
   EVENT_NOT_GOING,
   EVENT_INTERESTED,
   EVENT_GOING,
   LOAD_BLANK_EVENT_DETAILS
} from "../actions/viewEvent/viewEventTypes";
import { NOT_GOING, GOING, INTERESTED } from "../../constants/constants";

const initialState: ViewEventState = {
   events: [],
   loading: true
}


export function viewEventReducer(state = initialState, action: ViewEventType): ViewEventState {
   switch (action.type) {
      case LOAD_EVENT_DETAILS:
         const newEvents = state.events.filter(e => e.id !== action.payload.id);
         newEvents.push(action.payload);
         return {
            ...state,
            events: newEvents,
            loading: false
         }
         
      case LOADING_EVENT:
         return {
            ...state,
            loading: true
         }

      case EVENT_GOING:
         const eventGoing = state.events.filter(e => e.id === action.payload)[0];
         eventGoing.goingStatus = GOING;
         const newEventsGoing = state.events.filter(e => e.id !== action.payload);
         newEventsGoing.push(eventGoing);

         return {
            ...state,
            events: newEventsGoing
         }

      case EVENT_NOT_GOING:
         const eventNotGoing = state.events.filter(e => e.id === action.payload)[0];
         eventNotGoing.goingStatus = NOT_GOING;
         const newEventsNotGoing = state.events.filter(e => e.id !== action.payload);
         newEventsNotGoing.push(eventNotGoing);

         return {
            ...state,
            events: newEventsNotGoing
         }

      case EVENT_INTERESTED:
         const eventInterested = state.events.filter(e => e.id === action.payload)[0];
         eventInterested.goingStatus = INTERESTED;
         const newEventInterested = state.events.filter(e => e.id !== action.payload);
         newEventInterested.push(eventInterested);
         return {
            ...state,
            events: newEventInterested
         }

      default:
         return state;
   }
}