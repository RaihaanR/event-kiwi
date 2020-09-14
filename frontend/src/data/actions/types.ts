import { EventCardDetails, ProfileDetails, EventDetails, Society, SocietyCard, Post, CalendarEvent, InterestDetails, SearchFilters, SocietyBasic } from "../../constants/types";
import { AuthResponse } from "../types/dataInterfaces";
import { UserState } from "../types/stateTypes";

export const FETCH_SEARCH_SOCIETY_CARDS = "FETCH_SEARCH_SOCIETY_CARDS";
export const FOLLOW_SOCIETY = "FOLLOW_SOCIETY";
export const UNFOLLOW_SOCIETY = "UNFOLLOW_SOCIETY"

export interface FetchSearchSocietyCardsAction {
   type: typeof FETCH_SEARCH_SOCIETY_CARDS,
   payload: SocietyCard[]
}

export interface followSocietyAction {
   type: typeof FOLLOW_SOCIETY,
   payload: string
}

export interface unfollowSocietyAction {
   type: typeof UNFOLLOW_SOCIETY,
   payload: string
}

export type FetchSocietyType = FetchSearchSocietyCardsAction | followSocietyAction | unfollowSocietyAction;


export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";
export const FETCH_MORE_EVENT_CARDS = "FETCH_MORE_EVENT_CARDS";
export const FETCH_SEARCH_EVENT_CARDS = "FETCH_SEARCH_EVENT_CARDS";
export const FETCH_MORE_SEARCH_EVENT_CARDS = "FETCH_MORE_SEARCH_EVENT_CARDS";
export const FETCH_TAG_EVENT_CARDS = "FETCH_TAG_EVENT_CARDS";
export const FETCH_MORE_TAG_EVENT_CARDS = "FETCH_MORE_TAG_EVENT_CARDS";

export interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[],
   count: number
}

export interface FetchMoreEventCardsAction {
   type: typeof FETCH_MORE_EVENT_CARDS,
   payload: EventCardDetails[],
   count: number
}

export interface FetchSearchEventCardsAction {
   type: typeof FETCH_SEARCH_EVENT_CARDS,
   payload: EventCardDetails[],
   count: number
}

export interface FetchMoreSearchEventCardsAction {
   type: typeof FETCH_MORE_SEARCH_EVENT_CARDS,
   payload: EventCardDetails[],
   count: number
}

export interface FetchTagEventCardsAction {
   type: typeof FETCH_TAG_EVENT_CARDS,
   payload: EventCardDetails[],
   tag: string,
   count: number
}

export interface FetchMoreTagEventCardsAction {
   type: typeof FETCH_MORE_TAG_EVENT_CARDS,
   payload: EventCardDetails[],
   tag: string,
   count: number
}

export type FetchEventType = FetchEventCardsAction | FetchMoreEventCardsAction | FetchSearchEventCardsAction | FetchMoreSearchEventCardsAction | FetchTagEventCardsAction | FetchMoreTagEventCardsAction;


export const UPDATE_SEARCH_FILTERS = "UPDATE_SEARCH_FILTERS";

export interface UpdateSearchFiltersAction {
   type: typeof UPDATE_SEARCH_FILTERS,
   payload: SearchFilters
}

export type SearchFiltersType = UpdateSearchFiltersAction;


export const FETCH_CAL_EVENTS = "FETCH_CAL_EVENTS";

export interface FetchCalendarEventsAction {
   type: typeof FETCH_CAL_EVENTS,
   payload: CalendarEvent[]
}

export type FetchCalType = FetchCalendarEventsAction;


export const FETCH_PROFILE_DETAILS = "FETCH_PROFILE_DETAILS"
export const FETCH_PROFILE_DETAILS_FAILED = "FETCH_PROFILE_DETAILS_FAILED"
export const RESET_PROFILE_INVALID_RESPONSE = "RESET_PROFILE_INVALID_RESPONSE"
export const ADD_PROFILE_INTEREST = "ADD_PROFILE_INTEREST"
export const REMOVE_PROFILE_INTEREST = "REMOVE_PROFILE_INTEREST"
export const SOCIETY_UNFOLLOWED = "SOCIETY_UNFOLLOWED"

export interface FetchProfileDetailsAction {
   type: typeof FETCH_PROFILE_DETAILS,
   payload: ProfileDetails
}

export interface FetchProfileDetailsFailedAction {
   type: typeof FETCH_PROFILE_DETAILS_FAILED,
}

export interface ResetProfileInvalidResponseAction {
   type: typeof RESET_PROFILE_INVALID_RESPONSE,
}

export interface AddProfileInterestAction {
   type: typeof ADD_PROFILE_INTEREST,
   status: string,
   payload: string
}

export interface RemoveProfileInterestAction {
   type: typeof REMOVE_PROFILE_INTEREST,
   status: string,
   payload: string
}

export interface SocietyUnollowedAction {
   type: typeof SOCIETY_UNFOLLOWED,
   payload: string
}

export type FetchProfileType =  FetchProfileDetailsAction 
                             |  FetchProfileDetailsFailedAction 
                             | ResetProfileInvalidResponseAction 
                             | FetchSearchInterestsAction 
                             | AddProfileInterestAction 
                             | RemoveProfileInterestAction
                             | SocietyUnollowedAction;


export const FETCH_SEARCH_INTERESTS = "FETCH_SEARCH_INTERESTS"

export interface FetchSearchInterestsAction {
   type: typeof FETCH_SEARCH_INTERESTS,
   payload: InterestDetails[]
}

export type FetchInterestType = FetchSearchInterestsAction;


export const USER_LOGIN = "USER_LOGIN";
export const LOAD_USER_DATA = "LOAD_USER_DATA";
export const USER_LOGOUT = "USER_LOGOUT";
export const INVALID_USER = "INVALID_USER";

interface LoginAction {
   type: typeof USER_LOGIN,
   payload: AuthResponse
}

interface LogoutAction {
   type: typeof USER_LOGOUT
}

interface InvalidUserAction {
   type: typeof INVALID_USER
}

interface LoadUserDataAction {
   type: typeof LOAD_USER_DATA,
   payload: UserState
}

export type UserType = LoginAction | LoadUserDataAction | LogoutAction | InvalidUserAction;

export const LOAD_EDIT_EVENT = "LOAD_EDIT_EVENT";
export const CREATE_NEW_EVENT = "CREATE_NEW_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const UPLOAD_EVENT_IMAGE = "UPLOAD_EVENT_IMAGE";

interface LoadEditEventAction {
   type: typeof LOAD_EDIT_EVENT,
   payload: EventDetails
}

interface CreateNewEventAction {
   type: typeof CREATE_NEW_EVENT,
   payload: EventDetails
}

interface UpdateEventAction {
   type: typeof UPDATE_EVENT,
   payload: EventDetails
}

interface DeleteEventAction {
   type: typeof DELETE_EVENT,
   status: string
}

interface UploadImageAction {
   type: typeof UPLOAD_EVENT_IMAGE,
   payload: string
}

export type EventEditType = LoadEditEventAction | CreateNewEventAction | UpdateEventAction | DeleteEventAction | UploadImageAction;

export const GET_EVENT_POSTS = "GET_EVENT_POSTS";
export const GET_DISCOVER_EVENT_POSTS = "GET_DISCOVER_EVENT_POSTS";
export const GET_EVENTS_EVENT_POSTS = "GET_EVENTS_EVENT_POSTS";

interface GetEventPostsAction {
   type: typeof GET_EVENT_POSTS,
   payload: Post[]
}

interface GetDiscoverEventPostsAction {
   type: typeof GET_DISCOVER_EVENT_POSTS,
   payload: Post[]
}

interface GetEventsEventPostsAction {
   type: typeof GET_EVENTS_EVENT_POSTS,
   payload: Post[]
}

export type EventPostType = GetEventPostsAction | GetDiscoverEventPostsAction | GetEventsEventPostsAction;
