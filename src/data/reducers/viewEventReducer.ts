import { ViewEventState } from "../types/stateTypes";
import { blankEventDetails } from "../../constants/types";
import { ViewEventType, LOAD_EVENT_DETAILS, LOADING_EVENT, EVENT_NOT_GOING, EVENT_INTERESTED, EVENT_GOING, LOAD_BLANK_EVENT_DETAILS, EVENTS_LOAD_EVENT_DETAILS, DISCOVER_LOAD_EVENT_DETAILS } from "../actions/types";
import { NOT_GOING, GOING, INTERESTED } from "../../constants/constants";

const initialState: ViewEventState = {
   event: blankEventDetails,
   eventsEvent: blankEventDetails,
   discoverEvent: blankEventDetails,
   loading: true
}


export function viewEventReducer(state = initialState, action: ViewEventType): ViewEventState {
   switch(action.type) {
      case LOAD_EVENT_DETAILS:
         return {
            ...state,
            event: action.payload,
            loading: false
         }

      case EVENTS_LOAD_EVENT_DETAILS:
         return {
            ...state,
            eventsEvent: action.payload,
            loading: false
         }
      
      case DISCOVER_LOAD_EVENT_DETAILS:
         return {
            ...state,
            discoverEvent: action.payload,
            loading: false
         }

      case LOAD_BLANK_EVENT_DETAILS:
         return {
            ...state,
            event: blankEventDetails
         }
         
      case LOADING_EVENT:
         return {
            ...state,
            loading: true
         }

      case EVENT_GOING:
         const going = state.event;
         going.goingStatus = GOING;
         return {
            ...state,
            event: going
         }

      case EVENT_NOT_GOING:
         const notGoing = state.event;
         notGoing.goingStatus = NOT_GOING;
         return {
            ...state,
            event: notGoing
         }

      case EVENT_INTERESTED:
         const interested = state.event;
         interested.goingStatus = INTERESTED;
         return {
            ...state,
            event: interested
         }

      default:
         return state;

   }

}