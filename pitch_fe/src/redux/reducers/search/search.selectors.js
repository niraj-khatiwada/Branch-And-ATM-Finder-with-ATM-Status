import { createSelector } from 'reselect'
import { selectSelectedLocationDetail } from '../location/location.selectors'

const selectSearch = (state) => state.search

export const selectIsSearchFetching = createSelector(
  [selectSearch],
  (search) => search.isSearchFetching
)

export const selectSearchedData = createSelector(
  [selectSearch],
  (search) => search.searchedData
)
export const selectZIndex = createSelector(
  [selectSearch],
  (search) => search.mapZIndex
)

export const selectFilterDisplayName = createSelector(
  [selectSearchedData],
  (searchedData) => {
    return searchedData !== null
      ? searchedData.length !== 0
        ? searchedData.map((item) => {
            const address = item.address
            let empty = [
              address.bank || address.atm || '',
              address.road || '',
              address.suburb || '',
              address.hamlet || '',
              address.neighbourhood || '',
              address.city || '',
            ]
            return {
              mAddress: empty
                .filter((item) => {
                  if (item !== '') {
                    return item
                  }
                })
                .join(', '),
              ...item,
            }
          })
        : null
      : null
  }
)

export const selectNoDataFound = createSelector(
  [selectSearch],
  (search) => search.noDataFound
)

export const selectStoreToDB = createSelector(
  [selectSearch],
  (search) => search.storeToDB
)

export const selectDBResults = createSelector(
  [selectStoreToDB],
  (storeToDB) => storeToDB.storeToDBResults
)

export const selectSelectedLocationDBID = createSelector(
  [selectDBResults, selectSelectedLocationDetail],
  (storeToDBResults, selectedLocationDetail) => {
    if (storeToDBResults) {
      const snackbarItem = storeToDBResults.find(
        (item) => parseInt(item.place_id) === selectedLocationDetail.place_id
      )
      console.log(snackbarItem)
      return snackbarItem ? snackbarItem.id : null
    } else {
      return null
    }
  }
)

export const selectIsStoreToDBFetching = createSelector(
  [selectStoreToDB],
  (storeToDB) => storeToDB.isStoreToDBFetching
)
