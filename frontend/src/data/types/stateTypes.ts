import { EventCardDetails, Post, ProfileDetails, EventDetails, SocietyCard, CalendarEvent, InterestDetails, EventIdAndPosts } from "../../constants/types";

import { UserProfile } from "./dataInterfaces";
import { resp_resource } from "../../constants/RequestInterfaces";

export interface SocietyCardState {
   societies: SocietyCard[]
}

export interface EventCardState {
   events: EventCardDetails[],
   moreResults: boolean,
   isTagSearch: boolean,
   tagName: string
}

export interface ViewEventState {
   events: EventDetails[],
   loading: boolean
}

export interface EventPostsState {
   posts: EventIdAndPosts[]
}

export interface EventEditState {
   event: EventDetails
}

export interface UserState {
   loading: boolean,
   isLoggedIn: boolean,
   userToken: string,
   profile: UserProfile,
   isSoc: boolean
}

export interface CalendarEventsState {
   events: CalendarEvent[];
}

export interface ProfileDetailsState {
   profileDetails: ProfileDetails,
   invalidResponse: boolean
}

export interface interestSearchState {
   interests: InterestDetails[]
}

export interface ResourceManagementState {
   resources: resp_resource[]
}

export interface SearchFiltersState {
   includePast: boolean,
   useStart: boolean,
   start: Date,
   useEnd: boolean,
   end: Date
 }