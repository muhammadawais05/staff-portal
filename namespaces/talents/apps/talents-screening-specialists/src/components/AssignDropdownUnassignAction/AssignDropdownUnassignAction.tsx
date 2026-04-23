import { Dropdown, Loader, Menu } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { useAnalytics } from '@staff-portal/monitoring-service'
import {
  SpecialistAssignmentFragment,
  useUnassignScreeningSpecialist,
  UnassignScreeningSpecialistMutation,
  TssSegmentEvents
} from '@staff-portal/talents-screening-specialists'

import * as S from '../AssignDropdownAssignAction/styles'

export interface Props {
  specialistAssignment: SpecialistAssignmentFragment | null | undefined
}

const AssignDropdownUnassignAction = ({ specialistAssignment }: Props) => {
  const { showError } = useNotifications()
  const { track } = useAnalytics()
  const { close: closeDropdown } = Dropdown.useContext()

  const { unassignScreeningSpecialist, loading } =
    useUnassignScreeningSpecialist({
      onCompleted: ({
        unassignScreeningSpecialist: result
      }: UnassignScreeningSpecialistMutation) => {
        if (result?.errors.length) {
          const mutationErrorMessages = concatMutationErrors(
            result.errors,
            'Unable to unassign screening specialist'
          )

          showError(mutationErrorMessages)
        }
        closeDropdown()
      },
      onError: () => {
        showError('Unable to unassign screening specialist.')
        closeDropdown()
      }
    })

  if (!specialistAssignment?.assignee) {
    return null
  }

  const unassign = async () => {
    track(TssSegmentEvents.UNASSIGN_CLICKED)
    await unassignScreeningSpecialist(specialistAssignment.id)
  }

  return (
    <Menu.Item onClick={unassign}>
      Unassign
      <Loader
        size='small'
        inline
        css={loading ? S.loader : S.invisibleLoader} // reserve space and avoid jumping
      />
    </Menu.Item>
  )
}

export default AssignDropdownUnassignAction
