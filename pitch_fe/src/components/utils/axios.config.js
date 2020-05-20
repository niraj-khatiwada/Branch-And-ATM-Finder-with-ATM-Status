import axios from 'axios'

const openStreetURL =
  process.env.NODE_ENV === 'development'
    ? 'https://nominatim.openstreetmap.org/'
    : ''

export const openStreetSearch = async (searchQuery) => {
  return await axios({
    method: 'get',
    url: openStreetURL,
    params: {
      format: 'json',
      addressdetails: 1,
      polygon_svg: 1,
      limit: 50,
      countrycodes: 'np',
      namedetails: 1,
      viewbox: '85.279114, 27.667793, 85.370351, 27.74974',
      bounded: 1,
      extratags: 1,
      q: searchQuery,
    },
  })
}
