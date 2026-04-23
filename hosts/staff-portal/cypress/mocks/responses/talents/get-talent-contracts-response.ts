import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentContractsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      contractsAndAgreements: {
        edges: [],
        __typename: 'ContractsAndTalentAgreementsEdgedConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
