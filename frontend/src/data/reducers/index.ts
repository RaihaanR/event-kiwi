import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";
import { userReducer } from "./userReducer";
import { calEventReducer } from "./calendarReducer";
import { profileDetailsReducer } from "./profileReducer";
import { viewEventReducer } from "./viewEventReducer";
import { eventPostReducer } from "./eventPostsReducer";
import { societyCardsReducer } from "./societyCardsReducer";
import { interestSearchReducer } from "./interestSearchReducer";
import { resourceManagementReducer } from "./resourceManagementReducer";
import { eventEditReducer } from "./eventEditReducer";
import { searchFilterReducer } from "./searchFilterReducer";

export const rootReducer = combineReducers({
   societyCards: societyCardsReducer,
   eventCards: eventCardsReducer,
   searchFilters: searchFilterReducer,
   userDetails: userReducer,
   calEvents: calEventReducer,
   viewEvent: viewEventReducer,
   eventPosts: eventPostReducer,
   profileDetails: profileDetailsReducer,
   interestSearch: interestSearchReducer,
   resourceManagement: resourceManagementReducer,
   editedEvent: eventEditReducer
});

export type RootState = ReturnType<typeof rootReducer>;
