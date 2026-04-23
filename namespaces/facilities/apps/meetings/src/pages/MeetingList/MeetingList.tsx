import { usePagination, Pagination } from '@staff-portal/filters'
import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'
import {
  MeetingListContext,
  MeetingWithJobs,
  REFRESH_MEETING_LIST
} from '@staff-portal/meetings'
import { useParams } from '@staff-portal/navigation'
import { ItemsList } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import React, { useCallback, useMemo } from 'react'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import MeetingItem from './components/MeetingItem'
import MeetingsPageNavigation from './components/MeetingsPageNavigation'
import NoMeetingsMessage from './components/NoMeetingsMessage'
import { MEETING_CATEGORY_TITLE } from './constants'
import { useGetMeetingsList } from './data'
import { toGqlVariables } from './services'

const getMeetingKey = ({ id }: MeetingWithJobs) => id

const renderMeeting = (meetingWithJobs: MeetingWithJobs) => (
  <MeetingItem meeting={meetingWithJobs} />
)

const MEETINGS_PAGE_SIZE = 25

const MeetingList = () => {
  const { category = MeetingPeriodEnum.today } = useParams<{
    category?: MeetingPeriodEnum
  }>()
  const { page, pagination, limit, resolving, handlePageChange } =
    usePagination({
      limit: MEETINGS_PAGE_SIZE
    })

  const gqlVariables = toGqlVariables(category, pagination)
  const { data, loading, refetch } = useGetMeetingsList(gqlVariables, resolving)

  useTouchCounter({
    counterName: CounterName.TodayMeetings
  })

  const refreshMeetingList = useCallback(() => {
    refetch()
  }, [refetch])

  useMessageListener([REFRESH_MEETING_LIST], refreshMeetingList)

  const pageTitle = MEETING_CATEGORY_TITLE[category]
  const meetings = useMemo(() => data?.nodes ?? [], [data])
  const totalCount = data?.totalCount

  return (
    <ContentWrapper
      title={pageTitle}
      itemsCount={totalCount}
      actions={<MeetingsPageNavigation category={category} />}
    >
      <Container
        top='medium'
        bottom='medium'
        data-testid='MeetingsList-section'
      >
        <MeetingListContext.Provider value={{ refreshMeetingList }}>
          <ItemsList<MeetingWithJobs>
            data={meetings}
            loading={loading}
            notFoundMessage={<NoMeetingsMessage category={category} />}
            getItemKey={getMeetingKey}
            renderItem={renderMeeting}
          />
        </MeetingListContext.Provider>
      </Container>

      <Container top='medium'>
        <Pagination
          itemCount={totalCount}
          limit={limit}
          activePage={page}
          onPageChange={handlePageChange}
        />
      </Container>
    </ContentWrapper>
  )
}

export default MeetingList
