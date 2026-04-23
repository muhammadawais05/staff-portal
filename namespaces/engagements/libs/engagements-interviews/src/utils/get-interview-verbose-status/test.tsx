import { InterviewCumulativeStatus } from '@staff-portal/graphql/staff'
import { getRoleTypeText } from '@staff-portal/facilities'

import getInterviewVerboseStatus, {
  getInterviewStatusText
} from './get-interview-verbose-status'

const TALENT_TYPE = 'FinanceExpert'
const FORMATTED_TALENT_TYPE = getRoleTypeText(TALENT_TYPE)

const INTERVIEW_STATUS_TEXT_MAP = getInterviewStatusText({
  talentType: FORMATTED_TALENT_TYPE
})

describe('getInterviewVerboseStatus', () => {
  it.each(Object.keys(INTERVIEW_STATUS_TEXT_MAP))(
    'returns valid status message for %s',
    status => {
      const statusMessage = getInterviewVerboseStatus({
        interviewStatus: status as InterviewCumulativeStatus,
        talentType: TALENT_TYPE
      })

      expect(statusMessage).toBe(
        INTERVIEW_STATUS_TEXT_MAP[status as InterviewCumulativeStatus]
      )
    }
  )
})
