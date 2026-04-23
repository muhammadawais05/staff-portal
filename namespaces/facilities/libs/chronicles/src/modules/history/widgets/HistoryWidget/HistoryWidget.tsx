import React, { ReactNode, ReactElement } from 'react'
import { Loader, Helpbox, Container } from '@toptal/picasso'

import { HistoryList, HistoryShowMoreButton } from '../../components'
import { usePerformedActionsQuery } from '../../data'
import { HistoryWidgetVariant, SearchChroniclesVariables } from '../../types'
import { PAGE_SIZE } from '../config'

export interface Props extends SearchChroniclesVariables {
  defaultExpanded?: boolean
  loadMore?: boolean
  pollInterval?: number
  emptyState?: { children: ReactNode; icon?: ReactElement }
  loaderComponent?: ReactNode
  variant?: HistoryWidgetVariant
}

const HistoryWidget = ({
  defaultExpanded,
  loadMore,
  pollInterval,
  emptyState,
  limit = PAGE_SIZE,
  loaderComponent,
  variant = 'timeline',
  ...variables
}: Props) => {
  const { data, initialLoading, fetchMoreLoading, error, hasMore, fetchMore } =
    usePerformedActionsQuery({ limit, ...variables }, { pollInterval })

  return (
    <>
      {error && (
        <Container bottom='small'>
          <Helpbox>
            <Helpbox.Content>{error.message}</Helpbox.Content>
          </Helpbox>
        </Container>
      )}

      {initialLoading ? (
        loaderComponent ?? (
          <Container padded='small'>
            <Loader />
          </Container>
        )
      ) : (
        <Container>
          <HistoryList
            entries={data}
            defaultExpanded={defaultExpanded}
            emptyState={emptyState}
            variant={variant}
          />

          {loadMore && hasMore && (
            <HistoryShowMoreButton
              loading={fetchMoreLoading}
              onClick={fetchMore}
              variant={variant}
            />
          )}
        </Container>
      )}
    </>
  )
}

export default HistoryWidget
