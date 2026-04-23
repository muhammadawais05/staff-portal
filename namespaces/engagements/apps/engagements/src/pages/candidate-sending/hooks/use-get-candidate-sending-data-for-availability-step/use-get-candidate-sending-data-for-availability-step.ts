import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import {
  GetAvailabilityStepDataDocument,
  GetAvailabilityStepDataQuery
} from '../../data/get-availability-step-data'
import useNewEngagementWizardQuery from '../use-new-engagement-wizard-query'

const useGetCandidateSendingDataForAvailabilityStep = (
  attributes: NewEngagementWizardAttributes,
  onCompleted: (
    data: GetAvailabilityStepDataQuery | undefined,
    isRefetching: boolean
  ) => void
) => {
  const { data, initialLoading, refetch } = useNewEngagementWizardQuery(
    GetAvailabilityStepDataDocument,
    {
      variables: { attributes },
      onCompleted
    }
  )

  return {
    data: data?.newEngagementWizard,
    loading: initialLoading,
    refetch
  }
}

export default useGetCandidateSendingDataForAvailabilityStep
