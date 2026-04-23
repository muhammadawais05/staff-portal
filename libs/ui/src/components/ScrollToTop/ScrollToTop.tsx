import { useLayoutEffect } from 'react'
import { queryStringToObject, useLocation } from '@staff-portal/navigation'

const TOP = 0
const LEFT = 0
const DEFAULT_PAGE = '1'

const ScrollToTop = () => {
  const location = useLocation()

  const query = queryStringToObject(location.search)
  const pageNumber = query.page ?? DEFAULT_PAGE

  useLayoutEffect(() => {
    window.scrollTo(LEFT, TOP)
  }, [location.pathname, pageNumber])

  return null
}

export default ScrollToTop
