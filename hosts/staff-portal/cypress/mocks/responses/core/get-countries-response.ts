export const getCountriesResponse = () => ({
  data: {
    countries: {
      nodes: [
        {
          id: 'VjEtQ291bnRyeS01OA',
          name: 'Cyprus',
          code: 'CY',
          defaultTimeZone: {
            id: 'VjEtVGltZWxpbmUtVHlwZS01OA==',
            name: 'Europe/Nicosia',
            offset: 2,
            standardOffset: 2,
            daylightOffset: 1,
            standardStart: '2020-03-26T01:00:00.000Z',
            daylightStart: '2020-10-28T01:00:00.000Z',
            value: 'Europe/Nicosia',
            __typename: 'TimeZone'
          },

          __typename: 'Country'
        }
      ],
      __typename: 'CountryConnection'
    }
  }
})
