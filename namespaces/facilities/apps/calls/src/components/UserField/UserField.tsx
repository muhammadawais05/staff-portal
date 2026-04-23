import { TypographyOverflow } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { CallParticipant } from '@staff-portal/graphql/staff'
import { TypographyOverflowLink } from '@staff-portal/ui'
import { EditableField } from '@staff-portal/editable'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'
import { REFRESH_CALLS_LIST } from '@staff-portal/communication'

import {
  useGetCallCounterpartyNameValue,
  useUpdateCallCounterparty
} from './data'
import UserFieldEditor from './components/UserFieldEditor'
import * as S from './styles'

export interface UserFieldProps {
  callId: string
  initialValue?: string
  profileUrl?: string
}

export interface TextViewProps {
  initialValue?: string
  profileUrl?: string
}

const TextView = ({ initialValue, profileUrl }: TextViewProps) => {
  return (
    <>
      {initialValue && profileUrl ? (
        <TypographyOverflowLink>
          <Link href={profileUrl} title={initialValue}>
            {initialValue}
          </Link>
        </TypographyOverflowLink>
      ) : (
        <TypographyOverflow>{initialValue || NO_VALUE}</TypographyOverflow>
      )}
    </>
  )
}

const UserField = ({ callId, initialValue, profileUrl }: UserFieldProps) => {
  const getCallValues = useGetCallCounterpartyNameValue({
    callId
  })
  const [updateCallCounterparty] = useUpdateCallCounterparty()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  return (
    <EditableField<CallParticipant, CallParticipant['fullName'], undefined>
      name='fullName'
      flex
      queryValue={getCallValues}
      fullWidthEditor
      css={S.EditableUserField}
      onChange={async (_, data) => {
        if (!data.fullName) {
          return
        }

        const { data: updateCallCounterpartyData } =
          await updateCallCounterparty({
            variables: {
              input: {
                callId: callId,
                counterpartyId: data.fullName
              }
            }
          })

        return handleMutationResult({
          mutationResult: updateCallCounterpartyData?.updateCallCounterparty,
          onSuccessAction: () => emitMessage(REFRESH_CALLS_LIST)
        })
      }}
      viewer={<TextView initialValue={initialValue} profileUrl={profileUrl} />}
      editor={UserFieldEditor}
    />
  )
}

export default UserField
