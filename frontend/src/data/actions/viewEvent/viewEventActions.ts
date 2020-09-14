import { AppThunk } from "../../types/dataInterfaces";
import { eventDetailsURL, goingToEventEndpoint, interestedInEventEndpoint, notGoingToEventEndpoint } from "../../../constants/endpoints";
import { convertResToEventDetails } from "../../../constants/types";
import { LOAD_EVENT_DETAILS, LOADING_EVENT, EVENT_GOING, EVENT_INTERESTED, EVENT_NOT_GOING, LOAD_BLANK_EVENT_DETAILS, EVENTS_LOAD_EVENT_DETAILS, DISCOVER_LOAD_EVENT_DETAILS, EVENTS_EVENT_GOING, DISCOVER_EVENT_GOING, EVENTS_EVENT_NOT_GOING, DISCOVER_EVENT_NOT_GOING, EVENTS_EVENT_INTERESTED, DISCOVER_EVENT_INTERESTED, LOAD_DISCOVER_BLANK_EVENT_DETAILS, LOAD_EVENTS_BLANK_EVENT_DETAILS } from "./viewEventTypes";

export const loadEventDetails = (id: string, tab: string, userToken: string): AppThunk => async dispatch => {
   fetch(eventDetailsURL(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => convertResToEventDetails(data))
      .then(details => dispatch({
         type: LOAD_EVENT_DETAILS,
         payload: details
      }))
}

export const loadingEvent = () => ({
   type: LOADING_EVENT
})

export const loadBlankEvent = (tab: string) => {
   const type = tab === "events" ? LOAD_EVENTS_BLANK_EVENT_DETAILS
      : (tab === "discover" ? LOAD_DISCOVER_BLANK_EVENT_DETAILS
         : LOAD_BLANK_EVENT_DETAILS);
   return { type: type }
}


export const goingToEvent = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(goingToEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(() => dispatch({
         type: EVENT_GOING,
         payload: id
      }))
      .catch(err => console.log(err))
}

export const interestedInEvent = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(interestedInEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(() => dispatch({
         type: EVENT_INTERESTED,
         payload: id
      }))
      .catch(err => console.log(err))
}

export const notGoingToEvent = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(notGoingToEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(() => dispatch({
         type: EVENT_NOT_GOING,
         payload: id
      }))
      .catch(err => console.log(err))
}
