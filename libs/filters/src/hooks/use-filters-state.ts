import { useState } from 'react'

export const useFiltersState = (initiallyExpanded = false) => {
  const [hasFiltersExpanded, setHasFilterExpanded] = useState(initiallyExpanded)

  return { hasFiltersExpanded, setHasFilterExpanded }
}

export default useFiltersState
