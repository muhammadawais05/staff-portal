import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentJobCommissionsPermissionsDocument } from './get-talent-job-commissions-permissions.staff.gql.types'

export const GET_TALENT_JOB_COMMISSIONS_PERMISSIONS: typeof GetTalentJobCommissionsPermissionsDocument = gql`
  query GetTalentJobCommissionsPermissions {
    viewer {
      permits {
        canViewJobCommissions
      }
    }
  }
`
export const useGetTalentJobCommissionsPermissions = () =>
  useQuery(GET_TALENT_JOB_COMMISSIONS_PERMISSIONS)
