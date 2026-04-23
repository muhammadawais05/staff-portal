import {
  InterviewCumulativeStatus,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'

import { EngagementInterviewFragment } from '../../../../data/get-engagement-interviews'
import {
  INTERVIEW_COMMUNICATION_TRANSLATION_MAPPING,
  INTERVIEW_INITIATOR_TRANSLATION_MAPPING
} from '../../config'

export type InitiatorCommentData = Pick<
  EngagementInterviewFragment,
  'communication' | 'cumulativeStatus' | 'initiator' | 'kind'
>

const VALID_STATUSES = [
  InterviewCumulativeStatus.SCHEDULED,
  InterviewCumulativeStatus.TIME_ACCEPTED,
  InterviewCumulativeStatus.MISSED,
  InterviewCumulativeStatus.OCCURRED
]

export const getInitiatorComment = ({
  communication,
  cumulativeStatus,
  initiator,
  kind
}: InitiatorCommentData): string | null => {
  if (!initiator || !VALID_STATUSES.includes(cumulativeStatus)) {
    return null
  }

  // Temporary solution until we can unify "staff" / "company" initiator as "interviewer"
  // JIRA: https://toptal-core.atlassian.net/browse/PRL-1762
  // Wiki: https://toptal-core.atlassian.net/wiki/spaces/GOLD/pages/2024047657/Interviews#Interviews
  const normalizedInitiator: keyof typeof INTERVIEW_INITIATOR_TRANSLATION_MAPPING =
    kind === InterviewKind.INTERNAL &&
    initiator === InterviewInitiator.INTERVIEWER
      ? 'STAFF'
      : initiator

  const initiatorText = `${INTERVIEW_INITIATOR_TRANSLATION_MAPPING[normalizedInitiator]} will initiate the interview`

  if (!communication) {
    return `${initiatorText}.`
  }

  return `${initiatorText} by ${INTERVIEW_COMMUNICATION_TRANSLATION_MAPPING[communication]}.`
}
