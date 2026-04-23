import {
  ActivityType,
  ClientRelatedActivitySubtype,
  TalentRelatedActivitySubtype,
  JobRelatedActivitySubtype,
  InternalActivitySubtype,
  OtherActivitySubtype
} from '@staff-portal/graphql/staff'

import {
  CLIENT_RELATED_SUBTYPE_TEXT_MAPPING,
  INTERNAL_SUBTYPE_TEXT_MAPPING,
  JOB_RELATED_SUBTYPE_TEXT_MAPPING,
  OTHER_SUBTYPE_TEXT_MAPPING,
  TALENT_RELATED_SUBTYPE_TEXT_MAPPING
} from '../../config'
import { mapSelectOption } from '../../data'
const CLIENT_RELATED_SUBTYPE_OPTIONS_ORDER = [
  ClientRelatedActivitySubtype.PRE_SALES_CALL,
  ClientRelatedActivitySubtype.MATCHING_CALL,
  ClientRelatedActivitySubtype.CLIENT_FOLLOW_UP,
  ClientRelatedActivitySubtype.TALENT_TEAM_CALL,
  ClientRelatedActivitySubtype.CROSS_SELL,
  ClientRelatedActivitySubtype.OTHER
]

const TALENT_RELATED_SUBTYPE_OPTIONS_ORDER = [
  TalentRelatedActivitySubtype.REACHOUT,
  TalentRelatedActivitySubtype.FEEDBACK_CALL,
  TalentRelatedActivitySubtype.SUPPORT,
  TalentRelatedActivitySubtype.DISBANDMENT,
  TalentRelatedActivitySubtype.AVAILABILITY_CHANGE,
  TalentRelatedActivitySubtype.RATE_CHANGE,
  TalentRelatedActivitySubtype.OTHER
]

const JOB_RELATED_SUBTYPE_OPTIONS_ORDER = [
  JobRelatedActivitySubtype.CLIENT_CHECK_IN,
  JobRelatedActivitySubtype.TALENT_CHECK_IN,
  JobRelatedActivitySubtype.MATCHING_CALL,
  JobRelatedActivitySubtype.TALENT_VETTING,
  JobRelatedActivitySubtype.TALENT_INTERVIEW,
  JobRelatedActivitySubtype.DISPUTE_OR_INVESTIGATION,
  JobRelatedActivitySubtype.TIMESHEET,
  JobRelatedActivitySubtype.OTHER
]

const INTERNAL_SUBTYPE_OPTIONS_ORDER = [
  InternalActivitySubtype.SALES_SUPPORT,
  InternalActivitySubtype.INTERNAL_MEETING,
  InternalActivitySubtype.TEAM_MEETING,
  InternalActivitySubtype.COORDINATION,
  InternalActivitySubtype.INITIATIVE,
  InternalActivitySubtype.EXPERIMENT,
  InternalActivitySubtype.BILLING_LEGAL_SYNC,
  InternalActivitySubtype.SOURCING_SYNC,
  InternalActivitySubtype.SALES_SYNC,
  InternalActivitySubtype.OTHER
]

const OTHER_SUBTYPE_OPTIONS_ORDER = [OtherActivitySubtype.OTHER]

export const ACTIVITY_SUBTYPE_OPTIONS_MAPPING = {
  [ActivityType.CLIENT_RELATED]: mapSelectOption(
    CLIENT_RELATED_SUBTYPE_TEXT_MAPPING,
    CLIENT_RELATED_SUBTYPE_OPTIONS_ORDER
  ),
  [ActivityType.TALENT_RELATED]: mapSelectOption(
    TALENT_RELATED_SUBTYPE_TEXT_MAPPING,
    TALENT_RELATED_SUBTYPE_OPTIONS_ORDER
  ),
  [ActivityType.JOB_RELATED]: mapSelectOption(
    JOB_RELATED_SUBTYPE_TEXT_MAPPING,
    JOB_RELATED_SUBTYPE_OPTIONS_ORDER
  ),
  [ActivityType.INTERNAL]: mapSelectOption(
    INTERNAL_SUBTYPE_TEXT_MAPPING,
    INTERNAL_SUBTYPE_OPTIONS_ORDER
  ),
  [ActivityType.OTHER]: mapSelectOption(
    OTHER_SUBTYPE_TEXT_MAPPING,
    OTHER_SUBTYPE_OPTIONS_ORDER
  )
}
