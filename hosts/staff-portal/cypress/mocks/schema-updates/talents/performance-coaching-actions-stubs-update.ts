import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  NoteQuestionKind,
  Talent,
  TalentCoachingEngagementCampaignSlug,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { talentPerformanceStubs } from '~integration/mocks/request-stubs/talents/tabs/performance'

const updatePerformanceCoachingActionsStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentPerformanceStubs(talent),
    GetCoachingAssignees: {
      data: {
        roles: {
          nodes: [
            {
              id: encodeEntityId('123', 'Staff'),
              fullName: 'Aylen Gomez Ovejero',
              __typename: 'Staff'
            }
          ],
          __typename: 'StaffConnection'
        }
      }
    },
    GetCoachingEngagementsForTalent: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          coachingEngagements: {
            nodes: [
              {
                id: 'VjEtVGFsZW50Q29hY2hpbmdFbmdhZ2VtZW50LTkxMA',
                claimedAt: null,
                createdAt: '2021-11-01T20:53:32+03:00',
                updatedAt: '2021-11-01T20:53:32+03:00',
                campaignSlug: TalentCoachingEngagementCampaignSlug.NEWCOMERS,
                status: TalentCoachingEngagementStatus.PENDING_CLAIM,
                states: {
                  nodes: [
                    {
                      id: 'VjEtVGFsZW50Q29hY2hpbmdFbmdhZ2VtZW50U3RhdGUtNTM4',
                      color: 'green',
                      label: 'Available',
                      __typename: 'TalentCoachingEngagementState'
                    }
                  ],
                  __typename: 'TalentCoachingEngagementStateConnection'
                },
                coach: null,
                operations: {
                  addCoachActionsNote: enabledOperationMock(),
                  addGeneralNote: enabledOperationMock(),
                  assignCoach: enabledOperationMock(),
                  changeStatus: hiddenOperationMock(),
                  __typename: 'TalentCoachingEngagementOperations'
                },
                talent: {
                  id: encodeEntityId('123', 'Talent'),
                  fullName: 'Andrei Mocanu',
                  activatedAt: '2021-11-01T20:53:32+03:00',
                  photo: null,
                  hourlyRate: '0.0',
                  engagements: {
                    counters: {
                      workingNumber: 1,
                      __typename: 'TalentEngagementsCounters'
                    },
                    __typename: 'TalentEngagementConnection'
                  },
                  timeZone: {
                    name: '(UTC-04:00) America - Detroit',
                    __typename: 'TimeZone'
                  },
                  locationV2: {
                    countryName: 'United Kingdom',
                    __typename: 'Location'
                  },
                  talentType: 'Designer',
                  talentPartner: null,
                  __typename: 'Talent',
                  webResource: {
                    text: 'Andrei Mocanu',
                    url: 'https://staging.toptal.net/platform/staff/talents/123',
                    __typename: 'Link'
                  }
                },
                applicationStatus: {
                  id: 'VjEtQXBwbGljYXRpb25TdGF0dXMtOTEw',
                  cancelledInterviewCount: 0,
                  confirmedAvailabilityRequestCount: 7,
                  rejectedInterviewCount: 0,
                  statusRetentionDays: 30,
                  successfulInterviewCount: 1,
                  totalAvailabilityRequestCount: 8,
                  totalEngagementCount: 7,
                  totalInterviewCount: 5,
                  totalJobApplicationCount: 20,
                  __typename: 'ApplicationStatus'
                },
                __typename: 'TalentCoachingEngagement',
                notes: {
                  nodes: [],
                  totalCount: 0,
                  __typename: 'NoteConnection'
                },
                tasks: {
                  nodes: [],
                  totalCount: 0,
                  __typename: 'TalentCoachingEngagementTaskConnection'
                }
              }
            ],
            totalCount: 1,
            __typename: 'TalentCoachingEngagementConnection'
          },
          __typename: 'Talent'
        }
      }
    },
    GetCoachingEngagementNoteAnswers: {
      data: {
        node: {
          id: 'VjEtVGFsZW50Q29hY2hpbmdFbmdhZ2VtZW50LTkxMA',
          defaultNoteAnswers: {
            nodes: [
              {
                id: 'VjEtTm90ZUFuc3dlci0',
                label: null,
                value: null,
                comment: null,
                displayText: null,
                __typename: 'NoteAnswer',
                option: null,
                questionEdge: {
                  renderedLabel: 'Outcome Secondary Reason (Optional)',
                  node: {
                    kind: NoteQuestionKind.SELECT,
                    hint: 'Select',
                    commentType: null,
                    additionalCommentsHint: 'Add comment',
                    required: false,
                    activeOptions: {
                      nodes: [
                        {
                          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMyMTk3',
                          label: 'High rate',
                          value: 'High rate',
                          __typename: 'NoteQuestionOption'
                        }
                      ],
                      __typename: 'NoteQuestionOptionConnection'
                    },
                    id: 'VjEtTm90ZVF1ZXN0aW9uLTMxNDIy',
                    label: 'Outcome Secondary Reason (Optional)',
                    group: {
                      label: 'Coaching Engagement Outcome',
                      __typename: 'NoteQuestionGroup'
                    },
                    __typename: 'NoteQuestion'
                  },
                  __typename: 'NoteQuestionEdge'
                }
              }
            ],
            __typename: 'NoteAnswerConnection'
          },
          __typename: 'TalentCoachingEngagement'
        }
      }
    },
    GetCreateTaskOperation: {
      data: {
        operations: {
          createTask: enabledOperationMock(),
          __typename: 'QueryOperations'
        }
      }
    }
  })

export default updatePerformanceCoachingActionsStubs
