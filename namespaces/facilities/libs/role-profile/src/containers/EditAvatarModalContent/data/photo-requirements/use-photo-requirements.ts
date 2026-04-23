import { useQuery } from '@staff-portal/data-layer-service'
import { RoleType } from '@staff-portal/graphql/staff'

import { PhotoRequirementsDocument } from './photo-requirements.staff.gql.types'

export const usePhotoRequirements = (roleType: RoleType) => {
  const { data, loading } = useQuery(PhotoRequirementsDocument, {
    variables: {
      roleType
    },
    fetchPolicy: 'cache-first'
  })

  return { loading, requirements: data?.photoRequirements }
}
