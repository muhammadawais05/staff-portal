import {
  JobApplicationStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TalentPartnerFragment } from '@staff-portal/talents'

import { JobApplicationContentFragment } from './get-job-application.staff.gql.types'
type JobPositionAnswer =
  JobApplicationContentFragment['jobPositionAnswers']['nodes'][0]

export const createJobPositionAnswer = (
  props: Partial<JobPositionAnswer>
): JobPositionAnswer => ({
  id: 'pos-a-id',
  jobPositionQuestion: {
    id: 'job-pos-q-id',
    template: {
      id: 'template-id',
      slug: 'confirm_availability'
    },
    updatedAt: '2021-07-28T21:06:39+03:00'
  },
  value: 'This part was obfuscated, some content was here.',
  jobPositionQuestionFullRender:
    "What's the soonest time that you would be available for an interview?",
  updatedAt: '2021-07-28T22:11:06+03:00',
  talent: {
    id: 'VjEtVGFsZW50LTI1Njc0MDk',
    mainBookingPage: {
      id: 'booking-page-id',
      slug: 'BookingPage9177'
    }
  },
  ...props
})

// eslint-disable-next-line max-lines-per-function
export const createGetJobApplicationMock = ({
  jobId,
  jobApplicationId,
  talentName,
  talentType,
  talentPartner,
  status = JobApplicationStatus.ACCEPTED,
  approveUrl = 'https://url.com'
}: {
  jobId?: string
  jobApplicationId?: string
  talentName?: string
  talentType?: string
  talentPartner?: TalentPartnerFragment['talentPartner']
  status?: JobApplicationStatus
  approveUrl?: string
}): JobApplicationContentFragment => {
  return {
    id: jobApplicationId || 'jobApplicationId-1',
    approveUrl,
    approveUrlTooltip: null,
    createdAt: '2021-05-07T00:01:52+03:00',
    job: {
      id: jobId || 'jobId-1',
      skillSets: {
        nodes: [
          {
            id: 'VjEtU2tpbGxTZXQtMzA2NzkyMQ',
            skill: {
              id: 'VjEtU2tpbGwtMzcwNzU',
              __typename: 'Skill'
            },
            __typename: 'SkillSet'
          } as NonNullable<
            JobApplicationContentFragment['job']['skillSets']
          >['nodes'][0]
        ],
        __typename: 'SkillSetConnection'
      },
      __typename: 'Job'
    },
    talent: {
      id: 'VjEtVGFsZW50LTI1Njc0MDk',
      type: talentType || 'Developer',
      fullName: talentName || 'Judith Kub',
      hourlyRate: '30.0',
      locationV2: {
        country: {
          id: 'VjEtQ291bnRyeS0xNjc',
          name: 'Pakistan',
          __typename: 'Country'
        },
        __typename: 'Location'
      },
      contacts: {
        nodes: []
      },
      slackContacts: {
        nodes: []
      },
      skillSets: {
        totalCount: 54,
        nodes: [
          {
            id: 'VjEtU2tpbGxTZXQtMzA2MjA2NA',
            rating: 'EXPERT',
            main: false,
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5NDg',
              name: 'GitHub',
              category: {
                id: 'test-id',
                title: 'Tools',
                position: 9,
                __typename: 'SkillCategory'
              },
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          }
        ],
        __typename: 'TalentSkillSets'
      },
      matchQualityMetrics: {
        nodes: [
          {
            label: 'Portfolio Items',
            labelLink: 'https://url.com',
            labelTooltip:
              'Talent meets minimum count of portfolio items:\n6 for Designers\n3 for other verticals',
            name: 'PORTFOLIO_COUNT',
            value: 'PASSED',
            valueTooltip:
              'Talent has 3 portfolio items.\n3 are required for Developers.',
            __typename: 'MatchQualityMetric'
          }
        ],
        __typename: 'MatchQualityMetricConnection'
      },
      deltaWaitingDays: 6,
      lastClosedEngagementEndDate: null,
      lastAvailabilityIncreaseDate: '2021-07-14',
      photo: null,
      webResource: {
        url: 'https://url.com',
        __typename: 'Link'
      },
      timeZone: {
        name: '(UTC+05:00) Asia - Karachi',
        value: 'Asia/Karachi',
        __typename: 'TimeZone'
      },
      engagements: {
        counters: {
          workingNumber: 0,
          clientsNumber: 0,
          repeatedClientsNumber: 0,
          acceptedInterviewsNumber: 0,
          approvedTrialsNumber: 0,
          interviewsNumber: 1,
          successRate: 0,
          trialsNumber: 0,
          __typename: 'TalentEngagementsCounters'
        },
        __typename: 'TalentEngagementConnection'
      },
      talentPartner: talentPartner,
      __typename: 'Talent'
    },
    jobPositionAnswers: {
      nodes: [
        {
          id: 'a-id-1',
          jobPositionQuestion: {
            id: 'job-pos-q-id-x',
            template: {
              id: 'template-id-x',
              slug: 'working_engagement'
            },
            updatedAt: '2021-07-28T21:06:39+03:00'
          },
          value: 'This part was obfuscated, some content was here.',
          jobPositionQuestionFullRender:
            "What's the soonest time that you would be available for an interview?",
          updatedAt: '2021-07-28T22:11:06+03:00',
          talent: {
            id: 'VjEtVGFsZW50LTI1Njc0MDk',
            mainBookingPage: {
              id: 'main-booking-id-1',
              slug: 'BookingPage9177',
              __typename: 'BookingPage'
            }
          }
        },
        {
          id: 'a-id-2',
          jobPositionQuestion: {
            id: 'job-pos-q-id-y',
            template: {
              id: 'template-id-y',
              slug: 'confirm_availability'
            },
            updatedAt: '2021-07-28T21:06:39+03:00'
          },
          value: 'This part was obfuscated, some content was here.',
          jobPositionQuestionFullRender:
            'This job expects you to be available for 40 hours per week. Please confirm that you can guarantee that availability.',
          updatedAt: '2021-07-28T22:11:06+03:00',
          talent: {
            id: 'VjEtVGFsZW50LTI1Njc0MDk',
            mainBookingPage: {
              id: 'main-booking-id-2',
              slug: 'BookingPage9177',
              __typename: 'BookingPage'
            }
          }
        },
        {
          id: 'a-id-3',
          jobPositionQuestion: {
            id: 'job-pos-q-id-z',
            template: {
              id: 'template-id-z',
              slug: 'working_engagement'
            },
            updatedAt: '2021-07-28T21:06:39+03:00'
          },
          value: 'This part was obfuscated, some content was here.',
          jobPositionQuestionFullRender:
            'How soon can you start working on this role/position?',
          updatedAt: '2021-07-28T22:11:06+03:00',
          talent: {
            id: 'VjEtVGFsZW50LTI1Njc0MDk',
            mainBookingPage: {
              id: 'main-booking-id-3',
              slug: 'BookingPage9177'
            }
          }
        }
      ],
      totalCount: 3,
      __typename: 'JobPositionAnswerConnection'
    },
    operations: {
      rejectJobApplicant: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      emailJobApplicant: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'JobApplicationOperations'
    },
    status,
    webResource: { url: 'https://url.com' },
    emailMessaging: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdKb2JBcHBsaWNhdGlvbi0xMjM='
    },
    __typename: 'JobApplication'
  } as JobApplicationContentFragment
}
