import { addQueryParams, getOrigin } from '@staff-portal/navigation'
import { decodeEntityId } from '@staff-portal/data-layer-service'

export const getPublicProfileUrl = (
  resumeUrl: string,
  talentId: string,
  jobId?: string
) => {
  if (!jobId) {
    return resumeUrl
  }

  return addQueryParams(`${getOrigin()}/platform/staff/resume_token`, {
    job_id: decodeEntityId(jobId).id,
    talent_id: decodeEntityId(talentId).id,
    forward_job_id: 'true'
  })
}
