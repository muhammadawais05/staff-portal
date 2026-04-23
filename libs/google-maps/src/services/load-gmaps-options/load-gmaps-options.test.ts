import {
  getCityOptionsFromGoogleMaps,
  getLocationCoords
} from './load-gmaps-options'

const ADDRESS = 'Milano, District 2, Sub District 2'
const PLACE_ID = '12345'
const LATITUDE = '12233'
const LONGITUDE = '22233'

const ADDRESS_RESPONSE_MOCK = [
  {
    text: ADDRESS,
    value: PLACE_ID
  }
]

const ADDRESS_MOCK = {
  place_id: PLACE_ID,
  description: ADDRESS
}

const GEOCODE_MOCK = {
  geometry: {
    location: {
      lat: () => LATITUDE,
      lng: () => LONGITUDE
    }
  }
}

const GEOCODE_RESPONSE_MOCK = { latitude: LATITUDE, longitude: LONGITUDE }

describe('Google Maps Autocomplete', () => {
  beforeAll(() => {
    window.google = {
      maps: {
        places: {
          PlacesServiceStatus: { OK: 'OK' },
          AutocompleteService: class {
            getPlacePredictions = jest.fn((_, callback) =>
              // eslint-disable-next-line node/no-callback-literal
              callback([ADDRESS_MOCK], 'OK')
            )
          }
        },
        GeocoderStatus: { OK: 'OK' },
        Geocoder: class {
          geocode = jest.fn((_, callback) =>
            // eslint-disable-next-line node/no-callback-literal
            callback([GEOCODE_MOCK], 'OK')
          )
        }
      } as never
    }
  })

  it('fetch city address', async () => {
    const response = await getCityOptionsFromGoogleMaps({ input: 'Milano' })

    expect(response).toMatchObject(ADDRESS_RESPONSE_MOCK)
  })

  it('fetch geocode data for specific city', async () => {
    const response = await getLocationCoords('2233')

    expect(response).toMatchObject(GEOCODE_RESPONSE_MOCK)
  })
})
