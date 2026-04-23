import React, { useState } from 'react'
import { Loader, Container, Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { NoSearchResultsMessage } from '@staff-portal/ui'

import { useGetTimeline } from '../../data'
import { TimelineFiltersConfig, FilterName } from '../../types'
import { useExpandTimelineRecords, usePaginatedEntries } from '../../hooks'
import TimelineList from '../TimelineList'
import TimelineFilters from '../TimelineFilters'
import ExpandAllButton from '../ExpandAllButton'
import * as S from './styles'

const NO_TIMELINE_ENTRIES = 'No timeline for these filters'

export type Props = {
  nodeId: string
  onOpen?: () => void
  hideModal: () => void
}

const TimelineModal = ({ nodeId, onOpen, hideModal }: Props) => {
  const [collapseList, setCollapseList] = useState<boolean>(false)

  const [filters, setFilters] = useState<TimelineFiltersConfig>({
    notes: false,
    actions: false,
    communications: false
  })

  const {
    data: { timeline, hasCommunication, nodeTitle, nodeType },
    loading: loadingTimeline
  } = useGetTimeline(nodeId)

  const { timelineEntries, hasMore, showMore, resetTimelineEntitiesList } =
    usePaginatedEntries(timeline, filters)

  const { toggleExpandAll, handleExpandClick, hasExpandedItems, expandedById } =
    useExpandTimelineRecords(timelineEntries, collapseList)

  const changeFilter = (filter: FilterName) => {
    setCollapseList(false)
    resetTimelineEntitiesList()

    setFilters({
      ...filters,
      [filter]: !filters[filter]
    })
  }

  const handleExpandAllButtonClick = () => {
    setCollapseList(!collapseList)
    toggleExpandAll()
  }

  return (
    <Modal
      align='top'
      open={!loadingTimeline}
      onOpen={onOpen}
      onClose={hideModal}
      size='large'
    >
      <Modal.Title>
        Timeline for {nodeType}: {nodeTitle}
        {!loadingTimeline && (
          <Container
            css={S.timelineFilters}
            flex
            alignItems='center'
            justifyContent='space-between'
          >
            <TimelineFilters
              showCommunicationFilter={hasCommunication}
              activeFilters={filters}
              changeFilter={changeFilter}
            />

            <ExpandAllButton
              onClick={handleExpandAllButtonClick}
              isExpandedAll={hasExpandedItems}
            />
          </Container>
        )}
      </Modal.Title>
      <Modal.Content>
        {loadingTimeline && <Loader />}
        {!loadingTimeline && (
          <Container bottom='medium'>
            {timelineEntries.length ? (
              <TimelineList
                entries={timelineEntries}
                expandedById={expandedById}
                onExpandClick={handleExpandClick}
              />
            ) : (
              <NoSearchResultsMessage message={NO_TIMELINE_ENTRIES} />
            )}
          </Container>
        )}
        {hasMore && (
          <Button
            variant='secondary'
            fullWidth
            size='medium'
            onClick={showMore}
          >
            Load More
          </Button>
        )}
      </Modal.Content>
    </Modal>
  )
}

export default TimelineModal
