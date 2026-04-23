import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import GeneratePitchSnippetsModal from '../GeneratePitchSnippetsModal'

export interface Props {
  engagementIds: string[]
}

const ViewPitchSnippetsButton = ({ engagementIds }: Props) => {
  const { showModal } = useModal(GeneratePitchSnippetsModal, {
    engagementIds
  })

  if (!engagementIds.length) {
    return null
  }

  return (
    <Button
      size='small'
      variant='secondary'
      onClick={showModal}
      data-testid='ViewPitchSnippetsButton'
    >
      View Pitch Snippets
    </Button>
  )
}

export default ViewPitchSnippetsButton
