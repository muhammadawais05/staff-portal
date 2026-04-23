import { encodeEntityId } from '@staff-portal/data-layer-service'
import { SoftSkill, SoftSkillRating, Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

export const getTalentSoftSkillsResponse = (
  talent?: Partial<Talent>,
  softSkills: SoftSkill[] = [],
  softSkillsRatings: SoftSkillRating[] = []
) => {
  return {
    data: {
      node: {
        id: encodeEntityId('123', 'Talent'),
        fullName: 'Nolan Schimmel',
        ...talent,
        operations: {
          createTalentSoftSkillRating: enabledOperationMock(),
          ...talent?.operations
        },
        softSkillRatings: {
          nodes: softSkillsRatings,
          __typename: 'SoftSkillRatingConnection'
        },
        __typename: 'Talent'
      },
      softSkills: {
        nodes: softSkills,
        __typename: 'SoftSkillConnection'
      }
    }
  }
}
