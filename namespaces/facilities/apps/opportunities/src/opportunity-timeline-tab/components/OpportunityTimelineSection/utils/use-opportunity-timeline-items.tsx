import { DetailedListItem } from '@staff-portal/ui'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'

import { OpportunityTimelineFragment } from '../data'

interface Props {
  opportunityTimeline: OpportunityTimelineFragment
}

// eslint-disable-next-line max-lines-per-function, max-statements, complexity
export const useOpportunityTimelineItems = ({
  opportunityTimeline
}: Props): DetailedListItem[] => {
  const {
    enterprise,
    estimatedStartWorkDate,
    estimatedEndWorkDate,
    estimatedCloseDate,
    actualStartWorkDate,
    actualEndWorkDate,
    actualCloseDate
  } = opportunityTimeline

  const formatDateTime = useUserDateFormatter()

  const estimatedStartWorkDateField = {
    key: 'estimatedStartWorkDate',
    label: 'Est. Work Start Date',
    value: estimatedStartWorkDate
      ? formatDateTime(estimatedStartWorkDate)
      : NO_VALUE
  }

  const estimatedEndWorkDateField = {
    key: 'estimatedEndWorkDate',
    label: 'Est. Work End Date',
    value: estimatedEndWorkDate
      ? formatDateTime(estimatedEndWorkDate)
      : NO_VALUE
  }

  const estimatedCloseDateField = {
    key: 'estimatedCloseDate',
    label: 'Est. Close Date',
    value: estimatedCloseDate ? formatDateTime(estimatedCloseDate) : NO_VALUE
  }

  const actualStartWorkDateField = {
    key: 'actualStartWorkDate',
    label: 'Actual Work Start Date',
    value: actualStartWorkDate ? formatDateTime(actualStartWorkDate) : NO_VALUE
  }

  const actualEndWorkDateField = {
    key: 'actualEndWorkDate',
    label: 'Actual Work End Date',
    value: actualEndWorkDate ? formatDateTime(actualEndWorkDate) : NO_VALUE
  }

  const actualCloseDateField = {
    key: 'actualCloseDate',
    label: 'Actual Close Date',
    value: actualCloseDate ? formatDateTime(actualCloseDate) : NO_VALUE
  }

  return [
    estimatedStartWorkDateField,
    estimatedEndWorkDateField,
    ...(enterprise ? [estimatedCloseDateField] : []),
    actualStartWorkDateField,
    actualEndWorkDateField,
    ...(enterprise ? [actualCloseDateField] : [])
  ]
}
