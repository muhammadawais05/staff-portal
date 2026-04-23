import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import { useGetRoleTitle } from '../../../../hooks'

const useGetSectionInfoText = ({
  jobId,
  talentId
}: NewEngagementWizardAttributes = {}) => {
  const { roleTitle, loading } = useGetRoleTitle({
    jobId,
    talentId,
    roleTitleLowerCased: true,
    withSpecializationTitle: true
  })

  if (loading) {
    return
  }

  if (!jobId && !talentId) {
    return
  }

  if (!jobId) {
    return 'Select the company and job where you want this candidate sent:'
  }

  if (!talentId && roleTitle) {
    return `Select ${roleTitle} you want to send to this job:`
  }

  return ''
}

export default useGetSectionInfoText
