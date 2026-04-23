import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetJobSkillTagPermissionsDocument } from './get-job-skill-tag-permissions.staff.gql.types'

export const GET_JOB_SKILL_TAG_PERMISSIONS: typeof GetJobSkillTagPermissionsDocument = gql`
  query GetJobSkillTagPermissions {
    viewer {
      permits {
        canViewTalent
      }
    }
  }
`
export const useGetJobSkillTagPermissions = () => {
  const { data, loading } = useQuery(GET_JOB_SKILL_TAG_PERMISSIONS)

  return {
    permits: data?.viewer.permits,
    loading
  }
}
