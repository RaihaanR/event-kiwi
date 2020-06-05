const stagingURL = "https://staging.drp.social";
const productionURL = "https://endpoint.drp.social";

export const endpointURL = stagingURL;

export const calendarEventsURL = `${endpointURL}/calendar`;

export const discoverEventCardURL = `${endpointURL}/events/cards/all`;
export const discoverSeachEventCardURL = `${endpointURL}/events/search`;
export const discoverSearchSocietyCardURL = `${endpointURL}/societies/search`;

export const followSocietyURL = (id: string) => `${endpointURL}/societies/follow/${id}`;
export const unfollowSocietyURL = (id: string) => `${endpointURL}/societies/unfollow/${id}`;

export const eventDetailsURL = (id: string) => `${endpointURL}/events/details/${id}`;
export const eventResourcesURL = `${endpointURL}/events/resources/`;
export const resourceDownloadURL = (id: string) => `${productionURL}/file/get/${id}`;

export const profileDetailsURL = `${endpointURL}/profile/all`;
export const profileInterestSearchURL = `${endpointURL}/profile/interests/search`;
export const profileInterestAddURL = `${endpointURL}/profile/interests/add`;
export const profileInterestDeleteURL = `${endpointURL}/profile/interests/delete`;

export const authEndpoint = `${endpointURL}/auth/new/`;
export const deAuthEndpoint = `${endpointURL}/auth/end/`;

export const goingToEventEndpoint = (id: string) =>  `${endpointURL}/events/going/${id}`;
export const interestedInEventEndpoint = (id: string) =>  `${endpointURL}/events/interested/${id}`;
export const notGoingToEventEndpoint = (id: string) =>  `${endpointURL}/events/none/${id}`;

export const eventPostsEndpoint = (eventId: string, lastPostId: string) => {
 return `${endpointURL}/events/posts/${eventId}/${lastPostId}/`
}