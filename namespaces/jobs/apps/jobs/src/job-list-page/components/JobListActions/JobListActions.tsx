import React from 'react'
import { PageHead } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

import AddJobButton from '../AddJobButton'
import { useViewerPermits } from '../../data/get-viewer-permits'

const JobListActions = () => {
  const { showError } = useNotifications()
  const { permits } = useViewerPermits(() => {
    showError('An error occurred, unable to fetch user permits.')
  })

  return (
    <PageHead.Actions data-testid='job-list-actions'>
      {permits?.createClaimableJob && <AddJobButton />}
    </PageHead.Actions>
  )
}

export default JobListActions
