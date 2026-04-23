import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  ReactElement
} from 'react'
import { format as formatDate } from '@staff-portal/date-time-utils'
import { EmptyState } from '@toptal/picasso'

import {
  isLastWeek,
  isThisMonth,
  isThisWeek,
  isToday,
  pascalToCamelCase,
  toDate
} from '../../../core'
import { Entry, HistoryWidgetVariant } from '../../types'
import HistoryEntry from '../HistoryEntry'
import HistoryGroup from '../HistoryGroup'

type LabelsType = Record<
  'today' | 'thisWeek' | 'lastWeek' | 'thisMonth',
  string
>

export interface Props {
  enableExpandToggle?: boolean
  defaultExpanded?: boolean
  entries: Entry[]
  variant?: HistoryWidgetVariant
  emptyState?: { children: ReactNode; icon?: ReactElement }
}

const labels: Readonly<LabelsType> = {
  today: 'Today',
  thisWeek: 'This week',
  lastWeek: 'Last week',
  thisMonth: `Earlier in ${formatDate(new Date(), 'MMMM')}`
}

const MONTH_KEY_FORMAT = 'MMMM_yyyy'

const getTitle = (key: string) => {
  if (key in labels) {
    return labels[key as keyof LabelsType]
  }

  return key.split('_').join(' ') // relies on MONTH_KEY_FORMAT
}

const groupEntriesByPeriod = (entries: Entry[]) => {
  const map = new Map<string, Entry[]>()

  Object.keys(labels).forEach(key => map.set(key, [])) // to have the ordering fixed

  const conditions = { isToday, isThisWeek, isLastWeek, isThisMonth }

  const entriesGroupedByPeriod = entries.reduce((acc, entry) => {
    const occurredAt = toDate(entry.performedAction.occurredAt)

    const satisfiedConditionEntry = Object.entries(conditions).find(
      conditionEntry => {
        const fn = conditionEntry[1]

        return fn(occurredAt)
      }
    )

    let periodKey: string

    if (satisfiedConditionEntry) {
      const conditionName = satisfiedConditionEntry[0]

      periodKey = pascalToCamelCase(conditionName.slice(2))
    } else {
      periodKey = formatDate(occurredAt, MONTH_KEY_FORMAT)
    }

    if (acc.has(periodKey)) {
      const periodEntries = acc.get(periodKey) as Entry[]

      periodEntries.push(entry)
    } else {
      acc.set(periodKey, [entry])
    }

    return acc
  }, map)

  return entriesGroupedByPeriod
}

type ExpandedById = {
  [key: string]: boolean
}

const HistoryList = ({
  defaultExpanded,
  entries = [],
  variant,
  emptyState
}: Props) => {
  const entriesGroupedByPeriod = groupEntriesByPeriod(entries)
  const allExpandedById = useMemo(
    () =>
      Object.fromEntries(
        entries.map(entry => [entry.performedAction.id, true])
      ),
    [entries]
  )

  const [expandedById, setExpandedById] = useState<ExpandedById>(
    defaultExpanded ? allExpandedById : {}
  )

  const handleExpandClick = useCallback(
    clickedEntryId =>
      setExpandedById(expanded => ({
        ...expanded,
        [clickedEntryId]: !expanded[clickedEntryId]
      })),
    []
  )

  useEffect(() => {
    setExpandedById(defaultExpanded ? allExpandedById : {})
  }, [allExpandedById, defaultExpanded])

  if (!entries.length && emptyState) {
    return (
      <EmptyState.Collection icon={emptyState.icon}>
        {emptyState.children}
      </EmptyState.Collection>
    )
  }

  return (
    <>
      {Array.from(entriesGroupedByPeriod).map(
        ([groupKey, groupEntries]) =>
          groupEntries.length > 0 && (
            <HistoryGroup
              key={groupKey}
              title={getTitle(groupKey)}
              variant={variant}
            >
              {groupEntries.map((entry, index) => (
                <HistoryEntry
                  entry={entry}
                  key={entry.performedAction.id}
                  expanded={expandedById[entry.performedAction.id]}
                  variant={variant}
                  hasConnector={index < groupEntries.length - 1}
                  stripeEven={index % 2 === 1}
                  onClick={handleExpandClick}
                />
              ))}
            </HistoryGroup>
          )
      )}
    </>
  )
}

export default HistoryList
