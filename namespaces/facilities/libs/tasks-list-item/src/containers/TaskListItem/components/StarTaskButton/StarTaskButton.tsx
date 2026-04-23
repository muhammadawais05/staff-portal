import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Star16, StarSolid16 } from '@toptal/picasso/Icon'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { WrapWithTooltip } from '@staff-portal/ui'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { useStarTask } from './data'

export interface Props {
  taskId: string
  starred: boolean
  performerId: string
}

const StarTaskButton = ({ taskId, performerId, starred }: Props) => {
  const { showError } = useNotifications()
  const user = useGetCurrentUser()
  const { starTask, loading } = useStarTask({
    taskId,
    onCompleted: ({ starTask: result }) => {
      if (!result?.success && result?.errors) {
        showError(concatMutationErrors(result?.errors))
      }
    },
    onError: () => {
      showError(
        `An error occurred, the task was not ${
          starred ? 'unstarred' : 'starred'
        }`
      )
    }
  })

  const isDisabled = performerId !== user?.id
  const starredIcon =
    starred && !isDisabled ? <StarSolid16 color='yellow' /> : <Star16 />

  return (
    <WrapWithTooltip
      delay='long'
      enableTooltip={isDisabled}
      content='A task can only be starred by its assignee'
    >
      <Container as='span'>
        <Button.Circular
          variant='flat'
          loading={loading}
          disabled={isDisabled}
          onClick={() => starTask(!starred)}
          icon={starredIcon}
          data-testid='star-task-button'
        />
      </Container>
    </WrapWithTooltip>
  )
}

export default StarTaskButton
