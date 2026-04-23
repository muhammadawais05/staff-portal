import React from 'react'
import { useQueryParamsState } from '@staff-portal/query-params-state'

import {
  CandidateSendingProvider,
  CandidateSendingPageContent
} from './containers'
import { CandidateSendingPageQueryParamsValues } from './types'
import { CANDIDATE_SENDING_QUERY_PARAMS_CONFIG } from './config'
import { getCandidateSendingUrlParams } from './utils'

const CandidateSendingPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [urlValues, _, resolving] =
    useQueryParamsState<CandidateSendingPageQueryParamsValues>(
      CANDIDATE_SENDING_QUERY_PARAMS_CONFIG
    )

  if (resolving) {
    return null
  }

  const { engagementId, jobId, talentId, hasPendingAssignment } =
    getCandidateSendingUrlParams(urlValues)

  return (
    <CandidateSendingProvider
      engagementId={engagementId}
      jobId={jobId}
      talentId={talentId}
      hasPendingAssignment={hasPendingAssignment}
    >
      <CandidateSendingPageContent jobId={jobId} talentId={talentId} />
    </CandidateSendingProvider>
  )
}

export default CandidateSendingPage
