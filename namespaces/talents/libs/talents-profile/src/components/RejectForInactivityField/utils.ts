import {
  TalentCumulativeStatus,
  OfacStatus,
  InactivityRejectionDeadlineTypes
} from '@staff-portal/graphql/staff'

import { ActivationStatus } from './config'
import { TalentRejectForInactivityFragment } from './data/talent-reject-for-inactivity-fragment/talent-reject-for-inactivity-fragment.staff.gql.types'

export const hasOngoingActivation = (
  activation: TalentRejectForInactivityFragment['activation']
) =>
  activation?.status === ActivationStatus.InProgress ||
  activation?.status === ActivationStatus.Paused

export const hasOngoingScreening = (
  cumulativeStatus: TalentCumulativeStatus,
  specializationApplications: TalentRejectForInactivityFragment['specializationApplications'],
  ofacStatus?: OfacStatus | null
) =>
  (cumulativeStatus === TalentCumulativeStatus.APPLIED ||
    cumulativeStatus === TalentCumulativeStatus.IN_ONBOARDING ||
    cumulativeStatus === TalentCumulativeStatus.PENDING_PROFILE ||
    cumulativeStatus === TalentCumulativeStatus.ACTIVE) &&
  ofacStatus !== OfacStatus.INVESTIGATION &&
  !!specializationApplications?.nodes?.length

export const INACTIVITY_DEADLINE_LABEL_MAP: Record<
  InactivityRejectionDeadlineTypes,
  string
> = {
  ACKNOWLEDGE_CONFIDENTIALITY: 'Acknowledge Confidentiality',
  BOOK_ENGLISH_STEP_MEETING: 'Book English Step Meeting',
  BOOK_TECHNICAL_ONE_STEP_MEETING: 'Book Technical 1 Step Meeting',
  BOOK_TECHNICAL_TWO_STEP_MEETING: 'Book Technical 2 Step Meeting',
  CHECK_ONLINE_TEST_ATTITUDE_EMAIL: 'Check Attitude Email',
  CONFIRM_EMAIL: 'Confirm Email',
  ONLINE_TEST: 'Online Test',
  PRESCREENING_RECORDING: 'Prescreening Recording',
  SUBMIT_APPLICATION_DETAILS: 'Application Details',
  UPLOAD_PORTFOLIO: 'Upload Portfolio'
}
