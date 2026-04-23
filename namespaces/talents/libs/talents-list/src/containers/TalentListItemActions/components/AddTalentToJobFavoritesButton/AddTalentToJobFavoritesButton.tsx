import React from 'react'
import { Button, Star16 } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JOB_FAVORITE_TALENTS_UPDATED } from '@staff-portal/jobs'

import { useAddTalentToJobFavorites } from './data/add-talent-to-job-favorites/add-talent-to-job-favorites.staff.gql'

interface Props {
  talentId: string
  jobId: string
  disabled: boolean
}

const AddTalentToJobFavoritesButton = ({
  talentId,
  jobId,
  disabled
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const [addTalentToJobFavorites, { loading }] = useAddTalentToJobFavorites({
    onCompleted: () => emitMessage(JOB_FAVORITE_TALENTS_UPDATED, { jobId }),
    onError: () => showError('Cannot add talent to job favorites.')
  })

  return (
    <Button
      variant='secondary'
      size='small'
      loading={loading}
      icon={<Star16 color='yellow' />}
      onClick={() =>
        addTalentToJobFavorites({ variables: { talentId, jobId } })
      }
      data-testid='add-to-favorites-button'
      disabled={disabled}
    >
      Add to Favorites
    </Button>
  )
}

export default AddTalentToJobFavoritesButton
