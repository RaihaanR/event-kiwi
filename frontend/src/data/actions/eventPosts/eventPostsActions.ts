import { AppThunk } from "../../types/dataInterfaces"
import { eventPostsEndpoint, addEventPostEndpoint, deleteEventPostEndpoint } from "../../../constants/endpoints"
import { GET_EVENT_POSTS, ADD_EVENT_POST, DELETE_EVENT_POST } from "./eventPostsTypes"
import { convertResToEventPosts, convertResToPost } from "../../../constants/types"



export const loadEventPosts = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(eventPostsEndpoint(id, "0"), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => convertResToEventPosts(data))
      .then(posts => (dispatch({
         type: GET_EVENT_POSTS,
         payload: {
            eventId: id,
            posts: posts.posts
         }
      })
      ))
}

export const addEventPost = (eventId: string, content: string, userToken: string): AppThunk => async dispatch => {
   fetch(addEventPostEndpoint(eventId), {
      method: 'post',
      body: JSON.stringify({ content: content }),
      headers: { 'Authorization': `Bearer ${userToken}`, 'Content-Type': 'application/json' }
   })
      .then(res => res.json())
      .then(data => convertResToPost(data.body))
      .then(post => (dispatch({
         type: ADD_EVENT_POST,
         payload: {
            eventId: eventId,
            post: post
         }
      })))
}

export const deleteEventPost = (postId: string, eventId: string, userToken: string): AppThunk => async dispatch => {
   fetch(deleteEventPostEndpoint(postId), {
      method: 'get',
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => {
         if (!(data.body as string).includes("ERROR")) {
            return dispatch({
               type: DELETE_EVENT_POST,
               payload: {
                  eventId: eventId,
                  postId: postId
               }
            })
         }
      })
}