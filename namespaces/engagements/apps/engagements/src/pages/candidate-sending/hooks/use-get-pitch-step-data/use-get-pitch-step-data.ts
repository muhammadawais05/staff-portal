import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import { GetPitchStepDataDocument } from '../../data/get-pitch-step-data'
import useNewEngagementWizardQuery from '../use-new-engagement-wizard-query'

const useGetPitchStepData = (
  attributes: NewEngagementWizardAttributes,
  { skip }: { skip: boolean }
) => {
  const { data, initialLoading } = useNewEngagementWizardQuery(
    GetPitchStepDataDocument,
    {
      variables: { attributes },
      skip,
      refetchOnAttributesChange: true
    }
  )

  return {
    data: data?.newEngagementWizard,
    buildTalentPitchOperation: data?.operations.buildTalentPitch,
    loading: initialLoading
  }
}

export default useGetPitchStepData
