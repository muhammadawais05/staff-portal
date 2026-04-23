import React, { useEffect, useState } from 'react'
import { Container, Pagination, FormLabel, Radio } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import {
  CommunityLeaderApplicationFilter,
  CommunityLeaderApplicationStatus
} from '@staff-portal/graphql/staff'

import {
  CommunityLeaderListSkeletonLoader,
  CommunityLeaderApplicant
} from '../../components'
import {
  useGetCommunityLeaderApplications,
  GET_COMMUNITY_LEADER_APPLICATIONS
} from '../../data/get-community-leader-applications/get-community-leader-applications.staff.gql'
import { CommunityLeaderApplicationNode } from '../../types'

const NO_RESULTS_MESSAGE =
  'There are no community leaders applications for this search criteria'

interface Props {
  onCountChange: (count: number) => void
}

const ITEMS_PER_PAGE = 10

const CommunityLeaderApplications = ({ onCountChange }: Props) => {
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState<CommunityLeaderApplicationFilter>({
    status: CommunityLeaderApplicationStatus.APPLIED
  })

  const queryVariables = {
    filter,
    pagination: {
      limit: ITEMS_PER_PAGE,
      offset: page * ITEMS_PER_PAGE
    }
  }

  const {
    data = [],
    totalCount = 0,
    loading
  } = useGetCommunityLeaderApplications(queryVariables)

  const handleFilterChange = (event: React.ChangeEvent<{ value: string }>) => {
    setFilter({
      status: event.target.value as CommunityLeaderApplicationStatus
    })
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  useEffect(() => {
    onCountChange(totalCount)
  }, [onCountChange, totalCount])

  useEffect(() => {
    setPage(0)
  }, [filter, setPage])

  const handleListChange = () => {
    const isInLastPage = totalPages - 1 === page
    const lastPageContainsOneItem = totalCount % ITEMS_PER_PAGE === 1

    if (isInLastPage && lastPageContainsOneItem && page > 0) {
      return () => setPage(page - 1)
    }
  }

  return (
    <>
      <Container top='large' bottom='large'>
        <Container bottom='large'>
          <FormLabel>Application Status</FormLabel>
          <Radio.Group
            name='filter'
            onChange={handleFilterChange}
            horizontal
            value={filter.status}
          >
            <Radio
              label='Applied'
              value={CommunityLeaderApplicationStatus.APPLIED}
            />
            <Radio
              label='Rejected'
              value={CommunityLeaderApplicationStatus.REJECTED}
            />
            <Radio
              label='Paused'
              value={CommunityLeaderApplicationStatus.ON_HOLD}
            />
          </Radio.Group>
        </Container>

        {loading ? (
          <CommunityLeaderListSkeletonLoader />
        ) : (
          <ItemsList<CommunityLeaderApplicationNode>
            data={data}
            itemWithoutSection
            containerVariant='transparent'
            renderItem={communityLeader => (
              <CommunityLeaderApplicant
                communityLeader={communityLeader}
                onListChange={handleListChange()}
                refetchQueries={[
                  {
                    query: GET_COMMUNITY_LEADER_APPLICATIONS,
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
          activePage={page + 1}
          onPageChange={to => setPage(to - 1)}
          totalPages={totalPages}
        />
      )}
    </>
  )
}

CommunityLeaderApplications.displayName = 'CommunityLeaderApplications'

export default CommunityLeaderApplications
