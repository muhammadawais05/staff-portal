import { SoftSkill, Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentSoftSkillsResponse } from '~integration/mocks/responses'
import {
  softSkillMock,
  softSkillRatingMock
} from '~integration/mocks/talent-soft-skill-item-mock'
import { successOperationMock } from '~integration/mocks/operations'

const updateTalentProfileSoftSkillRemoveRatingStubs = (
  talent?: Partial<Talent>
) => {
  const talentId = encodeEntityId('123', 'Talent')
  const softSkillId = encodeEntityId('456', 'SoftSkill')
  const softSkill = softSkillMock({ id: softSkillId })
  const softSkillRating = softSkillRatingMock({
    softSkill: { id: softSkillId }
  } as unknown as SoftSkill)

  return cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent
    }),
    GetTalentSoftSkills: getTalentSoftSkillsResponse(
      { id: talentId },
      [softSkill],
      [softSkillRating]
    ),
    GetLazyOperation: {
      data: {
        node: {
          id: softSkillRating.id,
          operations: {
            removeSoftSkillRating: enabledOperationMock(),
            __typename: 'SoftSkillRatingOperations'
          },
          __typename: 'SoftSkillRating'
        }
      }
    },
    RemoveSoftSkillRating: {
      data: {
        removeSoftSkillRating: {
          softSkillRating: {
            id: softSkillRating.id,
            __typename: 'SoftSkillRating'
          },
          ...successOperationMock(),
          __typename: 'RemoveSoftSkillRatingPayload'
        }
      }
    }
  })
}

export default updateTalentProfileSoftSkillRemoveRatingStubs
