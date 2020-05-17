import { createSelector } from 'reselect'

const selectSearch = (state) => state.search

export const selectSearchedData = createSelector([selectSearch], (search) =>
  search.searchedData ? search.searchedData : []
)

export const selectFilterDisplayName = createSelector(
  [selectSearchedData],
  (searchedData) => {
    if (searchedData.length !== 0) {
      return searchedData.map((item) => {
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
          id: item.place_id,
        }
      })
    } else {
      return ['No matching banks found']
    }
  }
)
