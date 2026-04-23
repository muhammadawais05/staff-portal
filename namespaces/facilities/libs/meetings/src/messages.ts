import { CancelMeetingPostActionName } from '@staff-portal/graphql/staff'
import { defineMessage } from '@toptal/staff-portal-message-bus'

export const REFRESH_MEETING_LIST = defineMessage()
export const MEETING_CANCELED = defineMessage<{
  meetingId: string
  attendeeId?: string
  nextActionName?: CancelMeetingPostActionName | null
  emailTemplateId?: string
}>()
