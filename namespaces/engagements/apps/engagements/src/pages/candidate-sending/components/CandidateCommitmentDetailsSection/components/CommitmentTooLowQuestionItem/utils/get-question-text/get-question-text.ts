import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { ENGAGEMENT_COMMITMENT_MAPPING } from '@staff-portal/engagements'

import getRequiredJobHoursVerbose from '../../../../../../utils/get-required-job-hours-verbose'

const getQuestionText = ({
  commitment,
  jobCommitment,
  jobExpectedWeeklyHours
}: {
  commitment: EngagementCommitmentEnum | null | undefined
  jobCommitment?: string | null
  jobExpectedWeeklyHours?: number | null
}) => {
  let commitmentText = commitment
    ? ENGAGEMENT_COMMITMENT_MAPPING[commitment].toLowerCase()
    : 'unknown'

  if (commitment === EngagementCommitmentEnum.HOURLY) {
    const requiredJobHoursVerbose = getRequiredJobHoursVerbose({
      commitment: jobCommitment,
      expectedWeeklyHours: jobExpectedWeeklyHours
    })

    commitmentText += ` (${requiredJobHoursVerbose})`
  }

  return `You're trying to send a talent with 40 hours of availability to a ${commitmentText} job.`
}

export default getQuestionText
