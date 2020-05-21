import axios from 'axios'

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

export const storeBranchToDB = async (searchedData) => {
  for (let item of searchedData) {
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
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error.response)
      })
  }
}
