import { InterviewCumulativeStatus } from '@staff-portal/graphql/staff'
import { getRoleTypeText } from '@staff-portal/facilities'

export const getInterviewStatusText = ({
  talentType
}: {
  talentType?: string
}): Record<InterviewCumulativeStatus, string> => ({
  [InterviewCumulativeStatus.PENDING]: 'Not scheduled',
  [InterviewCumulativeStatus.SCHEDULED]: 'Waiting for confirmation',
  [InterviewCumulativeStatus.TIME_REJECTED]: 'Interview time rejected',
  [InterviewCumulativeStatus.TIME_ACCEPTED]: 'Interview time confirmed',
  [InterviewCumulativeStatus.MISSED]: 'Missed',
  [InterviewCumulativeStatus.ACCEPTED]: `${talentType} accepted`,
  [InterviewCumulativeStatus.REJECTED]: `${talentType} rejected`,
  [InterviewCumulativeStatus.OCCURRED]: 'Interview occurred',
  [InterviewCumulativeStatus.OCCURRED_VERIFIED_BY_STAFF]: 'Interview occurred',
  [InterviewCumulativeStatus.NOT_OCCURRED]: 'Interview not occurred',
  [InterviewCumulativeStatus.NOT_OCCURRED_VERIFIED_BY_STAFF]:
    'Interview not occurred'
})

export default ({
  interviewStatus,
  talentType = 'Talent'
}: {
  interviewStatus: InterviewCumulativeStatus
  talentType?: string
}) => {
  const formattedTalentType = getRoleTypeText(talentType)

  return getInterviewStatusText({ talentType: formattedTalentType })[
    interviewStatus
  ]
}
