import { AppThunk } from "../../types/dataInterfaces"
import { GET_SOC_RESOURCES } from "./resourceManagementTypes"
import { resp_resource } from "../../../constants/RequestInterfaces"
import { socResourcesEndpoint, socResourceUploadEndpoint, socResourceDeleteEndpoint, socAttachResourcesToEventEndpoint, socRemoveResourcesFromEventEndpoint } from "../../../constants/endpoints"
import { convertResToEventDetails } from "../../../constants/types"
import { LOAD_EVENT_DETAILS } from "../viewEvent/viewEventTypes"
import { key } from "ionicons/icons"

export const loadSocResources = (userToken: string): AppThunk => async dispatch => {
   fetch(socResourcesEndpoint, {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => data as resp_resource[])
      .then(resources => (dispatch({
         type: GET_SOC_RESOURCES,
         payload: resources
      })))
}


export const uploadFile = (files: FileList, userToken: string): AppThunk => async dispatch => {
   const form = new FormData();

   for (let i = 0; i < files.length; i++) {
      form.append("upload", files.item(i)!)
   }

   fetch(socResourceUploadEndpoint, {
      method: 'post',
      body: form,
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => console.log(res))
      .then(() => dispatch(loadSocResources(userToken)))
}

export const deleteFile = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(socResourceDeleteEndpoint(id), {
      method: 'get',
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => console.log(res))
      .then(() => dispatch(loadSocResources(userToken)))
}

export const attachResourcesToEvent = (eventId: string, resources: string[], userToken: string): AppThunk => async dispatch => {
   fetch(socAttachResourcesToEventEndpoint(eventId), {
      method: 'post',
      body: JSON.stringify({ files: resources }),
      headers: { 'Authorization': `Bearer ${userToken}`, 'Content-Type': 'application/json' }
   })
      .then(res => res.json())
      .then(data => convertResToEventDetails(data.body))
      .then(details => dispatch({
         type: LOAD_EVENT_DETAILS,
         payload: details
      }))
      .then(() => dispatch(loadSocResources(userToken)))
}

export const removeResourceFromEvent = (eventId: string, resource: string, userToken: string): AppThunk => async dispatch => {
   fetch(socRemoveResourcesFromEventEndpoint(eventId), {
      method: 'post',
      body: JSON.stringify({ files: [resource] }),
      headers: { 'Authorization': `Bearer ${userToken}`, 'Content-Type': 'application/json' }
   })
      .then(res => res.json())
      .then(data => convertResToEventDetails(data.body))
      .then(details => dispatch({
         type: LOAD_EVENT_DETAILS,
         payload: details
      }))
      .then(() => dispatch(loadSocResources(userToken)))
}

export const uploadFilesAndAttachToevent = (eventId: string, files: FileList, userToken: string): AppThunk => async dispatch => {
   const form = new FormData();

   for (let i = 0; i < files.length; i++) {
      form.append("upload", files.item(i)!)
   }

   fetch(socResourceUploadEndpoint, {
      method: 'post',
      body: form,
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => {
         let keys: string[] = [];
         (data as {key:string, name: string}[]).forEach(element => {
            keys.push(element.key)
         });
         return keys;
      })
      .then(keys => dispatch(attachResourcesToEvent(eventId, keys, userToken)))
}