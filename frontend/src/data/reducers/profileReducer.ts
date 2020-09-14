import { ProfileDetailsState } from '../types/stateTypes'
import { FetchProfileType, REMOVE_PROFILE_INTEREST, FETCH_PROFILE_DETAILS, FETCH_PROFILE_DETAILS_FAILED, RESET_PROFILE_INVALID_RESPONSE, ADD_PROFILE_INTEREST, SOCIETY_UNFOLLOWED } from '../actions/types'

const initialProfileDetailsState: ProfileDetailsState = {
  profileDetails: {
    firstname: "",
    lastname: "",
    email: "",
    societies: [],
    interests: []
  },
  invalidResponse: false
};

export const profileDetailsReducer = (state = initialProfileDetailsState, action: FetchProfileType): ProfileDetailsState => {
  switch(action.type) {
    case FETCH_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload,
        invalidResponse: false
      }

    case FETCH_PROFILE_DETAILS_FAILED:
      return {
        ...state,
        invalidResponse: true
      }

    case RESET_PROFILE_INVALID_RESPONSE:
      return {
        ...state,
        invalidResponse: false
      }

    case ADD_PROFILE_INTEREST:
      if (!state.profileDetails.interests.includes(action.payload)) {
        state.profileDetails.interests.push(action.payload);
      }
      return state;

    case REMOVE_PROFILE_INTEREST:
      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          interests: state.profileDetails.interests.filter((intr) => (intr !== action.payload))
        }
      }
    
    case SOCIETY_UNFOLLOWED:
      const profileDetailsWithUnfollowedSociety = state.profileDetails;
      const socsWithoutUnfollowed = profileDetailsWithUnfollowedSociety.societies.filter(soc => soc.id !== action.payload);
      profileDetailsWithUnfollowedSociety.societies = socsWithoutUnfollowed;
      return {
        ...state,
        profileDetails: profileDetailsWithUnfollowedSociety
      }
    default:
      return state;
  }
}
