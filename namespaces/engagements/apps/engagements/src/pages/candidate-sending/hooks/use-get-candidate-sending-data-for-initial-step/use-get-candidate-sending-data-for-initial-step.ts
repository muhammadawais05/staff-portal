import {
  GetInitialNewEngagementWizardDocument,
  GetInitialNewEngagementWizardQueryVariables
} from '../../data/get-initial-new-engagement-wizard'
import useNewEngagementWizardQuery from '../use-new-engagement-wizard-query'

const useGetCandidateSendingDataForInitialStep = ({
  attributes
}: GetInitialNewEngagementWizardQueryVariables) => {
  const { data, initialLoading, refetch } = useNewEngagementWizardQuery(
    GetInitialNewEngagementWizardDocument,
    {
      variables: { attributes },
      throwOnError: true
    }
  )

  return {
    initialSteps: data?.newEngagementWizard?.steps,
    initialActualSteps: data?.newEngagementWizard?.actualSteps,
    initialStep: data?.newEngagementWizard?.stepToSubmit,
    initialClientId: data?.newEngagementWizard?.job?.client?.id,
    initialJobId: data?.newEngagementWizard?.job?.id,
    initialTalentId: data?.newEngagementWizard?.talent?.id,
    initialLoading,
    refetchInitialStepData: refetch
  }
}

export default useGetCandidateSendingDataForInitialStep
