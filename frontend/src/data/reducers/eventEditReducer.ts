import { EventEditState } from "../types/stateTypes";
import { blankEventDetails } from "../../constants/types";
import { EventEditType, CREATE_NEW_EVENT, LOAD_EDIT_EVENT, UPDATE_EVENT, DELETE_EVENT, UPLOAD_EVENT_IMAGE } from "../actions/types";

const initialState: EventEditState = {
  event: blankEventDetails
}

export function eventEditReducer(state = initialState, action: EventEditType) {
  switch(action.type) {
    case LOAD_EDIT_EVENT:
      return {
        ...state,
        event: action.payload
      }
    case CREATE_NEW_EVENT:
      return {
        ...state,
        event: action.payload
      }
    case UPDATE_EVENT:
      return {
        ...state,
        event: action.payload
      }
    case DELETE_EVENT:
      return {
        ...state,
      }
    case UPLOAD_EVENT_IMAGE:
      return {
        ...state,
        event: {
          ...state.event,
          images: [action.payload]
        }
      }
    default:
      return state;
  }
}