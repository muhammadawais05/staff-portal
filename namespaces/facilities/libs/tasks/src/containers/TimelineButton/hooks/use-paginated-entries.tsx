import { useMemo, useState } from 'react'

import {
  EntryTypes,
  TimelineRecord,
  Timeline,
  TimelineFiltersConfig,
  FilterName
} from '../types'

const sortTimelineRecordsByDate = (records: TimelineRecord<EntryTypes>[]) =>
  records.sort(
    (entryA, entryB) => Date.parse(entryB.date) - Date.parse(entryA.date)
  )

const filterTimelineRecords = (
  timeline: Timeline,
  filters: TimelineFiltersConfig
): TimelineRecord<EntryTypes>[] => {
  const hasFilters = Object.values(filters).some(Boolean)

  if (!hasFilters) {
    return Object.values(timeline).flat()
  }

  return Object.entries(timeline)
    .filter(([filterName]) => filters[filterName as FilterName])
    .flatMap(([, timelineRecords]) => timelineRecords)
}

export const TIMELINE_ENTRIES_IN_LIST = 50

export const usePaginatedEntries = (
  timeline: Timeline,
  filters: TimelineFiltersConfig
) => {
  const [itemsInList, setItemsInList] = useState<number>(
    TIMELINE_ENTRIES_IN_LIST
  )

  const preparedEntries = useMemo(() => {
    const filteredTimelineRecords = filterTimelineRecords(timeline, filters)
    const sortedRecords = sortTimelineRecordsByDate(filteredTimelineRecords)

    return sortedRecords
  }, [timeline, filters])

  const hasMore = preparedEntries.length > itemsInList

  const timelineEntries = useMemo(
    () => (hasMore ? preparedEntries.slice(0, itemsInList) : preparedEntries),
    [preparedEntries, itemsInList, hasMore]
  )

  const showMore = () => {
    setItemsInList(prev => prev + TIMELINE_ENTRIES_IN_LIST)
  }

  const resetTimelineEntitiesList = () => {
    setItemsInList(TIMELINE_ENTRIES_IN_LIST)
  }

  return {
    timelineEntries,
    hasMore,
    showMore,
    resetTimelineEntitiesList
  }
}
