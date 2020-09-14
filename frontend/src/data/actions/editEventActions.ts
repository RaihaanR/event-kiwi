import { AppThunk } from "../types/dataInterfaces";
import { createNewEventURL, updateEventURL, eventDetailsURL, deleteEventURL, uploadImageURL, endpointImgSrc } from "../../constants/endpoints";
import { CREATE_NEW_EVENT, LOAD_EDIT_EVENT, UPDATE_EVENT, DELETE_EVENT, UPLOAD_EVENT_IMAGE } from "./types";
import { convertResToEventDetails, EventDetails, blankEventDetails } from "../../constants/types";
import { resp_event_details, resp_image_upload } from "../../constants/RequestInterfaces";
import { uploadFilesAndAttachToevent } from "./resourceManagement/resourceManagementActions";
import { fetchCalEvents } from "./actions";
import { LOAD_EVENT_DETAILS } from "./viewEvent/viewEventTypes";

export interface NewEventDetails {
  name: string,
  location: string,
  desc: string,
  privacy: number,
  tags: string[],
  start: string,
  end: string,
  img: string
}

export const editEventLoad = (id: string, token: string): AppThunk => async dispatch => {
  if (id === "") {
    return (dispatch({
      type: LOAD_EDIT_EVENT,
      payload: blankEventDetails
    }))
  }

  const options = {
    method: "get",
    headers: { 'Authorization': `Bearer ${token}` }
  }

  fetch(eventDetailsURL(id), options)
    .then(res => res.json())
    .then(data => convertResToEventDetails(data))
    .then(details => {
      return (dispatch({
        type: LOAD_EDIT_EVENT,
        payload: details
      }))
    })
}

export const createNewEvent = (event: NewEventDetails, files: FileList, token: string, setCompleted: (completed: boolean) => void): AppThunk => async dispatch => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }

  var eventDetails: EventDetails = blankEventDetails;

  fetch(createNewEventURL, options)
    .then(response => response.json())
    .then(details => {
      setCompleted(details.status === 1);
      eventDetails = convertResToEventDetails(details.body as resp_event_details);
    })
    .then(() => dispatch({
      type: CREATE_NEW_EVENT,
      payload: eventDetails
    }))
    .then(() => dispatch(uploadFilesAndAttachToevent(eventDetails.id, files, token)))
    .then(() => dispatch(fetchCalEvents(null, token)))
}

export const updateEvent = (event: NewEventDetails, files: FileList, id: string, token: string, setCompleted: (completed: boolean) => void): AppThunk =>
  async dispatch => {
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    }

    var eventDetails: EventDetails = blankEventDetails;

    fetch(updateEventURL(id), options)
      .then(response => response.json())
      .then(details => {
        setCompleted(details.status === 1);
        eventDetails = convertResToEventDetails(details.body as resp_event_details);
      })
      .then(() => dispatch({
        type: UPDATE_EVENT,
        payload: eventDetails
      }))
      .then(() => dispatch(uploadFilesAndAttachToevent(eventDetails.id, files, token)))
      .then(() => dispatch({
        type: LOAD_EVENT_DETAILS,
        payload: eventDetails
      }))
      .then(() => dispatch(fetchCalEvents(null, token)))
  }

export const deleteEvent = (id: string, token: string, setCompleted: (complete: boolean) => void): AppThunk => async dispatch => {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  }
  fetch(deleteEventURL(id), options)
    .then(status => {
      setCompleted(true);
      return (dispatch({
        type: DELETE_EVENT,
        status: status
      }))
    })
    .then(() => dispatch(fetchCalEvents(null, token)))
}

export const uploadImage = (image: File, token: string, setImage: (src: string) => void): AppThunk => async dispatch => {
  const form = new FormData();
  form.append("upload", image);
  const options = {
    method: "POST",
    body: form,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  }
  fetch(uploadImageURL, options)
    .then(response => response.json())
    .then(data => data as resp_image_upload)
    .then(details => {
      if (details.status == 1) {
        setImage(endpointImgSrc(details.body));
        return (dispatch({
          type: UPLOAD_EVENT_IMAGE,
          payload: endpointImgSrc(details.body)
        }))
      }
    })
}