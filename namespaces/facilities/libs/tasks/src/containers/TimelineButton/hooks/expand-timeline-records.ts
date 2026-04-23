import { useState, useEffect, useCallback, useMemo } from 'react'

import { ExpandedById, TimelineRecord, EntryTypes } from '../types'

const getAllExpandedById = (entries: TimelineRecord<EntryTypes>[]) =>
  Object.fromEntries(entries.map(entry => [entry.id, true]))

const useExpandTimelineRecords = (
  entries: TimelineRecord<EntryTypes>[],
  collapseList?: boolean
) => {
  const allExpandedById = useMemo(() => getAllExpandedById(entries), [entries])
  const [expandedById, setExpandedById] = useState<ExpandedById>(
    () => allExpandedById
  )
  const hasExpandedItems = Boolean(Object.keys(expandedById).length)

  useEffect(() => {
    if (collapseList) {
      return setExpandedById({})
    }
    setExpandedById(allExpandedById)
  }, [allExpandedById, collapseList])

  const toggleExpandAll = useCallback(
    () => setExpandedById(hasExpandedItems ? {} : allExpandedById),
    [hasExpandedItems, allExpandedById]
  )

  const handleExpandClick = useCallback(
    entryId =>
      setExpandedById(expanded => ({
        ...expanded,
        [entryId]: !expanded[entryId]
      })),
    []
  )

  return { toggleExpandAll, handleExpandClick, hasExpandedItems, expandedById }
}

export default useExpandTimelineRecords
