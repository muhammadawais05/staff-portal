import React from 'react'
import { PromptModal } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { useAnalytics } from '@staff-portal/monitoring-service'
import {
  Talent,
  TssSegmentEvents
} from '@staff-portal/talents-screening-specialists'

import { ReactivateScreeningSpecialistAssignmentMutation } from '../../data/reactivate-screening-specialist-assignment/reactivate-screening-specialist-assignment.staff.gql.types'
import { useReactivateScreeningSpecialistAssignment } from '../../data/reactivate-screening-specialist-assignment'

export interface Props {
  talent: Talent
  hideModal: () => void
}

const ReactivateModal = ({ talent, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { track } = useAnalytics()

  const { reactivateScreeningSpecialistAssignment } =
    useReactivateScreeningSpecialistAssignment({
      onCompleted: ({
        reactivateScreeningSpecialistAssignment: result
      }: ReactivateScreeningSpecialistAssignmentMutation) => {
        if (result?.errors.length) {
          const mutationErrorMessages = concatMutationErrors(
            result.errors,
            'Unable to reactivate specialist assignment'
          )

          showError(mutationErrorMessages)
        }
      },
      onError: () => showError('Unable to reactivate specialist assignment.')
    })

  if (!talent.currentSpecialistAssignment) {
    return null
  }

  return (
    <PromptModal
      open
      onClose={hideModal}
      title='Update TSS status to active'
      message='This will change the TSS status from archived to active and create a new playbook task for the assignee.'
      submitText='Update'
      onSubmit={async () => {
        track(TssSegmentEvents.REACTIVATE_CLICKED)
        await reactivateScreeningSpecialistAssignment(
          talent.currentSpecialistAssignment!.id // eslint-disable-line @typescript-eslint/no-non-null-assertion
        )
      }}
    />
  )
}

export default ReactivateModal
