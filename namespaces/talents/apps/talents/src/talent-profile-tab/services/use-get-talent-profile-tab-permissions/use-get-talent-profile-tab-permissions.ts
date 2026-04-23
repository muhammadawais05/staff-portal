import { useQuery } from '@staff-portal/data-layer-service'

import { GetTalentProfileTabPermissionsDocument } from '../../data/get-talent-profile-tab-permissions/get-talent-profile-tab-permissions.staff.gql.types'

const useGetTalentProfileTabPermissions = (talentId: string) => {
  const { data, ...restOptions } = useQuery(
    GetTalentProfileTabPermissionsDocument,
    {
      variables: { talentId },
      throwOnError: true
    }
  )

  return {
    ...restOptions,
    tabPermissions: data?.node
  }
}

export default useGetTalentProfileTabPermissions
