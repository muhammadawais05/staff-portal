import { useEffect } from 'react'
import { TOPTAL_TITLE } from '@staff-portal/config'

export const usePageTitle = (title: string | undefined) =>
  useEffect(() => {
    if (!title) {
      return
    }

    document.title = `${title} - ${TOPTAL_TITLE}`

    return () => {
      document.title = TOPTAL_TITLE
    }
  }, [title])
