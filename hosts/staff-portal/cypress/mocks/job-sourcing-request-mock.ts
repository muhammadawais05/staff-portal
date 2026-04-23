import {
  SourcingRequestEnterpriseJobStatus,
  OperationCallableTypes,
  SkillRating,
  SourcingRequestStatus,
  Maybe,
  Staff
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

interface Params {
  talentSpecialist?: Maybe<Partial<Staff>>
  status?: SourcingRequestStatus
}

export const jobSourcingRequestMock = ({
  talentSpecialist,
  status
}: Params) => {
  return {
    id: encodeEntityId('2', 'SourcingRequest'),
    additionalNotes: '',
    canIncreaseRate: true,
    canIncreaseRateComment: '',
    canShareCompanyName: false,
    canShareRate: false,
    canShareRateComment: '',
    citizenshipRequirements: false,
    citizenshipRequirementsComment: 'The talent must be USA-based. ',
    webResource: {
      text: 'Some Source',
      url: 'https://staging.toptal.net/platform/staff/staff/1619764',
      __typename: 'Link'
    },
    clientPartner: {
      fullName: 'Fayyaz Adatia',
      id: 'VjEtU3RhZmYtMTYxOTc2NA',
      webResource: {
        text: 'Fayyaz Adatia',
        url: 'https://staging.toptal.net/platform/staff/staff/1619764',
        __typename: 'Link'
      },
      __typename: 'Staff'
    },
    enterpriseJobStatus: SourcingRequestEnterpriseJobStatus.CURRENT_NEED,
    extraInformation: false,
    extraInformationComment: '',
    furtherQualificationInterviews: false,
    furtherQualificationInterviewsComment: '',
    hoursOverlap: null,
    jobStartDeadline: '2021-10-18',
    jobStartDeadlineComment: '',
    maximumTalentHourlyRate: '100.0',
    mustHaveSkillsComment: '',
    niceToHaveSkillsComment: '',
    noTalentHourlyRateLimit: false,
    onSiteDuration: null,
    onSiteLocation: null,
    sourcingRequestTalents: {
      nodes: [],
      __typename: 'SourcingRequestTalentConnection'
    },
    unlinkedSourcingRequestTalents: {
      nodes: [],
      __typename: 'SourcingRequestTalentConnection'
    },
    operations: {
      updateSourcingRequest: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateSourcingRequestStatus: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateSourcingRequestTalentSpecialist: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      __typename: 'SourcingRequestOperations'
    },
    positions: 3,
    positionsComment: '',
    salesClaimer: {
      fullName: 'Jonathan Caplan',
      id: 'VjEtU3RhZmYtMjkwMjM3',
      webResource: {
        text: 'Jonathan Caplan',
        url: 'https://staging.toptal.net/platform/staff/staff/290237',
        __typename: 'Link'
      },
      __typename: 'Staff'
    },
    sellingPoints:
      'We are a software consulting firm based in NYC. Our clients include financial institutions,\r\nFortune 500 companies, and startups. Our product approach is user-focused, design-forward. Our applications are well-thought-out products that are technically sound, well documented, and performant.\r\n\r\nOur culture is deeply collaborative. We pair program, host lunch-and-learns, have group discussions and\r\nwork together to achieve our clients’ goals and to enhance our individual growth through shared\r\nlearnings.',
    skillSets: {
      __typename: 'SourcingRequestSkillSetsConnection',
      nodes: [
        {
          id: 'VjEtU2tpbGxTZXQtMzE4MTk5NQ',
          main: false,
          niceToHave: false,
          rating: SkillRating.STRONG,
          skill: {
            id: 'VjEtU2tpbGwtMzY5MTQ',
            name: 'JavaScript'
          },
          __typename: 'SkillSet'
        },
        {
          id: 'VjEtU2tpbGxTZXQtMzE4MTk5MA',
          main: false,
          niceToHave: true,
          rating: SkillRating.COMPETENT,
          skill: {
            id: 'VjEtU2tpbGwtMzgwNDU',
            name: 'Cloud'
          },
          __typename: 'SkillSet'
        }
      ],
      totalCount: 10
    },
    status: status || SourcingRequestStatus.DRAFTED,
    talentSpecialist,
    timeZonePreference: {
      name: '(UTC-04:00) America - New York',
      value: 'America/New_York',
      __typename: 'TimeZone'
    },
    timeZonePreferenceComment: 'Only USA-based talents',
    whoCoversTravelCosts: null,
    whoCoversTravelCostsComment: null,
    __typename: 'SourcingRequest'
  }
}
