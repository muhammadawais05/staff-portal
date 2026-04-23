import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'

export const NO_MEETING_MESSAGES: Record<MeetingPeriodEnum, string> = {
  [MeetingPeriodEnum.future]: 'No future meetings',
  [MeetingPeriodEnum.today]: 'No meetings scheduled for today',
  [MeetingPeriodEnum.unresolved]: 'No unresolved meetings'
}
