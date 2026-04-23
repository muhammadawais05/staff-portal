import { useEffect } from 'react'
import {
  useNavigate,
  useLocation,
  queryStringToObject
} from '@staff-portal/navigation'
import { getCallRequestPath } from '@staff-portal/routes'

import { CallRequestModalName } from '../../../../enums'

const MODAL_KEY = 'modal'

const useRedirectToCallRequestModal = (modalName: CallRequestModalName) => {
  const navigate = useNavigate()
  const { search, hash } = useLocation()
  const { id } = queryStringToObject(search)

  useEffect(() => {
    if (id && hash && hash.includes(MODAL_KEY) && hash.includes(modalName)) {
      navigate(`${getCallRequestPath(id as string)}?${MODAL_KEY}=${modalName}`)
    }
  }, [navigate, hash, id, modalName])
}

export default useRedirectToCallRequestModal
