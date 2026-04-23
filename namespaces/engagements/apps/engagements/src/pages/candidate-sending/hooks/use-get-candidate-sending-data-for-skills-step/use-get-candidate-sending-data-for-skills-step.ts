import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import { GetSkillsStepDataDocument } from '../../data/get-skills-step-data'
import useNewEngagementWizardQuery from '../use-new-engagement-wizard-query'

const useGetCandidateSendingDataForSkillsStep = (
  attributes: NewEngagementWizardAttributes
) => {
  const { data, initialLoading } = useNewEngagementWizardQuery(
    GetSkillsStepDataDocument,
    {
      variables: { attributes }
    }
  )

  return {
    data: data?.newEngagementWizard,
    loading: initialLoading
  }
}

export default useGetCandidateSendingDataForSkillsStep
