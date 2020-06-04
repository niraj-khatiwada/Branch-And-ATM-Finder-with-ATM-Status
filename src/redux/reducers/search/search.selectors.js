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
              address.amenity || '',
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
      return snackbarItem
        ? { id: snackbarItem.id, type: selectedLocationDetail.type }
        : null
    } else {
      return null
    }
  }
)

export const selectIsStoreToDBFetching = createSelector(
  [selectStoreToDB],
  (storeToDB) => storeToDB.isStoreToDBFetching
)

export const selectDistance = createSelector(
  [selectFilterDisplayName, selectSelectedLocationDetail],
  (searchedData, selectedLocationDetail) => {
    if (searchedData !== null && searchedData.length !== 0) {
      const distanceArray = searchedData
        .filter((i) => i.place_id !== selectedLocationDetail.place_id)
        .map((item) => ({
          distance:
            Math.sqrt(
              (parseFloat(selectedLocationDetail.lon) - parseFloat(item.lon)) **
                2 +
                (parseFloat(selectedLocationDetail.lat) -
                  parseFloat(item.lat)) **
                  2
            ) * 100,
          data: { ...item },
        }))
      const sortedDistanceArray = distanceArray.sort(
        (a, b) => a.distance - b.distance
      )

      return sortedDistanceArray
    } else {
      return null
    }
  }
)
