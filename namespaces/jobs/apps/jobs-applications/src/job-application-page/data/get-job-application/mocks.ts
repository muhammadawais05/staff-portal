/* eslint-disable max-lines-per-function */
import { JobApplicationFragment } from './get-job-application.staff.gql.types'

interface Options {
  id: string
  enterprise?: boolean
  hasJobPositionAnswers?: boolean
  hasTalentPitch?: boolean
}

export const createGetJobApplicationMock = ({
  id,
  enterprise,
  hasJobPositionAnswers,
  hasTalentPitch
}: Options) =>
  ({
    id,
    approveUrl:
      'https://staging.toptal.net/platform/staff/engagements/new?engagement%5Bjob_id%5D=289434&engagement%5Btalent_id%5D=2554663',
    approveUrlTooltip: null,
    createdAt: '2022-04-12T05:51:50+02:00',
    emailMessaging: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdKb2JBcHBsaWNhdGlvbi01MTY1Njc',
      __typename: 'EmailMessagingJobApplication'
    },
    job: {
      id: 'VjEtSm9iLTI4OTQzNA',
      client: {
        id: 'VjEtQ2xpZW50LTI5NjczOQ',
        enterprise: enterprise ?? false,
        fullName: 'Koss, Schaden and Tromp',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/companies/1384898',
          text: 'Koss, Schaden and Tromp',
          __typename: 'Link'
        },
        __typename: 'Client'
      },
      commitment: 'full_time',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla\nsodales est. Ut porttitor blandit sapien pellentesque pretium. Donec ut diam sed urna venenatis hendrerit. Nulla eros\narcu, mattis vitae congue cursus, tincidunt sed turpis. Curabitur non enim diam, eget elementum dolor. Vivamus enim\ntortor, tempor at vehicula ac, malesuada id est. Praesent at nibh eget metus dapibus dapibus. Donec arcu orci, sagittis\neu interdum vitae, facilisis quis nibh.\n\nMauris luctus molestie velit, at vestibulum magna cursus sit amet. Nulla in accumsan libero. Donec sed sem lectus.\nMauris congue sapien et diam euismod vitae scelerisque diam tincidunt. Praesent a justo enim, vitae venenatis dolor.\nDonec in tortor at magna dapibus suscipit sit amet a libero. Vivamus porttitor rhoncus tellus, at luctus nisl semper\nbibendum. Fusce eget accumsan orci. Donec eleifend mattis imperdiet. Pellentesque eget semper ipsum.\n\nMorbi auctor eleifend tortor. Suspendisse condimentum tincidunt pharetra. Sed elementum leo nulla. Praesent a ligula\nnisi. Etiam ac lacus nibh. Nulla sit amet sapien mauris, sit amet pulvinar tellus. Donec sit amet turpis lorem. Mauris\nut eleifend est. Donec ultrices ullamcorper nibh nec pharetra. Suspendisse vel nibh elementum lacus molestie cursus.\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam in ligula orci. Nam\nadipiscing, erat non rutrum tincidunt, ante nunc consequat sem, et gravida felis augu',
      hoursOverlapEnum: 'HOUR_5',
      title: 'Lead Security Developer (289434)',
      timeZonePreference: {
        name: '(UTC-05:00) America - Chicago',
        value: 'America/Chicago',
        __typename: 'TimeZone'
      },
      hasPreferredHours: true,
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/jobs/289434',
        text: 'Lead Security Developer (289434)',
        __typename: 'Link'
      },
      __typename: 'Job'
    },
    jobPositionAnswers: {
      nodes: hasJobPositionAnswers
        ? [
            {
              id: 'VjEtSm9iUG9zaXRpb25BbnN3ZXItOTYwMzA3',
              jobPositionQuestion: {
                id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xOTU1MDM',
                template: {
                  id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvblRlbXBsYXRlLTEw',
                  slug: 'overlapping_hours',
                  __typename: 'JobPositionQuestionTemplate'
                },
                updatedAt: '2022-04-12T02:49:38+02:00',
                __typename: 'JobPositionQuestion'
              },
              value: 'This part was obfuscated, some content was here.',
              jobPositionQuestionFullRender:
                "The client's time zone is (UTC-05:00) America - Chicago, and their working hours are 7:30pm - 3:30am in your time zone (UTC+05:30) Asia - Calcutta. How many hours of overlap can you provide during their workday?",
              updatedAt: '2022-04-12T05:51:50+02:00',
              talent: {
                id: 'VjEtVGFsZW50LTI1NTQ2NjM',
                mainBookingPage: {
                  id: 'VjEtQm9va2luZ1BhZ2UtMTA0MTc',
                  slug: 'BookingPage10640',
                  __typename: 'BookingPage'
                },
                __typename: 'Talent'
              },
              __typename: 'JobPositionAnswer'
            },
            {
              id: 'VjEtSm9iUG9zaXRpb25BbnN3ZXItOTYwMzA4',
              jobPositionQuestion: {
                id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xOTU1MDQ',
                template: {
                  id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvblRlbXBsYXRlLTE0',
                  slug: 'working_engagement',
                  __typename: 'JobPositionQuestionTemplate'
                },
                updatedAt: '2022-04-12T02:49:38+02:00',
                __typename: 'JobPositionQuestion'
              },
              value: 'This part was obfuscated, some content was here.',
              jobPositionQuestionFullRender:
                'How soon can you start working on this role/position?',
              updatedAt: '2022-04-12T05:51:50+02:00',
              talent: {
                id: 'VjEtVGFsZW50LTI1NTQ2NjM',
                mainBookingPage: {
                  id: 'VjEtQm9va2luZ1BhZ2UtMTA0MTc',
                  slug: 'BookingPage10640',
                  __typename: 'BookingPage'
                },
                __typename: 'Talent'
              },
              __typename: 'JobPositionAnswer'
            },
            {
              id: 'VjEtSm9iUG9zaXRpb25BbnN3ZXItOTYwMzA5',
              jobPositionQuestion: {
                id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xOTU1MDU',
                template: null,
                updatedAt: '2022-04-12T02:49:38+02:00'
              },
              value: 'This part was obfuscated, some content was here.',
              jobPositionQuestionFullRender:
                'Can you please confirm your availability? Full time (40 hours/week), Part time (20 hours/week) or Hourly?',
              updatedAt: '2022-04-12T05:51:50+02:00',
              talent: {
                id: 'VjEtVGFsZW50LTI1NTQ2NjM',
                mainBookingPage: {
                  id: 'VjEtQm9va2luZ1BhZ2UtMTA0MTc',
                  slug: 'BookingPage10640'
                }
              }
            },
            {
              id: 'VjEtSm9iUG9zaXRpb25BbnN3ZXItOTYwMzEw',
              jobPositionQuestion: {
                id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xOTU1MDY',
                template: {
                  id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvblRlbXBsYXRlLTE3',
                  slug: 'full_time_availability',
                  __typename: 'JobPositionQuestionTemplate'
                },
                updatedAt: '2022-04-12T02:49:38+02:00',
                __typename: 'JobPositionQuestion'
              },
              value: 'This part was obfuscated, some content was here.',
              jobPositionQuestionFullRender:
                'If you’re not currently available full time, do you know when or if your availability will open up to 40 hrs/wk?',
              updatedAt: '2022-04-12T05:51:50+02:00',
              talent: {
                id: 'VjEtVGFsZW50LTI1NTQ2NjM',
                mainBookingPage: {
                  id: 'VjEtQm9va2luZ1BhZ2UtMTA0MTc',
                  slug: 'BookingPage10640',
                  __typename: 'BookingPage'
                },
                __typename: 'Talent'
              },
              __typename: 'JobPositionAnswer'
            },
            {
              id: 'VjEtSm9iUG9zaXRpb25BbnN3ZXItOTYwMzEx',
              jobPositionQuestion: {
                id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xOTU1MDc',
                template: null,
                updatedAt: '2022-04-12T02:49:38+02:00'
              },
              value: 'This part was obfuscated, some content was here.',
              jobPositionQuestionFullRender:
                'Can you please give me an idea of what your commitments are outside of Toptal - do you have a full time job or other ongoing projects? And if so, how much time do they take up (as a whole)?',
              updatedAt: '2022-04-12T05:51:50+02:00',
              talent: {
                id: 'VjEtVGFsZW50LTI1NTQ2NjM',
                mainBookingPage: {
                  id: 'VjEtQm9va2luZ1BhZ2UtMTA0MTc',
                  slug: 'BookingPage10640',
                  __typename: 'BookingPage'
                }
              }
            },
            {
              id: 'VjEtSm9iUG9zaXRpb25BbnN3ZXItOTYwMzEy',
              jobPositionQuestion: {
                id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xOTU1MDg',
                template: null,
                updatedAt: '2022-04-12T02:49:38+02:00'
              },
              value: 'This part was obfuscated, some content was here.',
              jobPositionQuestionFullRender:
                'The client is open to splitting the role: Angular developer + Node.js developer. Please confirm what you want to work on (full stack is fine or just front end or just back end).',
              updatedAt: '2022-04-12T05:51:50+02:00',
              talent: {
                id: 'VjEtVGFsZW50LTI1NTQ2NjM',
                mainBookingPage: {
                  id: 'VjEtQm9va2luZ1BhZ2UtMTA0MTc',
                  slug: 'BookingPage10640',
                  __typename: 'BookingPage'
                }
              }
            },
            {
              id: 'VjEtSm9iUG9zaXRpb25BbnN3ZXItOTYwMzEz',
              jobPositionQuestion: {
                id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xOTU1MDk',
                template: null,
                updatedAt: '2022-04-12T02:49:38+02:00'
              },
              value: 'This part was obfuscated, some content was here.',
              jobPositionQuestionFullRender:
                'Please provide specific availability windows for interviewing within the next 5 business days. Include hour and time zone. OR confirm if your TopScheduler is up-to-date.',
              updatedAt: '2022-04-12T05:51:50+02:00',
              talent: {
                id: 'VjEtVGFsZW50LTI1NTQ2NjM',
                mainBookingPage: {
                  id: 'VjEtQm9va2luZ1BhZ2UtMTA0MTc',
                  slug: 'BookingPage10640',
                  __typename: 'BookingPage'
                }
              }
            }
          ]
        : [],
      totalCount: hasJobPositionAnswers ? 7 : 0,
      __typename: 'JobPositionAnswerConnection'
    },
    operations: {
      rejectJobApplicant: {
        callable: 'ENABLED',
        messages: [],
        __typename: 'Operation'
      },
      emailJobApplicant: {
        callable: 'ENABLED',
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'JobApplicationOperations'
    },
    status: 'PENDING',
    talent: {
      id: 'VjEtVGFsZW50LTI1NTQ2NjM',
      allocatedHours: 40,
      type: 'Developer',
      fullName: 'Star Durgan',
      deltaWaitingDays: 5,
      lastClosedEngagementEndDate: '2022-04-08',
      lastAvailabilityIncreaseDate: '2021-08-30',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/talents/2554663',
        __typename: 'Link'
      },
      timeZone: {
        name: '(UTC+05:30) Asia - Calcutta',
        value: 'Asia/Calcutta',
        __typename: 'TimeZone'
      },
      engagements: {
        counters: {
          workingNumber: 0,
          clientsNumber: 1,
          repeatedClientsNumber: 0,
          acceptedInterviewsNumber: 2,
          approvedTrialsNumber: 1,
          interviewsNumber: 5,
          successRate: 20,
          trialsNumber: 1,
          __typename: 'TalentEngagementsCounters'
        },
        __typename: 'TalentEngagementConnection'
      },
      __typename: 'Talent'
    },
    talentPitch: hasTalentPitch
      ? {
          id: 'VjEtVGFsZW50UGl0Y2gtMjczNTE3',
          pitchText: 'This part was obfuscated, some content was here.',
          __typename: 'TalentPitch'
        }
      : {},
    __typename: 'JobApplication'
  } as unknown as JobApplicationFragment)
