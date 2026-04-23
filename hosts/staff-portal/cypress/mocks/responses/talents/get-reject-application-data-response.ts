import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getRejectApplicationDataResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      specializationApplications: { nodes: [] },
      ...talent,
      __typename: 'Talent'
    }
  }
})
