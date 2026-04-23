import { useNavigate, getUrl } from '@staff-portal/navigation'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { getEditCompanyRepresentativePath } from '@staff-portal/routes'

import { RepresentativeFragment } from '../../data'

export const useNavigateToUpdateRepresentativePage = (
  representative: RepresentativeFragment
) => {
  const navigate = useNavigate()

  return () => {
    const decodedId = decodeEntityId(representative.id).id
    const returnPath = getUrl()

    navigate(getEditCompanyRepresentativePath(decodedId, returnPath))
  }
}
