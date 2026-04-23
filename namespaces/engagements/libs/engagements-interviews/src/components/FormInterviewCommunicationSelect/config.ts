import { InterviewCommunicationType } from '@staff-portal/graphql/staff'

export const INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING: Record<
  InterviewCommunicationType,
  string
> = {
  [InterviewCommunicationType.BLUEJEANS]: 'Web Conference (Bluejeans)',
  [InterviewCommunicationType.ZOOM]: 'Web Conference (Zoom)',
  [InterviewCommunicationType.CUSTOM_WEB_CONFERENCE]: 'Web Conference (Other)',
  [InterviewCommunicationType.GOOGLE_HANGOUTS]: 'Google Hangouts',
  [InterviewCommunicationType.PHONE]: 'Phone',
  [InterviewCommunicationType.SKYPE]: 'Skype'
}
