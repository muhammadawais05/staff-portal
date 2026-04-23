import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  Engagement,
  EngagementCommitmentEnum,
  EngagementStatus,
  EngagementTooltipStatus,
  Job,
  Link,
  Talent
} from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { getClientMock } from './get-client-mock'
import { getEngagementOperations } from './get-engagement-operations'
import { getJobMock } from './get-job-mock'
import { getTalentMock } from './get-talent-mock'

export const getEngagementMock = (
  engagement?: Partial<Engagement>
): Partial<WithTypename<Engagement>> => ({
  __typename: 'Engagement',
  id: encodeEntityId('123', 'Engagement'),
  tooltipStatus: EngagementTooltipStatus.TIMEZONE,
  commitmentAtStartDate: null,
  resumeUrl: null,
  nextTopNumber: null,
  engagementEndedFeedbackReason: null,
  postponedPerformedAction: null,
  status: EngagementStatus.ACTIVE,
  cumulativeStatus: 'ACTIVE',
  trialLength: 0,
  trialEndDate: null,
  startDate: null,
  rejectDate: null,
  endDate: null,
  onHoldStartDate: null,
  restoredAt: null,
  createdAt: '2021-09-24T14:56:58+03:00',
  timeZone: null,
  interviews: null,
  currentEngagementBreak: null,
  interview: null,
  clientEmailMessaging: null,
  talentEmailMessaging: null,
  companyHourlyRate: null,
  talentHourlyRate: null,
  viewIntroDraftV2: null,
  feedbacks: null,
  internalInterview: null,
  newInternalInterview: null,
  newExternalInterview: null,
  commissions: null,
  engagementBreaks: null,
  billCycle: null,
  billDay: null,
  commitment: EngagementCommitmentEnum.FULL_TIME,
  canBeDiscounted: null,
  companyFullTimeRate: null,
  companyPartTimeRate: null,
  extraHoursEnabled: null,
  defaultFullTimeDiscount: null,
  defaultMarkup: null,
  defaultPartTimeDiscount: null,
  defaultUpcharge: null,
  discountMultiplier: null,
  fullTimeDiscount: null,
  markup: null,
  partTimeDiscount: null,
  rateMethod: null,
  rateOverrideReason: null,
  talentFullTimeRate: null,
  talentPartTimeRate: null,
  semiMonthlyPaymentTalentAgreement: null,
  onboardingPlanUrl: null,
  purchaseOrder: null,
  purchaseOrderLine: null,
  talentSentAt: null,
  commitmentSettings: null,
  currentCommitment: null,
  expiresOn: null,
  proposedEnd: null,
  lastRelevantPerformedAction: null,
  billingCycles: {
    totalCount: 0,
    nodes: []
  },
  webResource: {
    text: 'Client Name → Job Name (123)',
    url: 'https://staging.toptal.net/platform/staff/engagements/123',
    __typename: 'Link'
  } as Link,
  ...engagement,
  operations: getEngagementOperations(engagement?.operations),
  client: getClientMock(engagement?.client) as Client,
  talent: getTalentMock(engagement?.talent) as Talent,
  job: getJobMock(engagement?.job) as Job
})
