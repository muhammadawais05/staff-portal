import { encodeEntityId } from '@staff-portal/data-layer-service'
import { EngagementStatus } from '@staff-portal/graphql/staff'

export const getAvailabilityStepTalentCandidateDataResponse = () => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Andrei Mocanu',
      type: 'Designer',
      photo: null,
      profileLink: {
        url: 'https://staging.toptal.net/platform/staff/talents/1287048',
        newTab: false,
        __typename: 'TalentProfileLink'
      },
      email: 'cypress_testing@toptal.io',
      toptalEmail: 'cypress_toptal_testing@toptal.io',
      skype: 'skype123',
      additionalSkypeIds: {
        nodes: [],
        __typename: 'StringConnection'
      },
      cityDescription: 'Lisbon',
      currentInterviews: {
        totalCount: 1,
        inLast2DaysCounts: [],
        inLast2To7DaysCounts: [
          {
            count: 1,
            interviewStatus: null,
            engagementStatus: EngagementStatus.PENDING_EXPIRATION,
            __typename: 'TalentCurrentInterviewsEntry'
          }
        ],
        __typename: 'TalentCurrentInterviews'
      },
      timeZone: {
        name: '(UTC+01:00) Europe - Lisbon',
        value: 'Europe/Lisbon',
        __typename: 'TimeZone'
      },
      locationV2: {
        country: {
          id: 'VjEtQ291bnRyeS0xNzc',
          name: 'Portugal',
          __typename: 'Country'
        },
        cityName: 'Lisbon',
        __typename: 'Location'
      },
      engagements: {
        counters: {
          trialsNumber: 21,
          workingNumber: 3,
          clientsNumber: 20,
          repeatedClientsNumber: 0,
          __typename: 'TalentEngagementsCounters'
        },
        __typename: 'TalentEngagementConnection'
      },
      phoneContacts: {
        nodes: [
          {
            id: 'VjEtQ29udGFjdC0xNzQ0Nzkx',
            value: '+351961972025',
            primary: true,
            __typename: 'Contact'
          }
        ],
        __typename: 'ContactConnection'
      },
      __typename: 'Talent'
    }
  }
})
