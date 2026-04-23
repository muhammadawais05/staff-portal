import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'

const getEngagementIdsFromJobs = (jobs: ClientJobFragment[]): string[] =>
  jobs.reduce((acc, job) => {
    const engagements = job?.engagements?.nodes

    if (engagements) {
      const curEngagementIds = engagements.map(({ id }) => id)

      return [...acc, ...curEngagementIds]
    }

    return acc
  }, [] as string[])

export default getEngagementIdsFromJobs
