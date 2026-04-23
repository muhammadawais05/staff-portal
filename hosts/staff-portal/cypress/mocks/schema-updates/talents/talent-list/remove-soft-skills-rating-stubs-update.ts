import { SoftSkill } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { successOperationMock } from '~integration/mocks/operations'
import { talentListPageStubs } from '~integration/mocks/request-stubs'
import { getTalentSoftSkillsResponse } from '~integration/mocks/responses'
import talentJobListItemMock from '~integration/mocks/talent-job-list-item-mock'
import {
  softSkillMock,
  softSkillRatingMock
} from '~integration/mocks/talent-soft-skill-item-mock'

const updateRemoveSoftSkillRatingStubs = () => {
  const talent = talentJobListItemMock()
  const softSkillId = '456'
  const softSkill = softSkillMock({ id: softSkillId })
  const softSkillRating = softSkillRatingMock({
    softSkill: { id: softSkillId }
  } as unknown as SoftSkill)

  return cy.stubGraphQLRequests({
    ...talentListPageStubs(),
    GetTalentSoftSkills: getTalentSoftSkillsResponse(
      { id: talent.id },
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

export default updateRemoveSoftSkillRatingStubs
