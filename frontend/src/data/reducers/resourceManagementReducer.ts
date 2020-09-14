import { ResourceManagementState } from "../types/stateTypes";
import { ResourceManagementType, GET_SOC_RESOURCES } from "../actions/resourceManagement/resourceManagementTypes";

const initialState: ResourceManagementState = {
   resources: []
}

export function resourceManagementReducer(state = initialState, action: ResourceManagementType): ResourceManagementState {
   switch(action.type) {
      case GET_SOC_RESOURCES:
         return {
            ...state,
            resources: action.payload
         }
      default:
         return state;
   }
}