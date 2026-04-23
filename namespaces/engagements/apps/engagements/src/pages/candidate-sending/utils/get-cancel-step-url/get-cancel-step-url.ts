import { decodeEntityId } from '@staff-portal/data-layer-service'
import {
  getDashboardPath,
  getJobPath,
  getTalentProfilePath
} from '@staff-portal/routes'

const getCancelStepUrl = ({
  jobId,
  talentId
}: {
  jobId: string | null
  talentId: string | null
}): string => {
  if (jobId) {
    return getJobPath(decodeEntityId(jobId).id)
  }

  if (talentId) {
    return getTalentProfilePath(decodeEntityId(talentId).id)
  }

  return getDashboardPath()
}

export default getCancelStepUrl
