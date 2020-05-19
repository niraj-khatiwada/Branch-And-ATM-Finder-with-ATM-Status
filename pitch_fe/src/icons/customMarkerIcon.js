import L from 'leaflet'
import icon from './gps.png'
import icon2 from './signs.png'

export const customIcon = L.icon({
  iconUrl: icon,
  iconSize: [38, 40],
})

export const defaultIcon = L.icon({
  iconUrl: icon2,
  iconSize: [38, 40],
})
