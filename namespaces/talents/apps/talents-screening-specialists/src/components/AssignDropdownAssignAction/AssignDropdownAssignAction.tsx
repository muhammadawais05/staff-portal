import { Dropdown, Loader, Menu } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { useAnalytics } from '@staff-portal/monitoring-service'
import {
  ScreeningSpecialistFragment,
  useAssignScreeningSpecialist,
  AssignScreeningSpecialistMutation,
  TssSegmentEvents,
  Talent
} from '@staff-portal/talents-screening-specialists'

import * as S from './styles'

export interface Props {
  talent: Talent
  specialist: ScreeningSpecialistFragment
}

const AssignDropdownAssignAction = ({ talent, specialist }: Props) => {
  const { showError } = useNotifications()
  const { track } = useAnalytics()
  const { close: closeDropdown } = Dropdown.useContext()

  const { assignScreeningSpecialist, loading } = useAssignScreeningSpecialist({
    onCompleted: ({
      assignScreeningSpecialist: result
    }: AssignScreeningSpecialistMutation) => {
      if (result?.errors.length) {
        const mutationErrorMessages = concatMutationErrors(
          result.errors,
          'Unable to assign screening specialist'
        )

        showError(mutationErrorMessages)
      }
      closeDropdown()
    },
    onError: () => {
      showError('Unable to assign screening specialist.')
      closeDropdown()
    }
  })

  const assign = async () => {
    track(TssSegmentEvents.ASSIGN_CLICKED)
    await assignScreeningSpecialist(talent.id, specialist.id)
  }

  return (
    <Menu.Item onClick={assign}>
      {specialist.fullName}
      <Loader
        size='small'
        inline
        css={loading ? S.loader : S.invisibleLoader} // reserve space and avoid jumping
      />
    </Menu.Item>
  )
}

export default AssignDropdownAssignAction
