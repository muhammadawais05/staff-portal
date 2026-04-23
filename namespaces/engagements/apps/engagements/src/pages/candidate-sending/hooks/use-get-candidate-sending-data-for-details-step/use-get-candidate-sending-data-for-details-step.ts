import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import { GetDetailsStepDataDocument } from '../../data/get-details-step-data'
import useNewEngagementWizardQuery from '../use-new-engagement-wizard-query'

const useGetCandidateSendingDataForDetailsStep = (
  talentId: string | null,
  attributes: NewEngagementWizardAttributes
) => {
  const { data, initialLoading } = useNewEngagementWizardQuery(
    GetDetailsStepDataDocument,
    {
      variables: {
        talentId: talentId ?? '',
        hasTalentId: !!talentId,
        attributes
      }
    }
  )

  return {
    data,
    loading: initialLoading
  }
}

export default useGetCandidateSendingDataForDetailsStep
