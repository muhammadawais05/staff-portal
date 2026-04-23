import React from 'react'
import { Dropdown, Menu, Loader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { useAnalytics } from '@staff-portal/monitoring-service'
import {
  Talent,
  ScreeningSpecialistFragment,
  TssSegmentEvents
} from '@staff-portal/talents-screening-specialists'

import {
  useAssignScreeningSpecialists,
  AssignScreeningSpecialistsMutation
} from '../../data/assign-screening-specialists'
import * as S from './styles'

export interface Props {
  specialist: ScreeningSpecialistFragment
  selectedTalentList: Talent[]
}

const BulkAssignDropdownAssignAction = ({
  specialist,
  selectedTalentList
}: Props) => {
  const { showError } = useNotifications()
  const { track } = useAnalytics()
  const { close: closeDropdown } = Dropdown.useContext()

  const { assignScreeningSpecialists, loading } = useAssignScreeningSpecialists(
    {
      onCompleted: ({
        assignScreeningSpecialists: result
      }: AssignScreeningSpecialistsMutation) => {
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
    }
  )

  const assign = async () => {
    if (!loading) {
      track(TssSegmentEvents.BULK_ASSIGN_CLICKED)
      await assignScreeningSpecialists(
        selectedTalentList.map(talent => talent.id),
        specialist.id
      )
    }
  }

  return (
    <Menu.Item key={specialist.id} onClick={assign}>
      {specialist.fullName}
      <Loader
        inline
        size='small'
        css={loading ? S.loader : S.invisibleLoader}
      />
    </Menu.Item>
  )
}

export default BulkAssignDropdownAssignAction
