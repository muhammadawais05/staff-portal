import { useNotifications } from '@toptal/picasso/utils'
import React, { useState } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { NO_VALUE } from '@staff-portal/config'
import { Operation } from '@staff-portal/graphql/staff'
import {
  isOperationDisabled,
  isOperationHidden
} from '@staff-portal/operations'
import { InlineSwitch } from '@staff-portal/editable'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useUpdateEligibleForRestoration } from './data/update-eligible-for-restoration'

export interface Props {
  talentId: string
  value: boolean
  operation: Operation
}

export const EligibleForRestorationField = ({
  talentId,
  value,
  operation
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const [updateEligibleForRestoration, { loading }] =
    useUpdateEligibleForRestoration({
      onCompleted: data => {
        if (data.updateEligibleForRestoration?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
        }
      },
      onError: () =>
        showError('Unable to update Eligible for Restoration field.')
    })

  const [checked, setChecked] = useState(Boolean(value))

  const handleChange = (newValue: boolean) => {
    setChecked(newValue)
    updateEligibleForRestoration({
      variables: { input: { talentId, eligibleForRestoration: newValue } }
    })
  }

  return isOperationHidden(operation) ? (
    <>{NO_VALUE}</>
  ) : (
    <InlineSwitch
      value={checked}
      disabled={loading || isOperationDisabled(operation)}
      loading={loading}
      onChange={handleChange}
    />
  )
}

export default EligibleForRestorationField
