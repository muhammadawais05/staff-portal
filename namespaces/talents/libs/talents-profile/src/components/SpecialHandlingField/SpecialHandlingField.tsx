import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { NO_VALUE } from '@staff-portal/config'
import { Operation } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import {
  isOperationDisabled,
  isOperationHidden
} from '@staff-portal/operations'
import { InlineSwitch } from '@staff-portal/editable'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useUpdateTalentSpecialHandling } from './data/update-talent-special-handling'

export interface Props {
  talentId: string
  specialHandling: boolean
  operation: Operation
}

const SpecialHandlingField = ({
  talentId,
  specialHandling,
  operation
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const [updateTalentSpecialHandling, { loading: updateLoading }] =
    useUpdateTalentSpecialHandling({
      onCompleted: data => {
        if (data.updateTalentSpecialHandling?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
        }
      },
      onError: () => showError('Failed updating special handling.')
    })

  const handleChange = async (value: boolean) => {
    const { data } = await updateTalentSpecialHandling({
      variables: {
        input: {
          talentId,
          specialHandling: value
        }
      }
    })

    if (data?.updateTalentSpecialHandling?.errors.length) {
      showError(concatMutationErrors(data?.updateTalentSpecialHandling?.errors))
    }
  }

  return isOperationHidden(operation) ? (
    <>{NO_VALUE}</>
  ) : (
    <InlineSwitch
      value={specialHandling}
      loading={updateLoading}
      disabled={updateLoading || isOperationDisabled(operation)}
      onChange={handleChange}
    />
  )
}

export default SpecialHandlingField
