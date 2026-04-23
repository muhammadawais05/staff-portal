import React from 'react'
import { Button, StarSolid16 } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JOB_FAVORITE_TALENTS_UPDATED } from '@staff-portal/jobs'
import { useRemoveTalentFromJobFavorites } from '@staff-portal/talents'

interface Props {
  talentId: string
  jobId: string
  disabled: boolean
}

const RemoveTalentFromJobFavoritesButton = ({
  talentId,
  jobId,
  disabled
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const [removeTalentFromJobFavorites, { loading }] =
    useRemoveTalentFromJobFavorites({
      onCompleted: () => emitMessage(JOB_FAVORITE_TALENTS_UPDATED, { jobId }),
      onError: () => showError('Cannot remove talent from job favorites.')
    })

  return (
    <Button
      variant='secondary'
      size='small'
      icon={<StarSolid16 color='yellow' />}
      loading={loading}
      onClick={() =>
        removeTalentFromJobFavorites({ variables: { talentId, jobId } })
      }
      data-testid='remove-from-favorites-button'
      disabled={disabled}
    >
      Remove from Favorites
    </Button>
  )
}

export default RemoveTalentFromJobFavoritesButton
