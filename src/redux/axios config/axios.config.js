import axios from 'axios'

const getCookie = () => {
  let cookie
  if (document.cookie && document.cookie !== '') {
    cookie = document.cookie.replace('csrftoken=', '')
    return cookie
  }
}

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

const branchURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/branch/'
    : 'https://pitch-version1.herokuapp.com/api/branch/'

const atmURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/annon-atm/'
    : 'https://pitch-version1.herokuapp.com/api/annon-atm/'

const similarData = (item) => ({
  bank: item.address.amenity.toLowerCase(),
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
  namedetails: item.namedetails,
  extra_tags: item.extratags,
})

// Store to DB
export const storeBranchToDB = async (searchedData) => {
  let breakLoop = []
  let idArray = []
  for (let item of searchedData) {
    if (breakLoop.pop() === "Bank doesn't exists") {
      break
    }
    await (item.type === 'bank'
      ? axios({
          method: 'post',
          url: branchURL,
          data: {
            ...similarData(item),
            municipality: item.address.municipality,
            name: item.display_name,
          },
          headers: {
            'X-CSRFToken': getCookie(),
          },
        })
      : axios({
          method: 'post',
          url: atmURL,
          data: {
            ...similarData(item),
            address: item.display_name,
          },
          headers: {
            'X-CSRFToken': getCookie(),
          },
        })
    )
      .then((res) => {
        idArray.push(res.data)
      })
      .catch((error) => {
        idArray.push(error.response.data)
        breakLoop.push(error.response.data.detail)
      })
  }
  return idArray
}

export const fetchLocationDetailsFromDB = async (obj) =>
  obj.type === 'bank'
    ? await axios({
        method: 'get',
        url: `${branchURL}${obj.id}/`,
      })
    : await axios({
        method: 'get',
        url: `${atmURL}${obj.id}/`,
      })

export const fetchAutoCompleteSearch = async (searchQuery) => {
  let results = []
  await axios({
    method: 'get',
    url: branchURL,
    params: {
      q: searchQuery,
    },
  }).then((res) => (results = [...res.data]))
  await axios({
    method: 'get',
    url: atmURL,
    params: {
      q: searchQuery,
    },
  }).then((res) => (results = [...results, ...res.data]))
  return results
}
