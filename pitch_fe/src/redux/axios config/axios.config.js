import axios from 'axios'

// Search Open Street map
export const openStreetSearch = async (searchQuery) => {
  return await axios({
    method: 'get',
    url: 'https://nominatim.openstreetmap.org/',
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

const dbURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/branch/'
    : ''

// Store to DB
export const storeBranchToDB = async (searchedData) => {
  let breakLoop = []
  let idArray = []
  for (let item of searchedData) {
    const popped = breakLoop.pop()
    if (popped === 404 || popped === 400) {
      break
    }
    await axios({
      method: 'post',
      url: dbURL,
      data: {
        bank: item.address.bank.toLowerCase(),
        name: item.display_name,
        place_id: item.place_id,
        lat: item.lat,
        lon: item.lon,
        district_name: item.address.county,
        city_name: item.address.city,
        postal_code: item.address.postcode,
        street_name: item.address.road || item.address.footway,
        neighbourhood: item.address.neighbourhood,
        building_number: item.address.house_number,
        province: item.address.region,
        municipality: item.address.municipality,
        namedetails: item.namedetails,
        extra_tags: item.extratags,
      },
    })
      .then((res) => {
        idArray.push(res.data)
      })
      .catch((error) => {
        breakLoop.push(error.response.status)
        idArray.push(error.response.data)
      })
  }
  return idArray
}

export const fetchLocationDetailsFromDB = async (id) =>
  await axios({
    method: 'get',
    url: `${dbURL}${id}/`,
  })
