import {
  NextCheckResponsibleRoleTypes as ResponsibleRoleTypes,
  NextCheckTalentActions as TalentActions,
  NextCheckStaffActions as StaffActions
} from '@staff-portal/graphql/staff'

export const STAFF_ACTIONS = [
  {
    text: 'Complete pre-screening',
    value: StaffActions.COMPLETE_PRE_SCREENING
  },
  {
    text: 'English Recording review',
    value: StaffActions.ENGLISH_RECORDING_REVIEW
  },
  {
    text: 'OFAC investigation',
    value: StaffActions.OFAC_INVESTIGATION
  },
  {
    text: 'Online Test Skip review',
    value: StaffActions.ONLINE_TEST_SKIP_REVIEW
  },
  {
    text: 'Send Online Test/Portfolio',
    value: StaffActions.SEND_ONLINE_TEST_OR_PORTFOLIO
  },
  {
    text: 'Review Online Test results',
    value: StaffActions.REVIEW_ONLINE_TEST_RESULTS
  },
  {
    text: 'Portfolio review',
    value: StaffActions.PORTFOLIO_REVIEW
  },
  {
    text: 'Send invitation for a call',
    value: StaffActions.SEND_INVITATION_TO_SCHEDULE_THE_CALL
  },
  {
    text: 'Open additional slot in the calendar',
    value: StaffActions.OPEN_ADDITIONAL_SLOT_IN_CALENDAR
  },
  {
    text: 'Decide outcome of the call',
    value: StaffActions.DECIDE_CALL_OUTCOME
  },
  {
    text: 'Send T2 project',
    value: StaffActions.SEND_TEST_PROJECT
  },
  {
    text: 'Review profile',
    value: StaffActions.REVIEW_PROFILE
  },
  {
    text: 'Complete Profile Editing',
    value: StaffActions.COMPLETE_PROFILE_EDITING
  },
  {
    text: 'Review Legal documents',
    value: StaffActions.REVIEW_LEGAL_DOCUMENTS
  },
  {
    text: 'Other',
    value: StaffActions.OTHER
  }
]

export const TALENT_ACTIONS = [
  {
    text: 'Accept Confidentiality agreement',
    value: TalentActions.ACCEPT_CONFIDENTIALITY_AGREEMENT
  },
  {
    text: 'Provide Updated resume',
    value: TalentActions.PROVIDE_UPDATED_RESUME
  },
  {
    text: 'Complete Application submission pages',
    value: TalentActions.COMPLETE_APPLICATION_SUBMISSION_PAGES
  },
  {
    text: 'Schedule the call',
    value: TalentActions.SCHEDULE_THE_CALL
  },
  {
    text: 'Reschedule the call for earlier',
    value: TalentActions.RESCHEDULE_CALL_FOR_EARLIER
  },
  {
    text: 'Complete Online Test',
    value: TalentActions.COMPLETE_ONLINE_TEST
  },
  {
    text: 'Submit Portfolio for review',
    value: TalentActions.SUBMIT_PORTFOLIO_FOR_REVIEW
  },
  {
    text: 'Provide Online Test feedback',
    value: TalentActions.PROVIDE_ONLINE_TEST_FEEDBACK
  },
  {
    text: 'Complete ID verification',
    value: TalentActions.COMPLETE_ID_VERIFICATION
  },
  {
    text: 'Confirm Platform Agreement/Training',
    value: TalentActions.CONFIRM_PLATFORM_AGREEMENT_AND_TRAINING
  },
  {
    text: 'Submit Profile for review',
    value: TalentActions.SUBMIT_PROFILE_FOR_REVIEW
  },
  {
    text: 'Re-submit Profile for review after feedback',
    value: TalentActions.RE_SUBMIT_PROFILE_FOR_REVIEW_AFTER_FEEDBACK
  },
  {
    text: 'Re-submit Profile Picture',
    value: TalentActions.RE_SUBMIT_PROFILE_PICTURE
  },
  {
    text: 'Sign Legal documents',
    value: TalentActions.SIGN_LEGAL_DOCUMENTS
  },
  {
    text: 'Select Payment method',
    value: TalentActions.SELECT_PAYMENT_METHOD
  },
  {
    text: 'Resume application after pausing',
    value: TalentActions.RESUME_APPLICATION_AFTER_PAUSING
  },
  {
    text: 'Other',
    value: TalentActions.OTHER
  }
]

export const RESPONSIBLE_ROLE_TYPE_OPTIONS = [
  {
    label: 'Staff',
    value: ResponsibleRoleTypes.STAFF
  },
  {
    label: 'Talent',
    value: ResponsibleRoleTypes.TALENT
  }
]

export const ROLE_TYPE_ACTION_OPTIONS: Record<
  string,
  { text: string; value: string }[]
> = {
  [ResponsibleRoleTypes.TALENT]: TALENT_ACTIONS,
  [ResponsibleRoleTypes.STAFF]: STAFF_ACTIONS
}

export const ACTION_NEEDED_OPTIONS: {
  [key: string]: { label: string; value: string }
} = {
  yes: {
    label: 'Yes',
    value: '1'
  },
  no: {
    label: 'No',
    value: '0'
  }
}
