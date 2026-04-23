import {
  queryStringToObject,
  useLocation,
  useParams
} from '@staff-portal/navigation'
import { useMemo } from 'react'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const useGetEditCompanyRepresentativeParams = () => {
  const { id: legacyId } = useParams<{ id: string }>()
  const { search } = useLocation()

  return useMemo(
    () => ({
      representativeId: encodeEntityId(legacyId, 'CompanyRepresentative'),
      returnPath: queryStringToObject(search).return_path as string | undefined
    }),
    [legacyId, search]
  )
}
