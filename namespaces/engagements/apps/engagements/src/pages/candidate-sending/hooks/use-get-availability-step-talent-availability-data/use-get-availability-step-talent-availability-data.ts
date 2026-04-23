import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import { GetAvailabilityStepTalentAvailabilityDataDocument } from '../../data/get-availability-step-talent-availability-data'
import useNewEngagementWizardQuery from '../use-new-engagement-wizard-query'

const useGetAvailabilityStepTalentAvailabilityData = ({
  attributes,
  skip = false
}: {
  attributes: NewEngagementWizardAttributes
  skip?: boolean
}) => {
  const { data, initialLoading, refetch } = useNewEngagementWizardQuery(
    GetAvailabilityStepTalentAvailabilityDataDocument,
    {
      variables: { attributes },
      skip
    }
  )

  return {
    data: data?.newEngagementWizard,
    loading: initialLoading,
    refetch
  }
}

export default useGetAvailabilityStepTalentAvailabilityData
