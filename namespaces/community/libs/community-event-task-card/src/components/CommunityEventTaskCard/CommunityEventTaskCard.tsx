// eslint-disable-next-line no-restricted-imports
import { Button, Link as PicassoLink } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { TaskCardLayout, BlankIcon } from '@staff-portal/tasks'
import { TaskCardProps } from '@staff-portal/tasks-cards'

import { getCommunityEventContentItems } from '../../utils'
import { useGetCommunityEvent } from './data'

const CommunityEventTaskCard = ({
  taskCardConfig: { entityId: communityEventId }
}: TaskCardProps) => {
  const { data: communityEvent, loading } =
    useGetCommunityEvent(communityEventId)

  return (
    <TaskCardLayout loading={!communityEventId && loading}>
      {communityEvent && (
        <>
          <TaskCardLayout.Header>
            <TaskCardLayout.Title
              title={communityEvent.name}
              icon={<BlankIcon />}
            >
              Follow the link and fill in the form
            </TaskCardLayout.Title>

            <Button
              size='small'
              as={Link as typeof PicassoLink}
              target='_blank'
              href={communityEvent.typeformUrl}
              variant='secondary'
            >
              Fill Typeform
            </Button>
          </TaskCardLayout.Header>

          <TaskCardLayout.Content
            items={getCommunityEventContentItems(communityEvent)}
          />

          <TaskCardLayout.Description title='Description'>
            {communityEvent.description}
          </TaskCardLayout.Description>
        </>
      )}
    </TaskCardLayout>
  )
}

export default CommunityEventTaskCard
