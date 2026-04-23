import { InterviewKind } from '@staff-portal/graphql/staff'

export const getScheduleInterviewEventTitle = ({
  kind,
  jobTitle,
  clientFullName
}: {
  kind: InterviewKind
  jobTitle: string
  clientFullName?: string
}) => {
  switch (kind) {
    case InterviewKind.EXTERNAL:
      return `${jobTitle} at ${clientFullName}`
    case InterviewKind.INTERNAL:
      return jobTitle
    default:
      return undefined
  }
}
