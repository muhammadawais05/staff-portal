import { CandidateSendingPageQueryParamsValues } from '../../types'

export const getCandidateSendingUrlParams = (
  urlValues: CandidateSendingPageQueryParamsValues
) => ({
  engagementId: urlValues?.engagement?.id ?? urlValues?.id,
  jobId: urlValues?.engagement?.job_id ?? urlValues?.job_id,
  talentId: urlValues?.engagement?.talent_id ?? urlValues?.talent_id,
  hasPendingAssignment:
    urlValues?.engagement?.has_pending_assignment ??
    urlValues?.has_pending_assignment
})
