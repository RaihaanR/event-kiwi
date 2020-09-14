import { ThunkAction } from "redux-thunk"
import { RootState } from "../reducers"
import { Action } from "redux"
import { FETCH_EVENTS_CARDS, FETCH_SEARCH_EVENT_CARDS, FETCH_CAL_EVENTS, FETCH_PROFILE_DETAILS, REMOVE_PROFILE_INTEREST, FETCH_PROFILE_DETAILS_FAILED, RESET_PROFILE_INVALID_RESPONSE, ADD_PROFILE_INTEREST, FETCH_SEARCH_SOCIETY_CARDS, FOLLOW_SOCIETY, UNFOLLOW_SOCIETY, FETCH_SEARCH_INTERESTS, FETCH_MORE_SEARCH_EVENT_CARDS, FETCH_MORE_EVENT_CARDS, FETCH_TAG_EVENT_CARDS, FETCH_MORE_TAG_EVENT_CARDS, SOCIETY_UNFOLLOWED } from "./types"
import { discoverEventCardURL, discoverSearchEventCardURL, profileDetailsURL, profileInterestDeleteURL, profileInterestAddURL, discoverSearchSocietyCardURL, followSocietyURL, unfollowSocietyURL, calendarEventsURL, profileInterestSearchURL } from "../../constants/endpoints"
import { resp_event_card_details, resp_profile_details, resp_society_card, resp_calendar_event, resp_search_interests, resp_search_response } from "../../constants/RequestInterfaces"
import { convertResToEventCard, convertResToProfileDetails, convertResToInterest, convertResToSocCard, convertResToCalEvent, SearchFilters, SocietyBasic } from "../../constants/types"

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const fetchSearchSocietyCards = (searchTerm: string, refresher: HTMLIonRefresherElement, token: string): AppThunk => async dispatch => {
   let url = new URL(discoverSearchSocietyCardURL);
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }
   url.searchParams.append("q", searchTerm);
   fetch(url.toString(), options)
   .then(response => response.json())
   .then(cards => {
      if (refresher !== null) {
         refresher.complete();
      }
      return (dispatch({
         type: FETCH_SEARCH_SOCIETY_CARDS,
         payload: (cards as resp_society_card[]).map(convertResToSocCard)
      }))
   })
}

export const followSociety = (id: string, token: string): AppThunk => async dispatch => {
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }
   fetch(followSocietyURL(id), options)
   .then(status => {
      return(dispatch({
         type: FOLLOW_SOCIETY,
         payload: id
      }))
   })
   .then(() => dispatch(fetchProfileDetails(token)))
   .then(() => dispatch(fetchCalEvents(null, token)))
}

export const unfollowSociety = (id: string, token: string): AppThunk => async dispatch => {
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }
   fetch(unfollowSocietyURL(id), options)
   .then(status => {
      return(dispatch({
         type: UNFOLLOW_SOCIETY,
         payload: id
      }))
   })
   .then(() => dispatch(fetchProfileDetails(token)))
   .then(() => dispatch(fetchCalEvents(null, token)))
}

export const fetchEventCards = (filters: SearchFilters, refresher: HTMLIonRefresherElement, token: string)
   : AppThunk => async dispatch => {
   if (token === "") {
      return(dispatch({
         type: FETCH_EVENTS_CARDS,
         payload: []
      }))
   }
   const url = new URL(discoverEventCardURL);
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }

   if (filters.useStart) {
      url.searchParams.append("start", filters.start.toISOString())
   }
   if (filters.useEnd) {
      url.searchParams.append("end", filters.end.toISOString())
   }
   url.searchParams.append("finished", filters.includePast.toString())
   url.searchParams.append("n", "0");

   fetch(url.toString(), options)
   .then(response => response.json())
   .then(details => {
      if (refresher !== null) {
         refresher.complete();
      }
      const cards = details as resp_search_response;
      return (dispatch({
         type: FETCH_EVENTS_CARDS,
         payload: (cards.events as resp_event_card_details[]).map(convertResToEventCard),
         count: cards.count
      }))
   })
}

export const fetchMoreEventCards = (filters: SearchFilters, offset: number, token: string): AppThunk => async dispatch => {
   let url = new URL(discoverEventCardURL);
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }

   if (filters.useStart) {
      url.searchParams.append("start", filters.start.toISOString())
   }
   if (filters.useEnd) {
      url.searchParams.append("end", filters.end.toISOString())
   }
   url.searchParams.append("n", offset.toString());

   fetch(url.toString(), options)
   .then(response => response.json())
   .then(details => {
      const cards = details as resp_search_response;
      return (dispatch({
         type: FETCH_MORE_EVENT_CARDS,
         payload: (cards.events as resp_event_card_details[]).map(convertResToEventCard),
         count: cards.count
      }))
   })
}

export const fetchSearchEventCards = (searchTerm: string, filters: SearchFilters, refresher: HTMLIonRefresherElement, token: string): AppThunk =>
   async dispatch => {
      let url = new URL(discoverSearchEventCardURL);
      const options = {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      }
      
      url.searchParams.append("q", searchTerm);
      if (filters.useStart) {
         url.searchParams.append("start", filters.start.toISOString())
      }
      if (filters.useEnd) {
         url.searchParams.append("end", filters.end.toISOString())
      }
      url.searchParams.append("finished", filters.includePast.toString())
      url.searchParams.append("n", "0");
      
      fetch(url.toString(), options)
      .then(response => response.json())
      .then(details => {
         if (refresher !== null) {
            refresher.complete();
         }
         const cards = details as resp_search_response;
         return (dispatch({
            type: FETCH_SEARCH_EVENT_CARDS,
            payload: (cards.events as resp_event_card_details[]).map(convertResToEventCard),
            count: cards.count
         }))
      })
}

export const fetchMoreSearchEventCards = (searchTerm: string, filters: SearchFilters, offset: number, token: string): AppThunk => async dispatch => {
   let url = new URL(discoverSearchEventCardURL);
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }

   url.searchParams.append("q", searchTerm);
   if (filters.useStart) {
      url.searchParams.append("start", filters.start.toISOString())
   }
   if (filters.useEnd) {
      url.searchParams.append("end", filters.end.toISOString())
   }
   url.searchParams.append("n", offset.toString());
   
   fetch(url.toString(), options)
   .then(response => response.json())
   .then(details => {
      const cards = details as resp_search_response;
      return (dispatch({
         type: FETCH_MORE_SEARCH_EVENT_CARDS,
         payload: (cards.events as resp_event_card_details[]).map(convertResToEventCard),
         count: cards.count
      }))
   })
}

export const fetchTagEventCards = (tag: string, filters: SearchFilters, refresher: HTMLIonRefresherElement | null, token: string): AppThunk => 
   async dispatch => {
      let url = new URL(discoverSearchEventCardURL);
      const options = {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      }
      
      url.searchParams.append("tag", tag);
      if (filters.useStart) {
         url.searchParams.append("start", filters.start.toISOString())
      }
      if (filters.useEnd) {
         url.searchParams.append("end", filters.end.toISOString())
      }
      url.searchParams.append("finished", filters.includePast.toString())
      url.searchParams.append("n", "0");
      
      fetch(url.toString(), options)
      .then(response => response.json())
      .then(details => {
         if (refresher !== null) {
            refresher.complete();
         }
         const cards = details as resp_search_response;
         return (dispatch({
            type: FETCH_TAG_EVENT_CARDS,
            payload: (cards.events as resp_event_card_details[]).map(convertResToEventCard),
            tag: tag,
            count: cards.count
         }))
      })
}

export const fetchMoreTagEventCards = (tag: string, filters: SearchFilters, offset: number, token: string): AppThunk => 
   async dispatch => {
      let url = new URL(discoverSearchEventCardURL);
      const options = {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      }
      
      url.searchParams.append("tag", tag);
      if (filters.useStart) {
         url.searchParams.append("start", filters.start.toISOString())
      }
      if (filters.useEnd) {
         url.searchParams.append("end", filters.end.toISOString())
      }
      url.searchParams.append("finished", filters.includePast.toString())
      url.searchParams.append("n", offset.toString());
      
      fetch(url.toString(), options)
      .then(response => response.json())
      .then(details => {
         const cards = details as resp_search_response;
         return (dispatch({
            type: FETCH_MORE_TAG_EVENT_CARDS,
            payload: (cards.events as resp_event_card_details[]).map(convertResToEventCard),
            tag: tag,
            count: cards.count
         }))
      })
}

export const fetchCalEvents = (refresher: HTMLIonRefresherElement | null, token: string): AppThunk => async dispatch => {
   if (token === "") {
      return(dispatch({
         type: FETCH_CAL_EVENTS,
         payload: []
      }))
   }
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }
   fetch(calendarEventsURL, options)
   .then(response => response.json())
   .then(events => {
      if (refresher !== null) {
         refresher.complete();
      }
      return (dispatch({
         type: FETCH_CAL_EVENTS,
         payload: (events as resp_calendar_event[]).map(convertResToCalEvent)
      }))
   })
}

export const fetchProfileDetails = (token: string): AppThunk => async dispatch => {
   const options = {
      method: "GET",
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }
   fetch(profileDetailsURL, options)
   .then(response => response.json())
   .then(details => {
      return (dispatch({
         type: FETCH_PROFILE_DETAILS,
         payload: convertResToProfileDetails(details as resp_profile_details)
      }))
   })
   .catch(() => {
      return (dispatch({
         type: FETCH_PROFILE_DETAILS_FAILED,
      }))
   })
}

export const resetInvalidProfileResponse = (): AppThunk => async dispatch => {
   return (dispatch({
      type: RESET_PROFILE_INVALID_RESPONSE
   }))
}

export const fetchSearchInterests = (searchTerm: string, token: string): AppThunk => async dispatch => {
   let url = new URL(profileInterestSearchURL);
   const options = {
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }
   url.searchParams.append("q", searchTerm);
   fetch(url.toString(), options)
   .then(response => response.json())
   .then(interests => {
      return (dispatch({
         type: FETCH_SEARCH_INTERESTS,
         payload: (interests as resp_search_interests[]).map(convertResToInterest)
      }))
   })
}

export const addProfileInterest = (toAdd: string, token: string): AppThunk => async dispatch => {
   const options = {
      method: "POST",
      headers: {
         "Authorization": `Bearer ${token}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interest: toAdd }),
   }
   fetch(profileInterestAddURL, options)
   .then(status => {
      return (dispatch({
         type: ADD_PROFILE_INTEREST,
         status: status,
         payload: toAdd
      }))
   })
   // TODO: Add catch to invalid token, status code 403
   // .catch(() => {
   //    return(dispatch({
   //       type: FETCH_PROFILE_DETAILS_FAILED,
   //    }))
   // })
}

export const removeProfileInterest = (toRemove: string, token: string): AppThunk => async dispatch => {
   const options = {
      method: "POST",
      headers: {
         "Authorization": `Bearer ${token}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interest: toRemove })
   }
   fetch(profileInterestDeleteURL, options)
   .then(status => {
      return (dispatch({
         type: REMOVE_PROFILE_INTEREST,
         status: status,
         payload: toRemove
      }))
   })
   // TODO: Add catch to invalid token, status code 403
   // .catch(() => {
   //    return(dispatch({
   //       type: FETCH_PROFILE_DETAILS_FAILED,
   //    }))
   // })
}
