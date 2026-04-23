export const getTalentsListFilterOptionsResponse = () => ({
  data: {
    talentMaxHourlyRateLimit: 200,
    viewer: {
      permits: {
        accessTalentInternals: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    }
  }
})
