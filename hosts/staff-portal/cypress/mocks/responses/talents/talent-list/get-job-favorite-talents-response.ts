import { Talent } from '@staff-portal/graphql/staff'

export const getJobFavoriteTalentsResponse = (
  jobId?: string,
  favoriteTalents: Partial<Talent>[] = []
) => ({
  data: {
    node: {
      id: jobId ?? 'VjEtSm9iLTI4MDgyMA',
      favoriteTalents: {
        nodes: favoriteTalents,
        __typename: 'JobFavoriteTalentEdgedConnection'
      },
      __typename: 'Job'
    }
  }
})
