import React from 'react'
import { TypographyOverflow, SelectOption } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import {
  ChangeTalentCoachingEngagementStatusInput,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { EditableField } from '@staff-portal/editable'

import { COACHING_STATUS_MAPPING } from '../../../../constants'
import { getTalentCoachingEngagementHook } from '../../../../data'
import { useChangeCoachingStatusMutation } from './data'

const COACHING_STATUS_OPTIONS = [
  ...Object.keys(COACHING_STATUS_MAPPING)
    .map(key => ({
      text: COACHING_STATUS_MAPPING[key as TalentCoachingEngagementStatus].text,
      value: key
    }))
]

interface Props {
  coachingEngagementId: string
  status: TalentCoachingEngagementStatus
  operationDisabled: boolean
}

const TalentCoachingStatus = ({
  coachingEngagementId,
  status,
  operationDisabled
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [changeStatus] = useChangeCoachingStatusMutation({
    onError: () => showError('Unable to update the Coaching Status.')
  })

  const handleChange = async (
    _key: string,
    payload: Partial<ChangeTalentCoachingEngagementStatusInput>
  ) => {
    const { data } = await changeStatus({
      variables: {
        input: {
          talentCoachingEngagementId: coachingEngagementId,
          status: payload.status ?? status
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.changeTalentCoachingEngagementStatus
    })
  }

  return (
    <EditableField<
      ChangeTalentCoachingEngagementStatusInput,
      string,
      SelectOption[]
    >
      name='status'
      value={status}
      onChange={handleChange}
      disabled={operationDisabled}
      queryValue={getTalentCoachingEngagementHook(
        coachingEngagementId,
        'status'
      )}
      editor={props => (
        <Form.Select
          {...props}
          options={COACHING_STATUS_OPTIONS}
          size='small'
          width='full'
        />
      )}
      viewer={
        <TypographyOverflow
          size='medium'
          color={COACHING_STATUS_MAPPING[status].color}
        >
          {COACHING_STATUS_MAPPING[status].text}
        </TypographyOverflow>
      }
    />
  )
}

export default TalentCoachingStatus
