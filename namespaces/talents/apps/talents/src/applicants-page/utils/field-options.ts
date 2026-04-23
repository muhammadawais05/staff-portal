import { NOT_SELECTED_OPTION } from '@staff-portal/config'
import {
  TalentActivationFilter,
  SearchApplicantsFilter
} from '@staff-portal/graphql/staff'

export const APPLICATION_FORM_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Submitted', value: 'true' },
  { label: 'Not Submitted', value: 'false' }
]

export const SCREENING_OPTIONS = [
  { label: 'All', value: SearchApplicantsFilter.ALL.toLowerCase() },
  {
    label: 'In Prescreening',
    value: SearchApplicantsFilter.IN_PRESCREENING.toLowerCase()
  },
  {
    label: 'Pending English Scheduling',
    value: SearchApplicantsFilter.PENDING_ENGLISH_SCHEDULING.toLowerCase()
  },
  {
    label: 'Pending English Completion',
    value: SearchApplicantsFilter.PENDING_ENGLISH_COMPLETION.toLowerCase()
  },
  {
    label: 'English Approved',
    value: SearchApplicantsFilter.ENGLISH_APPROVED.toLowerCase()
  },
  {
    label: 'Pending Online Test Completion',
    value: SearchApplicantsFilter.PENDING_ONLINE_TEST_COMPLETION.toLowerCase()
  },
  {
    label: 'Pending Tech Screen One Scheduling',
    value:
      SearchApplicantsFilter.PENDING_TECH_SCREEN_ONE_SCHEDULING.toLowerCase()
  },
  {
    label: 'Pending Tech Screen One Completion',
    value:
      SearchApplicantsFilter.PENDING_TECH_SCREEN_ONE_COMPLETION.toLowerCase()
  },
  {
    label: 'Pending Tech Screen Two Scheduling',
    value:
      SearchApplicantsFilter.PENDING_TECH_SCREEN_TWO_SCHEDULING.toLowerCase()
  },
  {
    label: 'Pending Tech Screen Two Completion',
    value:
      SearchApplicantsFilter.PENDING_TECH_SCREEN_TWO_COMPLETION.toLowerCase()
  },
  {
    label: 'Tech Screen Two Approved',
    value: SearchApplicantsFilter.TECH_SCREEN_TWO_APPROVED.toLowerCase()
  },
  {
    label: 'In Screening',
    value: SearchApplicantsFilter.IN_SCREENING.toLowerCase()
  }
]

export const ACTIVATION_OPTIONS = [
  { label: 'All', value: TalentActivationFilter.ALL.toLowerCase() },
  {
    label: 'Pending Profile Creation',
    value: TalentActivationFilter.PENDING_PROFILE_CREATION.toLowerCase()
  },
  {
    label: 'Pending Profile Editing',
    value: TalentActivationFilter.PENDING_PROFILE_EDITING.toLowerCase()
  },
  {
    label: 'Toptal Email Not Approved',
    value: TalentActivationFilter.TOPTAL_EMAIL_NOT_APPROVED.toLowerCase()
  },
  {
    label: 'Toptal Email Not Claimed',
    value: TalentActivationFilter.TOPTAL_EMAIL_NOT_CLAIMED.toLowerCase()
  }
]
