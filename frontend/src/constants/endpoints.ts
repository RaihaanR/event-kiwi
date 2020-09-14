const stagingURL = "https://staging.drp.social";
const productionURL = "https://endpoint.drp.social";

export const endpointURL = productionURL;

export const calendarEventsURL = `${endpointURL}/calendar`;

export const discoverEventCardURL = `${endpointURL}/events/cards/all`;
export const discoverSearchEventCardURL = `${endpointURL}/events/search`;
export const discoverSearchSocietyCardURL = `${endpointURL}/societies/search`;

export const followSocietyURL = (id: string) => `${endpointURL}/societies/follow/${id}`;
export const unfollowSocietyURL = (id: string) => `${endpointURL}/societies/unfollow/${id}`;

export const createNewEventURL = `${endpointURL}/events/create`;
export const updateEventURL = (id: string) => `${endpointURL}/events/edit/${id}`;
export const deleteEventURL = (id: string) => `${endpointURL}/events/delete/${id}`;
export const uploadImageURL = `${endpointURL}/img/upload`;
export const endpointImgSrc = (key: string) => `${endpointURL}/img/get/${key}`

export const eventDetailsURL = (id: string) => `${endpointURL}/events/details/${id}`;
export const eventResourcesURL = `${endpointURL}/events/resources/`;
export const resourceDownloadURL = (id: string) => `${productionURL}/file/get/${id}`;

export const profileDetailsURL = `${endpointURL}/profile/all`;
export const profileInterestSearchURL = `${endpointURL}/profile/interests/search`;
export const profileInterestAddURL = `${endpointURL}/profile/interests/add`;
export const profileInterestDeleteURL = `${endpointURL}/profile/interests/delete`;

export const authEndpoint = `${endpointURL}/auth/new/`;
export const deAuthEndpoint = `${endpointURL}/auth/end/`;
export const deAuthAllEndpoint = `${endpointURL}/auth/end/all`;
export const validAuthEndpoint = `${endpointURL}/auth/valid`;

export const goingToEventEndpoint = (id: string) => `${endpointURL}/events/going/${id}`;
export const interestedInEventEndpoint = (id: string) => `${endpointURL}/events/interested/${id}`;
export const notGoingToEventEndpoint = (id: string) => `${endpointURL}/events/none/${id}`;

export const eventPostsEndpoint = (eventId: string, lastPostId: string) =>
   `${endpointURL}/events/posts/${eventId}/${lastPostId}/`;

export const addEventPostEndpoint = (eventId: string) =>
   `${endpointURL}/events/posts/${eventId}/new/`;

export const deleteEventPostEndpoint = (postId: string) =>
   `${endpointURL}/events/posts/delete/${postId}/`;

export const socResourcesEndpoint = `${endpointURL}/file/list`;
export const socResourceUploadEndpoint = `${endpointURL}/file/upload`;
export const socResourceDeleteEndpoint = (resourceId: string) =>
   `${endpointURL}/file/delete/${resourceId}`;
export const socAttachResourcesToEventEndpoint = (eventId: string) =>
   `${endpointURL}/file/add/${eventId}`;
export const socRemoveResourcesFromEventEndpoint = (eventId: string) =>
   `${endpointURL}/file/remove/${eventId}`;

