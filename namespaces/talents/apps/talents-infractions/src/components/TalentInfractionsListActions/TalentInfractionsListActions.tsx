import React from 'react'
import { Button } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useModal } from '@staff-portal/modals-service'
import {
  ADD_TALENT_INFRACTION_MODAL,
  TALENT_INFRACTION_CREATED
} from '@staff-portal/talents-infractions'

interface Props {
  onCreate: () => void
}

const TalentInfractionsListActions = ({ onCreate }: Props) => {
  const { showModal: showCreateModal } = useModal(
    ADD_TALENT_INFRACTION_MODAL,
    {}
  )

  useMessageListener(TALENT_INFRACTION_CREATED, () => {
    onCreate()
  })

  return (
    <>
      <Button
        size='small'
        variant='primary'
        data-testid='talent-add-infraction-button'
        onClick={showCreateModal}
      >
        Add Infraction
      </Button>
    </>
  )
}

export default TalentInfractionsListActions
