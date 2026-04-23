import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentSkillSetsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      type: 'Developer',
      skillSets: {
        nodes: [],
        __typename: 'TalentSkillSets'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
