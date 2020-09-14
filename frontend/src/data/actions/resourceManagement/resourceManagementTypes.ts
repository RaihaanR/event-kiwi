import { resp_resource } from "../../../constants/RequestInterfaces";

export const GET_SOC_RESOURCES = "GET_SOC_RESOURCES";


interface GetSocResourcesAction {
   type: typeof GET_SOC_RESOURCES,
   payload: resp_resource[]
}


export type ResourceManagementType = GetSocResourcesAction;
