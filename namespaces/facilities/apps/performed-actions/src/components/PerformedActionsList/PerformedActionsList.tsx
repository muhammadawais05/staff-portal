import React from 'react'
import {
  HistoryWidget,
  SearchChroniclesVariables
} from '@staff-portal/chronicles'
import { Container, Search16 } from '@toptal/picasso'
import { useQueryParamsState } from '@staff-portal/query-params-state'

import {
  PERFORMED_ACTIONS_ITEMS_LIMIT,
  PERFORMED_ACTIONS_POLL_INTERVAL,
  PERFORMED_ACTIONS_QUERY_PARAMS_CONFIG
} from '../../config'
import PerformedActionsSkeleton from '../PerformedActionsSkeleton'
import { PerformedActionsQueryParams } from '../../types'

type Props = Pick<
  SearchChroniclesVariables,
  'feeds' | 'actions' | 'payload' | 'performerGids'
>

const emptyState = {
  children: (
    <Container flex as='span' bottom='small'>
      No activity to list
    </Container>
  ),
  icon: (
    <Container bottom='small'>
      <Search16 />
    </Container>
  )
}

const PerformedActionsList = ({
  feeds,
  actions,
  payload,
  performerGids
}: Props) => {
  const [urlValues] = useQueryParamsState<PerformedActionsQueryParams>(
    PERFORMED_ACTIONS_QUERY_PARAMS_CONFIG
  )

  const areCommentsExpanded = urlValues.comments

  return (
    <HistoryWidget
      feeds={feeds}
      actions={actions}
      payload={payload}
      performerGids={performerGids}
      limit={PERFORMED_ACTIONS_ITEMS_LIMIT}
      pollInterval={PERFORMED_ACTIONS_POLL_INTERVAL}
      emptyState={emptyState}
      loaderComponent={<PerformedActionsSkeleton />}
      defaultExpanded={areCommentsExpanded}
      variant='table'
      loadMore
    />
  )
}

export default PerformedActionsList
