/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  TalentJobIssueMetricStatus,
  TalentJobIssue,
  InterviewCumulativeStatus,
  EngagementStatus,
  JobEngagementConnection
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const candidateEngagementsMock = () =>
  ({
    __typename: 'JobEngagementConnection',
    edges: [
      {
        id: encodeEntityId('843', 'JobEngagementEdge'),
        __typename: 'JobEngagementEdge',
        jobIssues: {
          __typename: 'TalentJobEdgeJobIssues',
          failedMetrics: [
            {
              __typename: 'TalentJobIssueMetric',
              message: 'Talent has been introduced on 1 job',
              name: 'introduced_engagements_metric',
              status: TalentJobIssueMetricStatus.FAILURE
            }
          ],
          status: TalentJobIssue.WARNING
        },
        talentCount: 2,
        node: {
          __typename: 'Engagement',
          createdAt: '2021-03-21T12:00:00+03:00',
          cumulativeStatus: EngagementStatus.SCHEDULED,
          detailedStatus: 'Sent on Sep 26, 2021 at 8:12am - pending review',
          id: encodeEntityId('723', 'Engagement'),
          nextTopNumber: 49,
          interview: {
            __typename: 'Interview',
            scheduledAtTimes: ['2021-09-24T08:45:00-04:00'],
            cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
            id: encodeEntityId('684', 'Interview'),
            operations: {
              __typename: 'InterviewOperations',
              updateInterviewGoogleCalendarEvent: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: ['Google event does not exist.']
              },
              scheduleSingleCommitInterview: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: ['Google event does not exist.']
              }
            }
          },
          interviews: {
            nodes: [
              {
                __typename: 'Interview',
                cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
                id: encodeEntityId('444', 'Interview'),
                operations: {
                  __typename: 'InterviewOperations',
                  updateInterviewGoogleCalendarEvent: {
                    __typename: 'Operation',
                    callable: 'HIDDEN',
                    messages: ['Google event does not exist.']
                  },
                  proposeInterviewTimeSlots: {
                    __typename: 'Operation',
                    callable: 'HIDDEN',
                    messages: ['Google event does not exist.']
                  },
                  clearAndChangeInterviewProposedTimeSlots: {
                    __typename: 'Operation',
                    callable: 'HIDDEN',
                    messages: ['Google event does not exist.']
                  },
                  proposeInternalInterviewTimeSlots: {
                    __typename: 'Operation',
                    callable: 'HIDDEN',
                    messages: ['Google event does not exist.']
                  },
                  clearAndChangeInternalInterviewProposedTimeSlots: {
                    __typename: 'Operation',
                    callable: 'HIDDEN',
                    messages: ['Google event does not exist.']
                  },
                  scheduleSingleCommitInterview: {
                    __typename: 'Operation',
                    callable: 'HIDDEN',
                    messages: ['Google event does not exist.']
                  }
                }
              }
            ],
            totalCount: 1
          },
          job: {
            __typename: 'Job',
            id: encodeEntityId('355', 'Job'),
            talentCount: 1,
            webResource: {
              __typename: 'Link',
              text: 'Senior Brand Developer (265363)',
              url: 'https://staging.toptal.net/platform/staff/jobs/265363'
            }
          },
          status: EngagementStatus.SCHEDULED,
          talent: {
            __typename: 'Talent',
            fullName: 'Nancie Sporer',
            id: encodeEntityId('576', 'Talent'),
            resumeUrl:
              'https://staging.toptal.net/resume/obfuscated_slug_1203412',
            type: 'Developer',
            webResource: {
              __typename: 'Link',
              url: 'https://staging.toptal.net/platform/staff/talents/2156893',
              text: 'test'
            },
            photo: null
          },
          talentSentAt: '2021-09-26T08:12:08-05:00',
          webResource: {
            __typename: 'Link',
            url: 'https://staging.toptal.net/platform/staff/engagements/278637',
            text: 'test'
          },
          client: {
            __typename: 'Client',
            contracts: {
              __typename: 'ContractConnection',
              totalCount: 2
            },
            id: encodeEntityId('527', 'Client'),
            webResource: {
              __typename: 'Link',
              text: 'Mohr-Corwin VE',
              url: 'https://staging.toptal.net/platform/staff/companies/2300913'
            },
            enterprise: true,
            netTerms: 30,
            preferredBillingOption: null
          },
          clientEmailMessaging: {
            __typename: 'EmailMessagingEngagementClient',
            id: encodeEntityId('236', 'EmailMessagingEngagementClient'),
            operations: {
              __typename: 'EmailMessagingOperation',
              sendEmailTo: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              changeEngagementTrialLength: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              }
            }
          },
          endDate: null,
          newExternalInterview: {
            __typename: 'Interview',
            id: encodeEntityId('664', 'Interview'),
            operations: {
              __typename: 'InterviewOperations',
              clearAndChangeInterviewProposedTimeSlots: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: ['Cannot be updated', 'Cannot be cleared']
              },
              proposeInterviewTimeSlots: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              },
              scheduleSingleCommitInterview: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: ['Google event does not exist.']
              }
            }
          },
          newInternalInterview: {
            __typename: 'Interview',
            id: encodeEntityId('999', 'Interview'),
            operations: {
              __typename: 'InterviewOperations',
              clearAndChangeInternalInterviewProposedTimeSlots: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: [
                  'Cannot be updated',
                  'Engagement not in interview',
                  'Cannot be cleared',
                  'The talent is no longer interviewing for this job.',
                  'Something went wrong. Please try again later.'
                ]
              },
              proposeInternalInterviewTimeSlots: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: [
                  'The talent is no longer interviewing for this job.',
                  'You can schedule an internal interview only for draft engagements.'
                ]
              },
              scheduleSingleCommitInterview: {
                __typename: 'Operation',
                callable: 'HIDDEN',
                messages: ['Google event does not exist.']
              }
            }
          },
          operations: {
            __typename: 'EngagementOperations',
            approveEngagementTrial: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ["Engagement has invalid status and can't be approved"]
            },
            approveRejectedEngagementTrial: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Engagement is not in rejected trial status.']
            },
            cancelEngagementDraftInInterview: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: [
                'Cannot run "cancel_draft" while Senior Brand Developer (265363) is in status "pending"',
                'There is no interview for this draft'
              ]
            },
            cancelEngagementInInterview: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            cancelEngagementTrial: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: [
                "Engagement cannot be canceled because it's neither on trial nor scheduled nor pending legal nor rejected trial"
              ]
            },
            changeEngagementCommitment: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            changeEngagementEndDate: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: [
                'You can change end date only on closed or end scheduled engagements'
              ]
            },
            changeEngagementStartDate: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: ['Start date must be set before it can be changed']
            },
            changeProductBillingFrequency: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: [
                'Cannot change billing frequency when the engagement is not active.'
              ]
            },
            expireEngagement: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Interview is not set for expiration']
            },
            importContractAsTop: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Invalid job status']
            },
            importTop: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Invalid job status']
            },
            postponeEngagementExpiration: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Interview is not set for expiration']
            },
            reactivateEngagement: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: [
                'Cannot run "reactivate" while Senior Brand Developer (265363) is in status "pending"'
              ]
            },
            rejectApprovedEngagementTrial: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: [
                'Cannot run "reject_approved" while Senior Brand Developer (265363) is in status "pending"',
                'Engagement trial is not approved.'
              ]
            },
            rejectEngagementOnInterview: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            rejectEngagementTrial: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: [
                'Cannot run "reject_on_trial" while Senior Brand Developer (265363) is in status "pending"'
              ]
            },
            reopenExpiredEngagement: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Only expired engagement can be reopened']
            },
            restoreCancelledEngagement: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Interview is currently not cancelled']
            },
            restoreExpiredEngagement: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Interview is not expired']
            },
            restoreRejectedEngagement: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Interview is currently not rejected']
            },
            revertEngagementTrialToActive: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['The engagement trial is not approved.']
            },
            scheduleEngagementActivationStartDate: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            scheduleEngagementBreak: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: [
                'You can only create breaks for active or closed engagements'
              ]
            },
            sendTop: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Invalid job status']
            },
            terminateEngagement: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: ["You can't end an engagement that hasn't started yet"]
            },
            changeEngagementTrialLength: {
              callable: 'ENABLED',
              messages: [],
              __typename: 'Operation'
            }
          },
          talentEmailMessaging: {
            __typename: 'EmailMessagingEngagementTalent',
            id: encodeEntityId('753', 'EmailMessagingEngagementTalent'),
            operations: {
              __typename: 'EmailMessagingOperation',
              sendEmailTo: {
                __typename: 'Operation',
                callable: 'ENABLED',
                messages: []
              }
            }
          },
          commitment: 'FULL_TIME',
          billCycle: 'MONTHLY',
          currentCommitment: {
            availability: 'full_time',
            canBeDiscounted: false,
            adjustedTalentRate: {
              availability: 'WEEK',
              value: '2400.0',
              __typename: 'CommitmentRate'
            },
            adjustedRevenueRate: {
              availability: 'WEEK',
              value: '2000.0',
              __typename: 'CommitmentRate'
            },
            adjustedCompanyRate: {
              availability: 'WEEK',
              value: '4400.0',
              __typename: 'CommitmentRate'
            },
            __typename: 'AdjustedCommitment'
          },
          discountMultiplier: '1',
          startDate: null,
          trialLength: 10
        }
      }
    ],
    nodes: [],
    totalCount: 10
  } as unknown as JobEngagementConnection)
