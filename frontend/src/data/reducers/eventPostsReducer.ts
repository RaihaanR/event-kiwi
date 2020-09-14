import { GET_EVENT_POSTS, EventPostType, ADD_EVENT_POST, DELETE_EVENT_POST } from "../actions/eventPosts/eventPostsTypes";
import { EventPostsState } from "../types/stateTypes";

const initialState: EventPostsState = {
   posts: []
}

export function eventPostReducer(state = initialState, action: EventPostType): EventPostsState {
   switch (action.type) {
      case GET_EVENT_POSTS:
         const GET_EVENT_newEventPosts = state.posts.filter(ep => ep.eventId !== action.payload.eventId);
         GET_EVENT_newEventPosts.unshift(action.payload)
         return {
            ...state,
            posts: GET_EVENT_newEventPosts
         }

      case ADD_EVENT_POST:
         const ADD_EVENT_newEventPosts = state.posts.filter(ep => ep.eventId !== action.payload.eventId);
         const eventWithNewPost = state.posts.filter(ep => ep.eventId === action.payload.eventId)[0];
         eventWithNewPost.posts.unshift(action.payload.post)
         ADD_EVENT_newEventPosts.unshift(eventWithNewPost)
         return {
            ...state,
            posts: ADD_EVENT_newEventPosts
         }

      case DELETE_EVENT_POST:
         const DELETE_EVENT_newEventPosts = state.posts.filter(ep => ep.eventId !== action.payload.eventId);
         const eventWithDeletedPost = state.posts.filter(ep => ep.eventId === action.payload.eventId)[0];
         eventWithDeletedPost.posts = eventWithDeletedPost.posts.filter(p => p.id !== action.payload.postId);
         DELETE_EVENT_newEventPosts.unshift(eventWithDeletedPost);
         return {
            ...state,
            posts: DELETE_EVENT_newEventPosts
         }
      default:
         return state;

   }

}