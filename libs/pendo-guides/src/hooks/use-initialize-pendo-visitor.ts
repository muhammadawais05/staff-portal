import { useEffect } from 'react'
import {
  ENVIRONMENT
} from '@staff-portal/config'

import useGuidesAction from '../contexts/guides-context'
import { useGetPendoVisitor } from '../data/get-pendo-visitor'

const useInitializePendoVisitor = () => {
  const { initialize } = useGuidesAction()
  const { data } = useGetPendoVisitor()

  useEffect(() => {
    if (!data) {
      return
    }

    const {
      id,
      teams,
      createdAt,
      fullName,
      roleTitle,
      jobTitle,
      email
    } = data.me
    const internal = 'internal-'

    const visitor = {
      id: `staff-${ENVIRONMENT}-${internal}${id}`,
      teams: teams?.nodes.map(({ name }) => name).join(', ') || '',
      createdAt: createdAt || '',
      jobTitle: jobTitle || '',
      fullName,
      roleTitle,
      email
    }

    initialize({ visitor })
  }, [data])
}

export default useInitializePendoVisitor
