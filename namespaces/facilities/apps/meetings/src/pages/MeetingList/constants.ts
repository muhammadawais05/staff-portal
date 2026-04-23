import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'

export const MEETING_CATEGORY_TITLE: Record<MeetingPeriodEnum, string> = {
  [MeetingPeriodEnum.unresolved]: 'Unresolved Meetings',
  [MeetingPeriodEnum.today]: "Today's Meetings",
  [MeetingPeriodEnum.future]: 'Future Meetings'
}
