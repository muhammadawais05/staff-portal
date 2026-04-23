import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import {
  getPossibleSourcersResponse,
  getTalentCommissionsResponse,
  getTalentProfileApplicantSkillsResponse,
  getTalentApplicationSkillsAutoCompleteResponse,
  getUserSearchAutocompleteResponse
} from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'

const updateTalentGeneralSectionStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      operations: getTalentOperations({
        changeRoleReferrer: enabledOperationMock(),
        resetRoleReferrer: enabledOperationMock(),
        changeTalentSourcer: enabledOperationMock(),
        callRole: enabledOperationMock(),
        updateTalentApplicantSkills: enabledOperationMock()
      }),
      ...talent
    }),
    GetUserSearchAutocomplete: getUserSearchAutocompleteResponse(),
    GetTalentCommissions: getTalentCommissionsResponse(),
    GetTalentProfileApplicantSkills: getTalentProfileApplicantSkillsResponse(),
    GetTalentApplicationSkillsAutoComplete:
      getTalentApplicationSkillsAutoCompleteResponse(),
    GetPossibleSourcers: getPossibleSourcersResponse(),
    ChangeRoleReferrer: {
      data: {
        changeRoleReferrer: {
          __typename: 'ChangeRoleReferrerPayload',
          role: {
            id: encodeEntityId('123', 'Talent'),
            referrer: {
              id: encodeEntityId('123', 'ReferralPartner'),
              __typename: 'ReferralPartner',
              webResource: {
                text: 'Tyler Terry',
                url: 'https://staging.toptal.net/platform/staff/referral_partners/123',
                __typename: 'Link'
              }
            },
            __typename: 'Talent'
          },
          success: true,
          errors: []
        }
      }
    },
    ResetRoleReferrer: {
      data: {
        resetRoleReferrer: {
          __typename: 'ResetRoleReferrerPayload',
          role: {
            id: encodeEntityId('123', 'Talent'),
            referrer: null,
            __typename: 'Talent'
          },
          success: true,
          errors: []
        }
      }
    },
    ChangeTalentSourcer: {
      data: {
        changeTalentSourcer: {
          talent: {
            id: encodeEntityId('123', 'Talent'),
            sourcer: {
              id: encodeEntityId('123', 'Staff'),
              webResource: {
                text: 'Aliona Miron',
                url: 'https://staging.toptal.net/platform/staff/staff/123',
                __typename: 'Link'
              },
              __typename: 'Staff'
            },
            __typename: 'Talent'
          },
          success: true,
          errors: [],
          __typename: 'ChangeTalentSourcerPayload'
        }
      }
    },
    UpdateTalentApplicantSkills: {
      data: {
        updateTalentApplicantSkills: {
          talent: {
            id: encodeEntityId('123', 'Talent'),
            applicantSkills: {
              nodes: [
                {
                  id: 'VjEtU2tpbGwtMTExNzEy',
                  name: 'AWS',
                  __typename: 'Skill'
                },
                {
                  id: 'VjEtU2tpbGwtMzk4NjI',
                  name: 'HTML',
                  __typename: 'Skill'
                }
              ],
              __typename: 'TalentApplicantSkillConnection'
            },
            __typename: 'Talent'
          },
          success: true,
          errors: [],
          __typename: 'UpdateTalentApplicantSkillsPayload'
        }
      }
    },
    resetTalentSourcer: {
      data: {
        resetTalentSourcer: {
          talent: {
            id: encodeEntityId('123', 'Talent'),
            sourcer: null,
            __typename: 'Talent'
          },
          success: true,
          errors: [],
          __typename: 'ResetTalentSourcerPayload'
        }
      }
    },
    SubscribeToTalentAvailabilityUpdates: {
      data: {
        subscribeToTalentAvailabilityUpdates: {
          ...successMutationMock(),
          talent: {
            id: encodeEntityId('123', 'Talent'),
            viewerActiveAvailabilitySubscription: {
              id: encodeEntityId('123', 'TalentAvailabilitySubscription'),
              active: true,
              comment: 'Comment'
            }
          }
        }
      }
    },
    UpdateTalentAvailabilitySubscriptionComment: {
      data: {
        updateCommentOfTalentAvailabilityUpdatesSubscription: {
          ...successMutationMock(),
          talent: {
            id: encodeEntityId('123', 'Talent'),
            viewerActiveAvailabilitySubscription: {
              id: encodeEntityId('123', 'TalentAvailabilitySubscription'),
              active: true,
              comment: 'Comment'
            }
          }
        }
      }
    },
    UnsubscribeFromTalentAvailabilityUpdates: {
      data: {
        unsubscribeFromTalentAvailabilityUpdates: {
          ...successMutationMock(),
          talent: {
            id: encodeEntityId('123', 'Talent'),
            viewerActiveAvailabilitySubscription: {
              id: encodeEntityId('123', 'TalentAvailabilitySubscription'),
              active: true,
              comment: 'Comment',
              operations: {
                subscribeToTalentAvailabilityUpdates: enabledOperationMock()
              }
            }
          }
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: {
            changeRoleReferrer: enabledOperationMock(),
            changeTalentSourcer: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    }
  })

export default updateTalentGeneralSectionStubs
