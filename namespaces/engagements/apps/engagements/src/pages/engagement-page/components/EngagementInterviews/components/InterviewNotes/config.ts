import {
  InterviewCommunicationType,
  InterviewInitiator
} from '@staff-portal/graphql/staff'

export const INTERVIEW_INITIATOR_TRANSLATION_MAPPING: Record<
  InterviewInitiator | 'STAFF',
  string
> = {
  [InterviewInitiator.INTERVIEWER]: 'The company',
  [InterviewInitiator.CANDIDATE]: 'The candidate',
  STAFF: 'You'
}

export const INTERVIEW_COMMUNICATION_TRANSLATION_MAPPING: Record<
  InterviewCommunicationType,
  string
> = {
  [InterviewCommunicationType.ZOOM]: 'web conference',
  [InterviewCommunicationType.BLUEJEANS]: 'web conference',
  [InterviewCommunicationType.CUSTOM_WEB_CONFERENCE]: 'web conference',
  [InterviewCommunicationType.GOOGLE_HANGOUTS]: 'Google Hangouts',
  [InterviewCommunicationType.PHONE]: 'phone',
  [InterviewCommunicationType.SKYPE]: 'Skype'
}
