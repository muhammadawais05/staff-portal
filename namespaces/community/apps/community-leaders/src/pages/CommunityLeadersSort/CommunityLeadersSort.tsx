import { RoutePath } from '@staff-portal/routes'
import { Link } from '@staff-portal/navigation'
import { Breadcrumbs, Container } from '@toptal/picasso'
import React from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useNotifications } from '@toptal/picasso/utils'
import {
  CommunityLeadersSortable,
  CommunityLeadersSortableLoading,
  useGetFeaturedCommunityLeaders
} from '@staff-portal/community-leaders'

const CommunityLeadersSort = () => {
  const { showError } = useNotifications()

  const {
    data: communityLeaders,
    totalCount = 0,
    loading
  } = useGetFeaturedCommunityLeaders({
    onError() {
      showError('Could not fetch featured community leaders')
    }
  })

  return (
    <>
      <Container top='medium'>
        <Breadcrumbs>
          <Breadcrumbs.Item
            as={Link}
            href={RoutePath.CommunityLeaders}
            active={false}
          >
            Community Leaders
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </Container>
      <ContentWrapper
        title='Sort Featured Community Leaders'
        itemsCount={totalCount === 0 ? undefined : totalCount}
      >
        {loading && <CommunityLeadersSortableLoading />}
        {!loading && communityLeaders?.length !== 0 && (
          <CommunityLeadersSortable communityLeaders={communityLeaders} />
        )}
      </ContentWrapper>
    </>
  )
}

CommunityLeadersSort.displayName = 'CommunityLeadersSort'

export default CommunityLeadersSort
