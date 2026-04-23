import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

export const getFavoriteTalentsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      ...job,
      favoriteTalents: {
        edges: [
          {
            appropriateSpecialization: true,
            node: {
              id: encodeEntityId('123', 'Talent'),
              fullName: 'Talent Name',
              availabilityRequestMetadata: {
                lowActivity: false,
                pending: 0,
                prediction: 0,
                recentConfirmed: 1,
                recentRejected: 1,
                __typename: 'TalentAvailabilityRequestMetadata'
              },
              __typeName: 'Talent'
            }
          }
        ],
        totalCount: 1,
        __typename: 'JobFavoriteTalentEdgedConnection'
      },
      __typename: 'Job'
    }
  }
})
