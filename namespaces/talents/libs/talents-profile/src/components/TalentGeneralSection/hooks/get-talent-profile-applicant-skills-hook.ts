import { useLazyQuery } from '@staff-portal/data-layer-service'
import { stringListToItems } from '@staff-portal/string'

import { GetTalentProfileApplicantSkillsDocument } from '../data/get-talent-profile-general-data/get-talent-profile-applicant-skills.staff.gql.types'

export const getTalentProfileApplicantSkillsHook = (talentId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetTalentProfileApplicantSkillsDocument,
    {
      variables: { talentId },
      fetchPolicy: 'network-only'
    }
  )

  const applicantSkills =
    data?.node?.applicantSkills?.nodes?.map(({ name }) => name) || []

  return {
    request,
    loading,
    error,
    data: applicantSkills ? stringListToItems(applicantSkills) : undefined,
    called
  }
}
