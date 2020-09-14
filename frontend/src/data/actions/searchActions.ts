import { UPDATE_SEARCH_FILTERS, SearchFiltersType } from "./types"
import { SearchFilters } from "../../constants/types"

export const updateSearchFilters = (filters: SearchFilters): SearchFiltersType => {
  return ({
    type: UPDATE_SEARCH_FILTERS,
    payload: filters
  })
}