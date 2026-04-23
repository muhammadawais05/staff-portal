import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Call } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'
import { REFRESH_CALLS_LIST } from '@staff-portal/communication'

import { PurposesListItemFragment } from './data/get-purposes-options/purposes-list-item-fragment.staff.gql.types'
import { CallsListItemFragment } from '../CallTablePage/data/get-calls-list/calls-list-item-fragment.staff.gql.types'
import {
  useUpdateCallPurpose,
  getCallPurposesOptionsHook,
  getCallValuesHook
} from './data'
import formatCallPurposeType from '../../utils/format-call-purpose-type'
import CallPurposeForm from '../CallPurposeForm'
import * as S from './styles'

export interface Props {
  customPurpose: CallsListItemFragment['customPurpose']
  purpose: CallsListItemFragment['purpose']
  counterparty: CallsListItemFragment['counterparty']
  callId: string
}

const EditableCallPurposeCell = ({
  customPurpose,
  purpose,
  counterparty,
  callId
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [updateCallPurpose] = useUpdateCallPurpose({
    onError: () => showError('An error occurred, call purpose was not changed.')
  })
  const useCallValues = getCallValuesHook({
    callId
  })
  const useCallPurposes = getCallPurposesOptionsHook({
    counterpartyType: formatCallPurposeType(counterparty?.roleType)
  })
  const handleChange = async (key: keyof Call, values: Partial<Call>) => {
    const pursposeVariable =
      values.purpose === 'other'
        ? { customPurpose: values.customPurpose }
        : { purposeId: values.purpose || '' }

    const { data } = await updateCallPurpose({
      variables: {
        input: {
          callId,
          ...pursposeVariable
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateCallPurpose,
      onSuccessAction: () => emitMessage(REFRESH_CALLS_LIST)
    })
  }

  return (
    <EditableField<Call, Call['purpose'], PurposesListItemFragment[]>
      flex
      name='purpose'
      css={S.EditableCallPurpose}
      fullWidthEditor
      onChange={handleChange}
      queryValue={useCallValues}
      submitOnChange={false}
      queryOptions={useCallPurposes}
      value={purpose || (customPurpose ? 'other' : undefined)}
      initialValues={{
        customPurpose
      }}
      viewer={
        <TypographyOverflow>
          {purpose || customPurpose || NO_VALUE}
        </TypographyOverflow>
      }
      editor={CallPurposeForm}
    />
  )
}

export default EditableCallPurposeCell
