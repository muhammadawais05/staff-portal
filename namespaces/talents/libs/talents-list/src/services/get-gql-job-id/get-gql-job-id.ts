import { encodeEntityId } from '@staff-portal/data-layer-service'

const JOB_TYPE = 'Job'

export const getGqlJobId = (jobId: unknown) => {
  if (!jobId) {
    return
  }

  return encodeEntityId(jobId as string, JOB_TYPE)
}
