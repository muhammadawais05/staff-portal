import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  CompanyRepresentativeConnection,
  CountryConnection,
  CumulativeJobStatus,
  IndustryConnection,
  Job,
  JobCategoryConnection,
  JobPositionQuestionConnection,
  JobStatus,
  LanguageConnection,
  Link,
  MeetingSimpleConnection,
  SkillSetConnection
} from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { getClientMock } from './get-client-mock'
import { getJobOperations } from './get-job-operations'

export const getJobMock = (
  job?: Partial<Job> | null
): Partial<WithTypename<Job>> => ({
  __typename: 'Job',
  id: encodeEntityId('123', 'Job'),
  title: 'Job Title',
  postedAt: null,
  hiredCount: 0,
  probabilityToConvert: null,
  estimatedRevenue: null,
  estimatedValue: null,
  rehire: false,
  casesUrl: null,
  assignTalentLink: null,
  sourcingRequest: null,
  sendCandidateUrl: null,
  historyLink: null,
  status: JobStatus.ACTIVE,
  cumulativeStatus: CumulativeJobStatus.ACTIVE,
  searchCandidatesUrl: null,
  searchApplicantsUrl: null,
  searchRejectedTalentsUrl: null,
  jobType: 'developer',
  emailMessaging: null,
  automatedAvailabilityRequests: null,
  searchAllowed: null,
  talentCount: 0,
  webResource: {
    url: 'https://staging.toptal.net/platform/staff/jobs/123',
    text: 'Job Title',
    __typename: 'Link'
  } as Link,
  currentEngagement: null,
  possiblyRelatedMeetings: {
    nodes: [],
    totalCount: 0,
    __typename: 'MeetingSimpleConnection'
  } as MeetingSimpleConnection,
  notActive: false,
  matcherCallScheduled: false,
  claimerHandoff: null,
  currentSalesOwner: null,
  claimer: null,
  requiredApplicationPitch: false,
  hasPreferredHours: false,
  createdAt: '2021-07-28T14:16:19.780Z',
  isSpecializable: true,
  budgetDetails: null,
  uncertainOfBudgetReason: null,
  uncertainOfBudgetReasonComment: null,
  specialization: null,
  timeZonePreference: null,
  highPriority: false,
  highPriorityReason: null,
  commitment: null,
  startDate: null,
  originalJob: null,
  opportunity: null,
  countryRequirements: {
    nodes: [],
    totalCount: 0,
    __typename: 'CountryConnection'
  } as CountryConnection,
  toptalProjects: false,
  languages: {
    nodes: [],
    totalCount: 0,
    __typename: 'LanguageConnection'
  } as LanguageConnection,
  nicheLongShot: null,
  skillLongShot: false,
  categories: {
    nodes: [],
    totalCount: 0,
    __typename: 'JobCategoryConnection'
  } as JobCategoryConnection,
  expectedWeeklyHours: null,
  hiddenForTalents: false,
  commitmentMinimumHours: null,
  maxHourlyRate: 70,
  location: null,
  estimatedLength: null,
  estimatedEndDate: null,
  description: null,
  positionQuestions: {
    nodes: [],
    __typename: 'JobPositionQuestionConnection'
  } as JobPositionQuestionConnection,
  skillSets: {
    nodes: [],
    totalCount: 0,
    __typename: 'SkillSetConnection'
  } as SkillSetConnection,
  industries: {
    nodes: [],
    totalCount: 0,
    __typename: 'IndustryConnection'
  } as IndustryConnection,
  presalesEngagement: null,
  presalesEngagementComment: null,
  pendingTalentReason: null,
  pendingTalentReasonNotes: null,
  estimatedWeeklyRevenueTalent: null,
  workingTimeFrom: null,
  workingTimeTo: null,
  workType: null,
  salesforceLink: null,
  hoursOverlapEnum: null,
  timeLengthOnsite: 0,
  matchingNoteQuestions: null,
  notes: null,
  activitiesAndNotes: null,
  autoConsolidationEnabled: false,
  currentInvestigation: null,
  preferHoursOverlapping: null,
  engagements: null,
  pendingCommitmentChangeRequest: null,
  limitedAvailabilityRequestsExperiment: null,
  noRateLimit: null,
  longshotReasons: null,
  requiresMatchingCallInfo: null,
  availableSpecializations: null,
  vertical: null,
  defaultSkillCategory: null,
  ...job,
  client: getClientMock(job?.client) as Client,
  operations: getJobOperations(job?.operations),
  contacts: {
    edges: [],
    nodes: [],
    totalCount: 0,
    __typename: 'CompanyRepresentativeConnection',
    ...job?.contacts
  } as CompanyRepresentativeConnection
})
