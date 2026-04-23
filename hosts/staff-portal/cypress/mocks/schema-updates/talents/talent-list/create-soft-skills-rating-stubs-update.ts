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

const updateAddSoftSkillRatingStubs = () => {
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
          id: talent.id,
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

export default updateAddSoftSkillRatingStubs
