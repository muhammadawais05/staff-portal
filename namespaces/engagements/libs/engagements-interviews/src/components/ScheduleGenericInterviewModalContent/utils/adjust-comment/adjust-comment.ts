import { InterviewCommunicationType } from '@staff-portal/graphql/staff'

export const ZOOM_PLACEHOLDER = '<<MATCHER_ZOOM_URL>>'

export const adjustComment = ({
  comment,
  communication
}: {
  comment?: string | null
  communication?: InterviewCommunicationType | null
}): string => {
  const updatedComment = comment ?? ''

  if (
    communication === InterviewCommunicationType.CUSTOM_WEB_CONFERENCE &&
    !updatedComment.includes(ZOOM_PLACEHOLDER)
  ) {
    return `${updatedComment}\n${ZOOM_PLACEHOLDER}`.trim()
  }

  return updatedComment
}
