import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

export const getJobApplicationResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'JobApplication'),
      approveUrl:
        'https://staging.toptal.net/platform/staff/engagements/new?engagement%5Bjob_id%5D=289434&engagement%5Btalent_id%5D=2554663',
      approveUrlTooltip: null,
      createdAt: '2022-04-12T05:51:50+02:00',
      emailMessaging: {
        id: encodeEntityId('123', 'EmailMessagingJobApplication'),
        __typename: 'EmailMessagingJobApplication'
      },
      job: {
        id: encodeEntityId('123', 'Job'),
        client: {
          id: encodeEntityId('123', 'Client'),
          enterprise: false,
          fullName: 'Koss, Schaden and Tromp',
          webResource: {
            url: 'https://staging.toptal.net/platform/staff/companies/1384898',
            text: 'Koss, Schaden and Tromp',
            __typename: 'Link'
          },
          __typename: 'Client'
        },
        commitment: 'full_time',
        description: 'Lorem ipsum dolor sit amet',
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
        nodes: [],
        totalCount: 0,
        __typename: 'JobPositionAnswerConnection'
      },
      operations: {
        rejectJobApplicant: enabledOperationMock(),
        emailJobApplicant: enabledOperationMock(),
        __typename: 'JobApplicationOperations'
      },
      status: 'PENDING',
      talent: {
        id: encodeEntityId('123', 'Talent'),
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
      talentPitch: {
        id: encodeEntityId('123', 'TalentPitch'),
        pitchText: 'This part was obfuscated, some content was here.',
        __typename: 'TalentPitch'
      },
      __typename: 'JobApplication'
    }
  }
})
