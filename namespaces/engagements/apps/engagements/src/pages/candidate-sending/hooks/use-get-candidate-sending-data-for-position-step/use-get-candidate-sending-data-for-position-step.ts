import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import { GetPositionStepDataDocument } from '../../data/get-position-step-data'
import useNewEngagementWizardQuery from '../use-new-engagement-wizard-query'

const useGetCandidateSendingDataForPositionStep = (
  attributes: NewEngagementWizardAttributes
) => {
  const { data, initialLoading } = useNewEngagementWizardQuery(
    GetPositionStepDataDocument,
    {
      variables: { attributes }
    }
  )

  return {
    data,
    loading: initialLoading
  }
}

export default useGetCandidateSendingDataForPositionStep
