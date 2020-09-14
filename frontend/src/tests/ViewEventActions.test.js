import * as actions from '../data/actions/viewEvent/viewEventActions'
import * as types from '../data/actions/viewEvent/viewEventTypes'
import { viewEventReducer } from '../data/reducers/viewEventReducer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import { blankEventDetails, convertResToEventDetails } from '../constants/types'
import { ViewEventState } from '../data/types/stateTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const dummy_details_resp = { "event_id": "1", "event_name": "DoCSoc - Introduction to Vim", "start_datetime": "2020-04-27T10:00:00.000Z", 
"end_datetime": "2020-04-27T11:30:00.000Z", "location": "Huxley 301", 
"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut tellus sed orci tincidunt sollicitudin venenatis nec velit. Integer at aliquet mi. In hac habitasse platea dictumst. Nunc imperdiet porttitor molestie. Suspendisse pulvinar, augue sed cursus pellentesque, orci risus pellentesque enim, id pulvinar lacus lorem eu dui. Donec sit amet venenatis odio. Pellentesque ut augue efficitur, tempus diam ac, aliquam leo. Pellentesque pharetra rutrum ligula, quis feugiat augue sodales eu. Etiam sollicitudin libero at ex pretium maximus. Ut ac blandit ex. Integer sed iaculis sapien. Sed aliquam mi eget eros rutrum, in dapibus ipsum tincidunt. Etiam euismod convallis nunc at vestibulum. Integer nisl lorem, tempor et neque at, faucibus mattis ligula. Pellentesque luctus purus mauris, nec accumsan ante tincidunt ut.", 
"event_image_src": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Vimlogo.svg", "tags": ["docsoc", "vim"], 
"same_society_events": [{ "event_id": "3", "event_name": "DoCSoc Games Night", "start_datetime": "2020-05-28T17:00:00.000Z", "end_datetime": "2020-05-28T19:30:00.000Z", "location": "Huxley 211", "event_image_src": "https://upload.wikimedia.org/wikipedia/commons/5/58/AcetoFive.JPG", "tags": ["docsoc", "games", "board games", "card games"], 
"society": { "society_id": "1", "society_name": "Department of Computing Society", "society_image_src": "https://d33wubrfki0l68.cloudfront.net/ae969c99f655993c0c12a272626abba129e3b112/adbf3/img/imperial-docsoc-logo.png", "colour": "343deb", "short_name": "DoCSoc" } }, { "event_id": "5", "event_name": "Intro to Labs", "start_datetime": "2020-09-23T13:00:00.000Z", "end_datetime": "2020-09-23T15:00:00.000Z", "location": "Huxley 219", "event_image_src": "https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/IMG_20151110_122250365--tojpeg_1447160413584_x2.jpg", "tags": ["docsoc", "introduction", "welcome", "social"], "society": { "society_id": "1", "society_name": "Department of Computing Society", "society_image_src": "https://d33wubrfki0l68.cloudfront.net/ae969c99f655993c0c12a272626abba129e3b112/adbf3/img/imperial-docsoc-logo.png", "colour": "343deb", "short_name": "DoCSoc" } }, { "event_id": "6", "event_name": "Intro to Python", "start_datetime": "2020-05-26T16:00:00.000Z", "end_datetime": "2020-05-26T18:00:00.000Z", "location": "Clore", "event_image_src": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Python_logo_and_wordmark.svg", "tags": ["docsoc", "introduction", "python", "food"], "society": { "society_id": "1", "society_name": "Department of Computing Society", "society_image_src": "https://d33wubrfki0l68.cloudfront.net/ae969c99f655993c0c12a272626abba129e3b112/adbf3/img/imperial-docsoc-logo.png", "colour": "343deb", "short_name": "DoCSoc" } }], "society": { "society_id": "1", "society_name": "Department of Computing Society", "society_image_src": "https://d33wubrfki0l68.cloudfront.net/ae969c99f655993c0c12a272626abba129e3b112/adbf3/img/imperial-docsoc-logo.png", "colour": "343deb", "short_name": "DoCSoc" }, "resources": [{ "display_name": "pika.jpg", "bucket_key": "f936a5d9d9016b8a81e16bd6a5cdc90ff7b25eaff865768addd33eca81a01c92" }, { "display_name": "booklet.pdf", "bucket_key": "dda5f354ac18ae8386d36154891bb03e76eefcefe45e5a7e6aaee530390b18a2" }], "going_status": -1, "similar_events": [], "posts": [] }

const dummy_event_details = convertResToEventDetails(dummy_details_resp);

const initialState = {
  event: blankEventDetails,
  eventsEvent: blankEventDetails,
  discoverEvent: blankEventDetails,
  loading: true
}


describe('View event actions', () => {
  it('should create an action to load a blank event detail', () => {
    const expectedAction = {
      type: types.LOAD_EVENTS_BLANK_EVENT_DETAILS,
    }
    expect(actions.loadBlankEvent("events")).toEqual(expectedAction)
  })
})

// describe('viewActions reducer', () => {
//   it('should return the initial state', () => {
//     expect(viewEventReducer(undefined, {})).toEqual(initialState);
//   })

//   it('should update the state with the new event details', () => {
//     expect(viewEventReducer(initialState, {type: types.LOAD_EVENT_DETAILS, payload: dummy_event_details}))
//     .toEqual({
//       event: dummy_event_details,
//       eventsEvent: blankEventDetails,
//       discoverEvent: blankEventDetails,
//       loading: false
//     });
//   })
// })

