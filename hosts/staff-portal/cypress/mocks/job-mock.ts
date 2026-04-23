/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  Job,
  BusinessTypes,
  JobWorkType,
  JobHoursOverlap,
  FieldCheckResult,
  ContactType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '.'
import { applicationsMock } from './fragments/applications-mock'
import { jobSourcingRequestMock } from './job-sourcing-request-mock'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

const jobMock = (overrides: RecursivePartial<Job> = {}) => ({
  id: encodeEntityId('123', 'Job'),
  preferHoursOverlapping: true,
  title: 'Junior Marketing Designer (123)',
  rehire: false,
  highPriority: true,
  highPriorityReason: 'test reason',
  availabilityRequests: {
    nodes: [],
    totalCount: 0
  },
  categories: { nodes: [{ id: '1', name: 'category' }] },
  claimer: null,
  claimerHandoff: null,
  claimerOrHandoff: {
    id: 'VjEtU3RhZmYtMjU5NDU0Mw',
    fullName: 'Ana Balderramas',
    webResource: {
      text: 'Ana Balderramas',
      url: 'https://staging.toptal.net/platform/staff/staff/2594543'
    }
  },
  currentSalesOwner: {
    owner: {
      id: 'VjEtU3RhZmYtMjQ0MjQ4Ng',
      fullName: 'Andrew Cavin',
      webResource: {
        text: 'Andrew Cavin',
        url: 'https://staging.toptal.net/platform/staff/staff/2442486'
      }
    },
    relationship: 'RM'
  },
  client: {
    id: 'VjEtQ2xpZW50LTMwODExMA',
    fullName: 'Olson-Schulist UP',
    enterprise: false,
    accountManager: null,
    clientPartner: null,
    emailMessagesUrl:
      'https://staging.toptal.net/platform/staff/companies/2887212/email_messages',
    relationshipManager: null,
    webResource: {
      text: 'Olson-Schulist UP',
      url: 'https://staging.toptal.net/platform/staff/companies/1427170'
    },
    fullTimeDiscount: '0',
    partTimeDiscount: '0',
    businessType: BusinessTypes.ENTERPRISE_BUSINESS,
    claimer: {
      id: 'VjEtU3RhZmYtNjgzODM0',
      fullName: 'Ali Hammoud',
      webResource: {
        text: 'Ali Hammoud',
        url: 'https://staging.toptal.net/platform/staff/staff/683834'
      }
    },
    contact: {
      id: encodeEntityId('1', 'CompanyRepresentative'),
      fullName: 'John Doe',
      email: 'john@doe.com',
      phoneNumber: '+791111111',
      nodes: [
        {
          id: encodeEntityId('1', 'Contact'),
          primary: true,
          type: ContactType.PHONE,
          value: 'test-value'
        }
      ]
    },
    opportunities: {
      nodes: [
        {
          id: '123',
          name: 'Senior Designer'
        }
      ]
    },
    representatives: {
      nodes: [],
      totalCount: 0
    }
  },
  countryRequirements: {
    nodes: [{ code: 'US', id: '1', name: 'United States' }]
  },
  commitment: 'hourly',
  cumulativeStatus: 'PENDING_ENGINEER',
  currentInvestigation: null,
  historyLink: {
    url: '/platform/staff/jobs/123/performed_actions/recent'
  },
  contacts: {
    edges: [],
    nodes: [
      {
        id: 'VjEtQ29udGFjdC0zMzQ4ODYz',
        primary: true,
        type: ContactType.PHONE,
        value: 'test-value',
        webResource: {
          text: 'Web Resource Text',
          url: 'https://example.com',
          __typename: 'Link'
        },
        external: false,
        operations: { callContact: enabledOperationMock() },
        email: 'test-email'
      }
    ]
  },
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla\nsodales est. Ut porttitor blandit sapien pellentesque pretium. Donec ut diam sed urna venenatis hendrerit. Nulla eros\narcu, mattis vitae congue cursus, tincidunt sed turpis. Curabitur non enim diam, eget elementum dolor. Vivamus enim\ntortor, tempor at vehicula ac, malesuada id est. Praesent at nibh eget metus dapibus dapibus. Donec arcu orci, sagittis\neu interdum vitae, facilisis quis nibh.\n\nMauris luctus molestie velit, at vestibulum magna cursus sit amet. Nulla in accumsan libero. Donec sed sem lectus.\nMauris congue sapien et diam euismod vitae scelerisque diam tincidunt. Praesent a justo enim, vitae venenatis dolor.\nDonec in tortor at magna dap',
  engagementEndedFeedbackReason: null,
  engagements: {
    nodes: [],
    totalCount: 0
  },
  estimatedLength: 'LENGTH_2_4_WEEKS',
  estimatedEndDate: '2021-10-14',
  hiddenForTalents: false,
  hiredCount: 0,
  jobType: 'designer',
  languages: {
    nodes: [{ id: '1', name: 'English' }]
  },
  matcherCallScheduled: false,
  postedAt: '2021-08-16T09:09:59+03:00',
  requiredApplicationPitch: true,
  searchCandidatesUrl:
    'https://staging.toptal.net/platform/staff/jobs/123/search_for_talents',
  semiMonthlyBilling: null,
  originalJob: null,

  probabilityToConvert: {
    category: 'VERY_HIGH',
    score: '0.67173027931612',
    negativeFeatures: [
      {
        name: 'claimed_hour',
        position: 6,
        value: '22'
      }
    ],
    positiveFeatures: [
      {
        name: 'act_percent',
        position: 1,
        value: '87'
      },
      {
        name: 'commitment',
        position: 2,
        value: 'hourly'
      },
      {
        name: 'estimated_length',
        position: 3,
        value: '2-4 weeks'
      },
      {
        name: 'browser',
        position: 4,
        value: 'Missing'
      },
      {
        name: 'prev_active_jobs',
        position: 5,
        value: '7'
      },
      {
        name: 'prev_posted_jobs',
        position: 7,
        value: '8'
      }
    ]
  },
  estimatedValue: '2075.65',
  estimatedRevenue: '3090.0',
  sendCandidateUrl:
    'https://staging.toptal.net/platform/staff/engagements/new?engagement%5Bjob_id%5D=123',
  isSpecializable: true,
  specialization: {
    id: 'VjEtU3BlY2lhbGl6YXRpb24tMzAwMTA',
    title: 'Digital Design'
  },
  startDate: '2021-08-19',
  status: 'PENDING_ENGINEER',
  talentCount: 1,
  timeZonePreference: {
    name: '(UTC+10:00) Australia - Sydney',
    value: 'Australia/Sydney'
  },
  toptalProjects: false,
  hasPreferredHours: true,
  hoursOverlap: 3,
  totalHours: 0,
  visibleAt: '2021-08-17T01:46:48+03:00',
  webResource: {
    url: 'https://staging.toptal.net/platform/staff/jobs/123',
    text: 'Junior Marketing Designer (123)'
  },
  invoiceNote: null,
  sourcingRequest: overrides.sourcingRequest || jobSourcingRequestMock({}),
  possiblyRelatedMeetings: {
    nodes: []
  },
  operations: {
    approveJob: enabledOperationMock(),
    removeJob: enabledOperationMock(),
    updateJob: enabledOperationMock(),
    cloneJob: enabledOperationMock(),
    addJobMatchingNote: enabledOperationMock(),
    updateJobMatcherQuestions: enabledOperationMock(),
    resumePostponedJob: enabledOperationMock(),
    updateJobEstimatedEndDate: enabledOperationMock(),
    rejectJobApplicant: enabledOperationMock(),
    setJobPriority: enabledOperationMock(),
    updateJobTalentCount: enabledOperationMock(),
    linkJobOpportunity: enabledOperationMock(),
    unlinkJobOpportunity: enabledOperationMock(),
    updateJobPresalesEngagement: enabledOperationMock(),
    updateJobPendingTalentReason: enabledOperationMock(),
    createActivity: enabledOperationMock(),
    removeJobContact: enabledOperationMock(),
    createJobContactFromJob: enabledOperationMock(),
    createSourcingRequest: enabledOperationMock(),
    updateJobClaimer: enabledOperationMock(),
    updateJobSalesOwner: enabledOperationMock(),
    updateJobEstimatedWeeklyRevenueTalent: enabledOperationMock(),
    removeJobAvailabilityRequestsRestriction: enabledOperationMock(),
    resumeSendingJobAway: enabledOperationMock(),
    postponeJob: enabledOperationMock(),
    repostponeJob: enabledOperationMock(),
    refundJobDeposit: enabledOperationMock(),
    cloneJobForRehire: enabledOperationMock(),
    sendJobAway: enabledOperationMock(),
    createAvailabilityRequestForJob: enabledOperationMock()
  },
  opportunity: {
    id: 'OPPORTUNITY-ID-1',
    name: 'Senior Designer',
    active: true,
    age: 6,
    webResource: {
      text: 'Senior Designer',
      url: 'https://staff.portal.stuff'
    }
  },
  applications: applicationsMock(),
  assigned: {
    totalCount: 0
  },
  statusMessages: {
    nodes: [],
    totalCount: 0
  },
  breaks: {
    totalCount: 2,
    nodes: [
      {
        id: 'VjEtRW5nYWdlbWVudC0yNzMwNjM',
        engagementBreaks: {
          nodes: []
        }
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNzI1ODE',
        engagementBreaks: {
          nodes: []
        }
      }
    ]
  },
  candidates: {
    totalCount: 2
  },
  candidateEngagements: {
    edges: []
  },
  inactiveCandidateEngagements: {
    edges: []
  },
  industries: {
    nodes: []
  },
  skillSets: {
    nodes: [],
    totalCount: 0
  },
  candidateIntroDrafts: {
    edges: [
      {
        node: {
          id: '123'
        }
      }
    ]
  },
  currentEngagement: {
    id: encodeEntityId('123', 'Engagement'),
    commitment: 'PART_TIME',
    clientEmailMessaging: {
      id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xMD',
      operations: {
        sendEmailTo: enabledOperationMock()
      }
    },
    nodes: [],
    totalCount: 0
  },
  jobCurrentEngagement: {
    id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xMD',
    clientEmailMessaging: {
      id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xMD',
      operations: {
        sendEmailTo: enabledOperationMock(),
        cancelEngagementTrial: enabledOperationMock()
      }
    },
    nodes: [],
    totalCount: 0
  },
  positionQuestions: {
    nodes: [
      {
        id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvbi0xMDk3NDA',
        comment: '',
        label:
          "The client's time zone is {{ client_timezone }}, and their working hours are {{ client_working_hours }} in your time zone {{ talent_timezone }}. How many hours of overlap can you provide during their workday?",
        required: true,
        template: {
          id: 'VjEtSm9iUG9zaXRpb25RdWVzdGlvblRlbXBsYXRlLTEw',
          position: 11,
          question:
            "The client's time zone is {{ client_timezone }}, and their working hours are {{ client_working_hours }} in your time zone {{ talent_timezone }}. How many hours of overlap can you provide during their workday?"
        }
      }
    ]
  },
  matchingNoteQuestions: {
    nodes: [],
    totalCount: 0
  },
  notes: {
    operations: {
      createNote: enabledOperationMock()
    },
    nodes: [
      {
        answers: {
          nodes: [
            {
              question: {
                id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEx',
                label: 'What is the structure of the team for this job?',
                group: {
                  label: 'Questions'
                }
              },
              id: 'VjEtTm90ZUFuc3dlci03MDM0MDg2',
              label: 'Small team of 2 - 6 talent',
              value: ['Small team of 2 - 6 talent'],
              comment: '',
              displayText: 'Small team of 2 - 6 talent'
            }
          ]
        },
        softSkillRatings: {
          nodes: []
        },
        id: 'VjEtTm90ZS0xNTY2OTY0',
        comment: 'This part was obfuscated, some content was here.',
        createdAt: '2021-08-17T01:30:00+03:00',
        newSalesCall: false,
        checklistSalesCall: false,
        status: 'ACTIVE',
        title: 'Matching Note',
        updatedAt: '2021-08-17T01:30:00+03:00',
        attachment: null,
        creator: {
          id: 'VjEtU3RhZmYtMjU5NDU0Mw',
          webResource: {
            text: 'Ana Balderramas',
            url: 'https://staging.toptal.net/platform/staff/staff/2594543'
          }
        },
        operations: {
          removeNote: enabledOperationMock(),
          removeNoteAttachment: enabledOperationMock(),
          updateNote: enabledOperationMock()
        }
      }
    ]
  },
  relatedTasks: {
    completedCount: 3,
    nodes: []
  },
  pendingTalentReason: 'Some reason',
  pendingTalentReasonNotes: 'Some reason notes',
  estimatedWeeklyRevenueTalent: 50,
  detailedStatus:
    'Interview scheduled for Nov 5, 2021 at 4:30am (confirmed by Top Scheduler)',
  billCycle: 'MONTHLY',
  currentCommitment: {
    availability: 'hourly',
    canBeDiscounted: false,
    adjustedTalentRate: {
      availability: 'HOUR',
      value: '45.0'
    },
    adjustedRevenueRate: {
      availability: 'HOUR',
      value: '25.0'
    },
    adjustedCompanyRate: {
      availability: 'HOUR',
      value: '70.0'
    }
  },
  discountMultiplier: '1',
  trialLength: 10,
  interview: {
    id: 'VjEtSW50ZXJ2aWV3LTIwMzIzNg',
    cumulativeStatus: 'TIME_ACCEPTED'
  },
  job: {
    id: 'VjEtSm9iLTI2Nzk0Ng'
  },
  talent: {
    id: 'VjEtVGFsZW50LTE2NzEwMDY',
    type: 'Designer',
    photo: null,
    fullName: 'Dorian Nienow',
    resumeUrl:
      'https://staging.toptal.net/designers/resume/obfuscated_slug_793024',
    webResource: {
      url: 'https://staging.toptal.net/platform/staff/talents/1671006'
    },
    talentPartner: null,
    slackContacts: {
      nodes: [
        {
          id: 'some-contact-id',
          webResource: {
            url: 'some-slack-url'
          }
        }
      ]
    }
  },
  workingTimeFrom: '12:00:00',
  workingTimeTo: '24:00:00',
  workType: JobWorkType.REMOTE,
  salesforceLink: {
    text: 'Some link',
    url: 'https://google.com'
  },
  hoursOverlapEnum: JobHoursOverlap.HOUR_1,
  timeLengthOnsite: 0,
  fieldCheck: {
    id: 'some-id',
    skills: FieldCheckResult.COMPLETE,
    commitment: FieldCheckResult.COMPLETE,
    companyTimeZone: FieldCheckResult.COMPLETE,
    estimatedLength: FieldCheckResult.COMPLETE,
    hasPreferredHours: FieldCheckResult.COMPLETE,
    hoursOverlap: FieldCheckResult.COMPLETE,
    jobType: FieldCheckResult.COMPLETE,
    maxHourlyRate: FieldCheckResult.COMPLETE,
    projectSpecCompleteness: FieldCheckResult.COMPLETE,
    projectType: FieldCheckResult.COMPLETE,
    startDate: FieldCheckResult.COMPLETE,
    talentCount: FieldCheckResult.COMPLETE,
    title: FieldCheckResult.COMPLETE
  },
  ...overrides
})

export default jobMock
