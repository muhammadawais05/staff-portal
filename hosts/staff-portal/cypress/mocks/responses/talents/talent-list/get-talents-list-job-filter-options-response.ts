export const getTalentsListJobFilterOptionsResponse = (
  jobId?: string,
  clientId?: string
) => ({
  data: {
    node: {
      id: jobId ?? 'VjEtSm9iLTI4MDgyMA',
      preferHoursOverlapping: true,
      talentMaxHourlyRateLimit: 261,
      client: {
        id: clientId ?? 'VjEtQ2xpZW50LTUyNDE1Nw',
        enterprise: false,
        __typename: 'Client'
      },
      __typename: 'Job'
    }
  }
})
