import React, { useEffect, useState } from 'react'
import { Container, Pagination } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { CommunityLeaderRecordStatus } from '@staff-portal/graphql/staff'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import {
  CommunityLeaderListItem,
  CommunityLeaderListSkeletonLoader,
  CommunityLeadersSearchField
} from '../../components'
import {
  useGetCommunityLeaders,
  GET_COMMUNITY_LEADERS
} from '../../data/get-community-leaders/get-community-leaders.staff.gql'
import { REFRESH_COMMUNITY_LEADER_LIST } from '../../messages'
import { CommunityLeader } from '../../types'

const NO_RESULTS_MESSAGE =
  'There are no community leaders for this search criteria'

interface Props {
  onCountChange: (count: number) => void
  category: 'active' | 'removed'
}

const ITEMS_PER_PAGE = 10

const CommunityLeadersList = ({ onCountChange, category }: Props) => {
  const [params, setParams] = useState({
    page: 0,
    nameSearch: ''
  })

  const queryVariables = {
    filter: params.nameSearch ? `*${params.nameSearch}*` : undefined,
    limit: ITEMS_PER_PAGE,
    offset: params.page * ITEMS_PER_PAGE,
    status:
      category === 'removed'
        ? CommunityLeaderRecordStatus.DELETED
        : CommunityLeaderRecordStatus.ACTIVE
  }

  const {
    data = [],
    totalCount = 0,
    loading,
    refetch
  } = useGetCommunityLeaders(queryVariables)

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  useMessageListener(REFRESH_COMMUNITY_LEADER_LIST, refetch)

  useEffect(() => {
    onCountChange(totalCount)
  }, [onCountChange, totalCount])

  const handleListChange = () => {
    const isInLastPage = totalPages - 1 === params.page
    const lastPageContainsOneItem = totalCount % ITEMS_PER_PAGE === 1

    if (isInLastPage && lastPageContainsOneItem && params.page > 0) {
      return () => setParams(prev => ({ ...prev, page: prev.page - 1 }))
    }
  }

  return (
    <>
      <CommunityLeadersSearchField
        initialValue={params.nameSearch}
        placeholder={`Search for ${
          category === 'removed' ? 'an inactive' : 'an active'
        } Community Leader by name`}
        onChange={setParams}
      />
      <Container top='large' bottom='large'>
        {loading ? (
          <CommunityLeaderListSkeletonLoader />
        ) : (
          <ItemsList<CommunityLeader>
            data={data}
            itemWithoutSection
            containerVariant='transparent'
            renderItem={communityLeader => (
              <CommunityLeaderListItem
                communityLeader={communityLeader}
                onListChange={handleListChange()}
                refetchQueries={[
                  {
                    query: GET_COMMUNITY_LEADERS,
                    variables: queryVariables
                  }
                ]}
              />
            )}
            getItemKey={communityLeader => communityLeader.id}
            notFoundMessage={
              <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
            }
          />
        )}
      </Container>

      {!loading && data.length > 0 && (
        <Pagination
          activePage={params.page + 1}
          onPageChange={to => setParams(prev => ({ ...prev, page: to - 1 }))}
          totalPages={totalPages}
        />
      )}
    </>
  )
}

CommunityLeadersList.displayName = 'CommunityLeadersList'

export default CommunityLeadersList
