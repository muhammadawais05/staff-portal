import React, { useState } from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import TimelineModal from './components/TimelineModal'

export type Props = {
  nodeId: string
}

const TimelineButton = ({ nodeId }: Props) => {
  const [loading, setLoading] = useState(false)

  const { showModal } = useModal(TimelineModal, {
    nodeId,
    onOpen: () => setLoading(false)
  })

  return (
    <Button
      data-testid='timeline-button'
      variant='secondary'
      size='small'
      loading={loading}
      onClick={() => {
        showModal()
        setLoading(true)
      }}
    >
      Timeline
    </Button>
  )
}

export default TimelineButton
