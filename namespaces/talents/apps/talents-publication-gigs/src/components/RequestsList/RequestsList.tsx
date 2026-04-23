import React from 'react'
import { Container } from '@toptal/picasso'
import { ItemsList } from '@staff-portal/ui'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { GigFragment } from '@staff-portal/talents-gigs'

import { useGetGigList } from './data/get-gigs-list'
import {
  NoRequestsMessage,
  RequestsListItem,
  RequestSkeleton
} from '../../components'
import { NO_REQUESTS_MESSAGE } from '../../config'

const getItemKey = (request: GigFragment) => String(request.id)

interface Props {
  showAllRequests: boolean
}

const RequestsList = ({ showAllRequests }: Props) => {
  const currentUser = useGetCurrentUser()

  const { data, loading } = useGetGigList()

  const requests = showAllRequests
    ? data?.nodes
    : data?.nodes.filter(
        item =>
          item?.claimedBy?.role?.id === currentUser?.id ||
          item?.createdBy?.role?.id === currentUser?.id
      )

  const renderRequest = (request: GigFragment) => (
    <RequestsListItem request={request} currentUserId={currentUser?.id} />
  )

  return (
    <Container>
      {loading ? (
        <Container data-testid='p2p-requests-list-loading'>
          <RequestSkeleton />
          <RequestSkeleton />
          <RequestSkeleton />
        </Container>
      ) : (
        <ItemsList<GigFragment>
          data={requests}
          renderItem={renderRequest}
          getItemKey={getItemKey}
          notFoundMessage={<NoRequestsMessage message={NO_REQUESTS_MESSAGE} />}
        />
      )}
    </Container>
  )
}

RequestsList.displayName = 'RequestsList'

export default RequestsList
