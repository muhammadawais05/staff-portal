export const stringToCoords = (center: string) => {
  const [lat, lng] = center.split(',')

  return { lat: parseFloat(lat), lng: parseFloat(lng) }
}

export const coordsToString = (coords: google.maps.LatLngLiteral) => {
  return `${coords.lat}, ${coords.lng}`
}

export const isPositionValid = (center: string) => {
  const [lat, lng] = center.split(',')

  const isValid = !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng))

  if (!isValid) {
    // eslint-disable-next-line no-console
    console.warn(
      'Warning: map geoposition should be in the format: `-42.356, -23.14`'
    )
  }

  return isValid
}
