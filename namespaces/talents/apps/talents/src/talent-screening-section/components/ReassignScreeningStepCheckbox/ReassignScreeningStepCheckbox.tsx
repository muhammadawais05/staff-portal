import { Form, useForm } from '@toptal/picasso-forms'
import { Maybe, useNotifications } from '@toptal/picasso/utils'
import React, { useEffect } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { isOperationEnabled } from '@staff-portal/operations'
import { ClaimerFragment } from '@staff-portal/facilities'

import { useGetReassignRoleStepOperation } from './data/get-reassign-role-step-operation.staff.gql'

export interface Props {
  claimer: Maybe<ClaimerFragment>
  roleStepId: string
}

const ReassignScreeningStepCheckbox = ({ claimer, roleStepId }: Props) => {
  const { showError } = useNotifications()
  const currentUser = useGetCurrentUser()
  const hideCheckboxInitial = !claimer || claimer.id === currentUser?.id
  const { data } = useGetReassignRoleStepOperation({
    roleStepId,
    skip: hideCheckboxInitial,
    onError: () => showError('Unable to load operation.')
  })
  const operation = data?.node?.operations.reassignRoleStep
  const showCheckbox = !hideCheckboxInitial && isOperationEnabled(operation)
  const form = useForm()

  useEffect(() => {
    if (showCheckbox) {
      form.change('reassign', true)
    }
  }, [showCheckbox, form])

  return showCheckbox ? (
    <Form.Checkbox
      name='reassign'
      label={`Reassign this step from ${claimer?.fullName} on me.`}
      titleCase={false}
      data-testid='approve-reassign-checkbox'
    />
  ) : null
}

export default ReassignScreeningStepCheckbox
