import { resp_event_post_organiser, resp_event_posts, resp_post, resp_resource, resp_event_details, resp_event_card_details, resp_profile_details, resp_society, resp_society_basic, resp_society_card, resp_calendar_event, resp_society_cal, resp_search_interests } from "./RequestInterfaces"
import { PRIVATE } from "./constants"


export interface ProfileDetails {
  firstname: string,
  lastname: string,
  email: string,
  societies: SocietyBasic[],
  interests: string[]
}

export interface Profile {
  id: string;
  name: string;
  imageSrc: string;
  shortName: string;
}

export interface Society extends Profile {
  colour: string;
}

export interface SocietyBasic {
  imgSrc: string,
  shortName: string,
  type: number,
  id: string
}

export interface SocietyCal {
  id: string,
  name: string,
  shortName: string,
  colour: string
}

export interface SocietyCard {
  id: string;
  name: string;
  imageSrc: string;
  shortName: string;
  colour: string;
  following: number;
  followers: number;
}

export const blankSociety = {
  id: "",
  name: "",
  imageSrc: "",
  shortName: "",
  colour: ""
}

export interface InterestDetails {
  name: string,
  numInterested: number
}

export interface EventCardDetails {
   id: string;
   name: string, 
   organiser: Society, 
   image: string, 
   location: string, 
   datetimeStart: Date,
   datetimeEnd: Date,
   tags: string[]
}

export interface EventDetails {
   id: string,
   name: string,
   organiser: Society,
   images: string[],
   location: string,
   datetimeStart: Date,
   datetimeEnd: Date,
   tags: string[],
   description: string,
   sameSocEvents: EventCardDetails[],
   similarEvents: EventCardDetails[],
   resources: Resource[],
   goingStatus: number,
   privacy: number
}

export interface CalendarEvent {
  id: string,
  datetimeStart: Date,
  datetimeEnd: Date,
  location: string,
  name: string,
  organiser: SocietyCal,
  status: number
}

export interface EventGroupByDate {
  date: Date,
  events: CalendarEvent[]
}

export const blankEventDetails = {
  id: "",
  name: "",
  organiser: blankSociety,
  images: ["https://static.drp.social/placeholder.png"],
  location: "",
  datetimeStart: new Date(),
  datetimeEnd: new Date(),
  tags: [],
  description: "",
  sameSocEvents: [],
  similarEvents: [],
  resources: [],
  posts: [],
  goingStatus: -1,
  privacy: PRIVATE
}

export interface SearchFilters {
  includePast: boolean,
  useStart: boolean,
  start: Date,
  useEnd: boolean,
  end: Date
}

export const blankFilters = {
  includePast: false,
  useStart: false,
  start: new Date(Date.now()),
  useEnd: false,
  end: new Date(Date.now())
}

export interface Resource {
   name: string,
   id: string
}

export interface Post {
  id: string,
  eventId: string,
  organiser: PostOrganiser,
  time: Date,
  body: string
}


export interface PostOrganiser {
  id: string,
  image: string,
  name: string,
  short: string
}

export const blankPostOrganiser: PostOrganiser = {
  id: "",
  image: "",
  name: "",
  short: ""
}

export const blankPost: Post = {
  id: "",
  eventId: "",
  organiser: blankPostOrganiser,
  body: "",
  time: new Date()
}



export interface EventIdAndPosts {
  eventId: string,
  posts: Post[]
}

export interface EventPosts {
  posts: Post[],
  last_id: string
}

export const convertResToPostOrganiser = (res: resp_event_post_organiser): PostOrganiser => ({
  id: res.id,
  image: res.image,
  name: res.name,
  short: res.short
 })

export const convertResToEventPosts = (res: resp_event_posts): EventPosts => ({
  last_id: res.last,
  posts: res.posts.map(convertResToPost)
})


export const convertResToPost = (res: resp_post): Post => ({
  id: res.id,
  eventId: res.event,
  organiser: convertResToPostOrganiser(res.organiser),
  time:  new Date(res.time),
  body: res.body
})

export const convertResToResource = (res: resp_resource): Resource => ({
  name: res.display_name,
  id: res.bucket_key
})

export const convertResToEventDetails = (res: resp_event_details): EventDetails => ({
  id: res.event_id,
  name: res.event_name,
  organiser: convertResToSoc(res.society as resp_society),
  images: [res.event_image_src],
  location: res.location,
  datetimeStart: new Date(res.start_datetime),
  datetimeEnd: new Date(res.end_datetime),
  tags: res.tags,
  description: res.description,
  sameSocEvents: res.same_society_events.map(convertResToEventCard),
  similarEvents: res.similar_events.map(convertResToEventCard),
  goingStatus: res.going_status,
  resources: res.resources.map(convertResToResource),
  privacy: res.privacy
 })


export const convertResToEventCard = (res: resp_event_card_details): EventCardDetails => ({
  id: res.event_id,
  name: res.event_name,
  organiser: convertResToSoc(res.society),
  image: res.event_image_src, 
  location: res.location, 
  datetimeStart: new Date(res.start_datetime),
  datetimeEnd: new Date(res.end_datetime),
  tags: res.tags
})

export const convertResToCalEvent = (res: resp_calendar_event): CalendarEvent => ({
  id: res.id,
  datetimeStart: new Date(res.start),
  datetimeEnd: new Date(res.end),
  location: res.location,
  name: res.name,
  organiser: convertResToSocCal(res.organiser),
  status: res.status
})


export const convertResToProfileDetails = (res: resp_profile_details): ProfileDetails => ({
  firstname: res.firstname,
  lastname: res.lastname,
  email: res.email,
  societies: res.societies.map(convertResToSocBasic),
  interests: res.interests
})

export const convertResToInterest = (res: resp_search_interests): InterestDetails => ({
  name: res.tag,
  numInterested: res.count
})

export const convertResToSoc = (res: resp_society): Society => ({
  id: res.society_id,
  name: res.society_name,
  colour: res.colour,
  shortName: res.short_name,
  imageSrc: res.society_image_src
})

export const convertResToSocBasic = (res: resp_society_basic): SocietyBasic => ({
  shortName: res.short_name,
  imgSrc: res.society_image_src,
  type: res.type,
  id: res.society_id
})

export const convertResToSocCard = (res: resp_society_card): SocietyCard => ({
  id: res.society_id,
  name: res.society_name,
  colour: res.colour,
  shortName: res.short_name,
  imageSrc: res.society_image_src,
  following: res.following,
  followers: parseInt(res.total_followers, 0)
})

export const convertResToSocCal = (res: resp_society_cal): SocietyCal => ({
  id: res.id,
  name: res.name,
  shortName: res.short,
  colour: `#${res.colour}`
})