import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { NoSearchResultsMessage, PageLoader } from '@staff-portal/ui'
import { Pagination } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { REFRESH_CALLS_LIST } from '@staff-portal/communication'

import { useGetCallsList } from './data/get-calls-list/get-calls-list.staff.gql'
import CallTable from '../CallTable'
import CallTableRow from '../CallTableRow'
import useHandleCallsPagination from '../../hooks/use-handle-calls-pagination'

const LIMIT = 30
const NO_RESULTS_MESSAGE = 'There are no calls for this search criteria.'

export interface Props {
  pageTitle: string
  unfilled?: boolean
}

const CallTablePage = ({ pageTitle, unfilled }: Props) => {
  const { page, handlePageChange } = useHandleCallsPagination({
    pageSize: LIMIT
  })

  const { data, loading, initialLoading, refetch } = useGetCallsList({
    isUnfilled: unfilled,
    pagination: {
      limit: LIMIT,
      offset: (page - 1) * LIMIT
    }
  })

  useMessageListener([REFRESH_CALLS_LIST], () => refetch?.())

  if (!data || initialLoading) {
    return <PageLoader />
  }

  if (!loading && !data.viewer.calls.nodes.length) {
    return <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
  }

  const totalCount = data.viewer.calls.totalCount

  return (
    <ContentWrapper title={pageTitle} itemsCount={totalCount}>
      <Container top='medium' bottom='medium'>
        {loading ? (
          <SkeletonLoader.Typography rows={LIMIT} />
        ) : (
          <CallTable>
            {data.viewer.calls.nodes.map((call, index) => (
              <CallTableRow
                call={call}
                stripeEven={Boolean(index % 2)}
                key={call.id}
              />
            ))}
          </CallTable>
        )}
      </Container>

      <Pagination
        activePage={page}
        onPageChange={handlePageChange}
        limit={LIMIT}
        itemCount={totalCount}
      />
    </ContentWrapper>
  )
}

CallTablePage.displayName = 'CallTablePage'

export default CallTablePage
