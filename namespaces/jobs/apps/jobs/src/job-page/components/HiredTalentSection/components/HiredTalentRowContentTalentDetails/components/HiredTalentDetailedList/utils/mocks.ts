import { GetHiredTalentContentQuery } from '../../../../../data/get-hired-talent-content/get-hired-talent-content.staff.gql.types'

export const engagementCommitmentDataMock = {
  id: 'VjEtRW5nYWdlbWVudC0zMDczMzM',
  startDate: undefined,
  trialLength: 5,
  client: {
    id: 'VjEtQ2xpZW50LTYxNjg2NQ',
    netTerms: 10,
    enterprise: false,
    preferredBillingOption: {
      id: 'VjEtQUNIQmlsbGluZ09wdGlvbi0xODkwNTU',
      billingMethod: 'ACH',
      discountable: true,
      __typename: 'ACHBillingOption'
    },
    __typename: 'Client'
  },
  discountMultiplier: '0.97',
  commitment: 'HOURLY',
  billCycle: 'BI_WEEKLY',
  extraHoursEnabled: false,
  commitmentSettings: {
    id: 'VjEtQ29tbWl0bWVudFNldHRpbmdzLTcxMzgyNg',
    minimumHours: 5,
    __typename: 'CommitmentSettings'
  },
  commitmentAtStartDate: {
    availability: 'hourly',
    canBeDiscounted: true,
    adjustedCompanyRate: {
      availability: 'HOUR',
      value: '297.0',
      __typename: 'CommitmentRate'
    },
    adjustedRevenueRate: {
      availability: 'HOUR',
      value: '88.09',
      __typename: 'CommitmentRate'
    },
    adjustedTalentRate: {
      availability: 'HOUR',
      value: '200.0',
      __typename: 'CommitmentRate'
    },
    __typename: 'AdjustedCommitment'
  },
  currentCommitment: {
    availability: 'hourly',
    adjustedCompanyRate: {
      availability: 'HOUR',
      value: '168.0',
      hourlyHint: null,
      __typename: 'CommitmentRate'
    },
    adjustedRevenueRate: {
      availability: 'HOUR',
      value: '62.96',
      hourlyHint: null,
      __typename: 'CommitmentRate'
    },
    adjustedTalentRate: {
      availability: 'HOUR',
      value: '100.0',
      hourlyHint: null,
      __typename: 'CommitmentRate'
    },
    canBeDiscounted: true,
    __typename: 'AdjustedCommitment'
  },
  __typename: 'Engagement',
  talent: {
    id: 'VjEtVGFsZW50LTI5MzE4MTU',
    type: 'Developer',
    fullName: 'Alexis Bins',
    resumeUrl: 'https://staging.toptal.net/resume/obfuscated_slug_1735643',
    photo: null,
    talentPartner: null,
    __typename: 'Talent',
    webResource: {
      text: 'Alexis Bins',
      url: 'https://staging.toptal.net/platform/staff/talents/2931815',
      __typename: 'Link'
    }
  },
  weeklyHours: 0,
  billingCycles: {
    nodes: [],
    __typename: 'BillingCyclesConnection'
  },
  operations: {
    changeEngagementTrialLength: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    updateEngagementExtraHoursEnabled: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    updateEngagementWeeklyHours: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    editEngagementCommitment: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'EngagementOperations'
  },
  resumeUrl: 'https://staging.toptal.net/resume/obfuscated_slug_1735643'
} as NonNullable<GetHiredTalentContentQuery['node']>
