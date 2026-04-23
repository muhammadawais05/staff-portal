import React from 'react'
import { Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  TOPSCREEN_POSITION_CREATED,
  TOPSCREEN_POSITION_UPDATED
} from '@staff-portal/clients'

import { useGetTopscreenPositions } from './data/get-topscreen-positions'
import AddNewTopscreenPositionButton from '../AddNewTopscreenPositionButton'
import TopscreenPositionsContent from '../TopscreenPositionsContent'

type Props = {
  topscreenClientId: string
}

const TopscreenPositionsSection = ({ topscreenClientId }: Props) => {
  const {
    createTopscreenTalentOperation,
    createTopScreenOperation,
    topscreenPositions,
    loading,
    refetch
  } = useGetTopscreenPositions(topscreenClientId)

  useMessageListener(
    TOPSCREEN_POSITION_CREATED,
    ({ topscreenClientId: messageClientId }) =>
      topscreenClientId === messageClientId && refetch()
  )

  useMessageListener(
    TOPSCREEN_POSITION_UPDATED,
    ({ positionId }) =>
      topscreenPositions?.find(({ id }) => id === positionId) && refetch()
  )

  return (
    <Section
      title='TopScreen Positions'
      variant='withHeaderBar'
      actions={
        <AddNewTopscreenPositionButton
          topscreenClientId={topscreenClientId}
          operation={createTopScreenOperation}
        />
      }
    >
      <TopscreenPositionsContent
        topscreenPositions={topscreenPositions}
        loading={loading}
        createTopscreenTalentOperation={createTopscreenTalentOperation}
      />
    </Section>
  )
}

export default TopscreenPositionsSection
