let autocompleteService: google.maps.places.AutocompleteService
let geocoder: google.maps.Geocoder

const getAutocompleteService = () => {
  if (autocompleteService) {
    return autocompleteService
  }
  autocompleteService = new window.google.maps.places.AutocompleteService()

  return autocompleteService
}

const getGeocoder = () => {
  if (geocoder) {
    return geocoder
  }
  geocoder = new window.google.maps.Geocoder()

  return geocoder
}

export const getLocationCoords = (placeId: string) =>
  new Promise<{ latitude?: number; longitude?: number }>((resolve, reject) => {
    getGeocoder()

    geocoder.geocode({ placeId }, (placeResult, placeStatus) => {
      if (
        !placeResult ||
        placeStatus !== window.google.maps.GeocoderStatus.OK
      ) {
        return reject(new Error(`No coordinates found for placeId: ${placeId}`))
      }
      const { lat, lng } = placeResult[0].geometry.location

      resolve({ latitude: lat(), longitude: lng() })
    })
  })

export const getCityOptionsFromGoogleMaps = (
  params: google.maps.places.AutocompletionRequest
) =>
  new Promise<{ text?: string; value?: string }[]>((resolve, reject) => {
    const { types = ['(cities)'], ...rest } = params

    getAutocompleteService().getPlacePredictions(
      {
        types,
        ...rest
      },
      (
        predictions: google.maps.places.QueryAutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          !predictions ||
          status !== window.google.maps.places.PlacesServiceStatus.OK
        ) {
          return reject(new Error(`No results found for: ${params.input}`))
        }

        const options = predictions.map(({ place_id, description }) => ({
          text: description,
          value: place_id
        }))

        resolve(options)
      }
    )
  })
