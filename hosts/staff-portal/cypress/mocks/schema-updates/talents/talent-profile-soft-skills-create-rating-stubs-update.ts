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

const updateTalentProfileSoftSkillCreateRatingStubs = (
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
          id: talentId,
          operations: {
            createTalentSoftSkillRating: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    CreateTalentSoftSkillRating: {
      data: {
        createTalentSoftSkillRating: {
          ...successOperationMock(),
          __typename: 'CreateTalentSoftSkillRatingPayload'
        }
      }
    }
  })
}

export default updateTalentProfileSoftSkillCreateRatingStubs
