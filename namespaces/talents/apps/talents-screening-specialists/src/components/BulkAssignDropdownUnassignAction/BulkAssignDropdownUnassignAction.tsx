import React from 'react'
import { Dropdown, Menu, Loader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { SpecialistAssignmentStatuses } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { useAnalytics } from '@staff-portal/monitoring-service'
import {
  Talent,
  TssSegmentEvents
} from '@staff-portal/talents-screening-specialists'

import {
  useUnassignScreeningSpecialists,
  UnassignScreeningSpecialistsMutation
} from '../../data/unassign-screening-specialists'
import * as S from './styles'

export interface Props {
  selectedTalentList: Talent[]
}

const BulkAssignDropdownUnassignAction = ({ selectedTalentList }: Props) => {
  const { showError } = useNotifications()
  const { track } = useAnalytics()
  const { close: closeDropdown } = Dropdown.useContext()

  const { unassignScreeningSpecialists, loading } =
    useUnassignScreeningSpecialists({
      onCompleted: ({
        unassignScreeningSpecialists: result
      }: UnassignScreeningSpecialistsMutation) => {
        if (result?.errors.length) {
          const mutationErrorMessages = concatMutationErrors(
            result.errors,
            'Unable to unassign screening specialists'
          )

          showError(mutationErrorMessages)
        }
        closeDropdown()
      },
      onError: () => {
        showError('Unable to unassign screening specialists.')
        closeDropdown()
      }
    })

  const assignmentIds = selectedTalentList
    .filter(
      talent =>
        talent.currentSpecialistAssignment?.status ===
        SpecialistAssignmentStatuses.ACTIVE
    )
    .map(talent => talent.currentSpecialistAssignment!.id) // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const unassign = async () => {
    track(TssSegmentEvents.BULK_UNASSIGN_CLICKED)
    await unassignScreeningSpecialists(assignmentIds)
  }

  const noAssignments = assignmentIds.length === 0

  if (noAssignments) {
    return null
  }

  return (
    <Menu.Item onClick={unassign}>
      Unassign
      <Loader
        inline
        size='small'
        css={loading ? S.loader : S.invisibleLoader}
      />
    </Menu.Item>
  )
}

export default BulkAssignDropdownUnassignAction
