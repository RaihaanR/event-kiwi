import { FetchEventType, FETCH_EVENTS_CARDS, FETCH_SEARCH_EVENT_CARDS, FETCH_MORE_SEARCH_EVENT_CARDS, FETCH_MORE_EVENT_CARDS, FETCH_TAG_EVENT_CARDS, FETCH_MORE_TAG_EVENT_CARDS  } from "../actions/types";
import { EventCardState } from "../types/stateTypes";
import { EVENT_SEARCH_BATCH_SIZE } from "../../constants/constants";

const initialState: EventCardState = {
   events: [],
   moreResults: false,
   isTagSearch: false,
   tagName: ""
}

export function eventCardsReducer(state = initialState, action: FetchEventType): EventCardState {
   switch(action.type) {
      case FETCH_EVENTS_CARDS:
         return {
            ...state,
            events: action.payload,
            moreResults: action.count === EVENT_SEARCH_BATCH_SIZE,
            isTagSearch: false,
            tagName: ""
         };
      case FETCH_MORE_EVENT_CARDS:
         return {
            ...state,
            events: state.events.concat(action.payload.filter((event) => !state.events.includes(event))),
            moreResults: action.count === EVENT_SEARCH_BATCH_SIZE,
            isTagSearch: false,
            tagName: ""
         };
      case FETCH_SEARCH_EVENT_CARDS:
         return {
            ...state,
            events: action.payload,
            moreResults: action.count === EVENT_SEARCH_BATCH_SIZE,
            isTagSearch: false,
            tagName: ""
         };
      case FETCH_MORE_SEARCH_EVENT_CARDS:
         return {
            ...state,
            events: state.events.concat(action.payload.filter((event) => !state.events.includes(event))),
            moreResults: action.count === EVENT_SEARCH_BATCH_SIZE,
            isTagSearch: false,
            tagName: ""
         };
      case FETCH_TAG_EVENT_CARDS:
         return {
            ...state,
            events: action.payload,
            moreResults: action.count === EVENT_SEARCH_BATCH_SIZE,
            isTagSearch: true,
            tagName: action.tag
         };
      case FETCH_MORE_TAG_EVENT_CARDS:
         return {
            ...state,
            events: state.events.concat(action.payload.filter((event) => !state.events.includes(event))),
            moreResults: action.count === EVENT_SEARCH_BATCH_SIZE,
            isTagSearch: true,
            tagName: action.tag
         };
      default:
         return state;
   }
}