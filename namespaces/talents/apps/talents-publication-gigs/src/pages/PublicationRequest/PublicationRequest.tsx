import React from 'react'
import { Container, Breadcrumbs } from '@toptal/picasso'
import { Link, useParams } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { mapP2PIdToGig, useGetGig } from '@staff-portal/talents-gigs'

import { Request, RequestSkeleton, RequestActions } from '../../components'

const PublicationRequest = () => {
  const { id } = useParams<{ id: string }>()

  const currentUser = useGetCurrentUser()

  const gigId = mapP2PIdToGig(id)

  const { gig, loading } = useGetGig(gigId)

  return (
    <Container top='small'>
      <Breadcrumbs>
        <Breadcrumbs.Item as={Link} href={RoutePath.Requests} active={false}>
          Toptal Publications
        </Breadcrumbs.Item>
      </Breadcrumbs>
      <ContentWrapper
        titleLoading={loading}
        title={loading ? undefined : gig?.title}
        actions={
          gig && (
            <RequestActions
              request={gig}
              currentUserId={currentUser?.id}
              viewType='page'
            />
          )
        }
      >
        <Container top='medium'>
          {loading && <RequestSkeleton data-testid='p2p-request-loading' />}
          {gig && <Request request={gig} />}
        </Container>
      </ContentWrapper>
    </Container>
  )
}

export default PublicationRequest
