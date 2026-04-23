import { addQueryParams } from '@staff-portal/navigation'
import { decodeEntityId } from '@staff-portal/data-layer-service'

const JOB_ID_QUERY_PARAM_KEY = 'engagement[job_id]'

export const getSendToJobUrl = (
  sendToJobUrl?: string | null,
  jobId?: string
) => {
  if (!sendToJobUrl) {
    return ''
  }

  if (!jobId) {
    return sendToJobUrl
  }

  return addQueryParams(sendToJobUrl, {
    [JOB_ID_QUERY_PARAM_KEY]: decodeEntityId(jobId).id
  })
}
