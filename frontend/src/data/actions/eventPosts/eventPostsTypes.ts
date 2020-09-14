import { Post } from "../../../constants/types";

export const GET_EVENT_POSTS = "GET_EVENT_POSTS";
export const ADD_EVENT_POST = "ADD_EVENT_POST";
export const DELETE_EVENT_POST = "DELETE_EVENT_POST";

interface GetEventPostsAction {
   type: typeof GET_EVENT_POSTS,
   payload: {
      eventId: string,
      posts: Post[]
   }
}

interface AddEventPostsAction {
   type: typeof ADD_EVENT_POST,
   payload: {
      eventId: string,
      post: Post
   }
}

interface DeleteEventPostsAction {
   type: typeof DELETE_EVENT_POST,
   payload: {
      eventId: string,
      postId: string
   }
}

export type EventPostType = GetEventPostsAction | AddEventPostsAction | DeleteEventPostsAction;
