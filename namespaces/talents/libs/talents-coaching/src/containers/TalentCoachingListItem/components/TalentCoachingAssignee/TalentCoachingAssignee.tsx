import React, { useMemo } from 'react'
import { SelectOption } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { AssignCoachToTalentCoachingEngagementInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import {
  TalentCoachingEngagementFragment,
  getTalentCoachingEngagementHook,
  useGetCoachingAssignees
} from '../../../../data'
import ResourceLink from '../ResourceLink'
import { useAssignCoachMutation } from './data'

interface Props {
  coachingEngagementId: TalentCoachingEngagementFragment['id']
  coach: TalentCoachingEngagementFragment['coach']
  editingDisabled: boolean
}

const TalentCoachingAssignee = ({
  coachingEngagementId,
  coach,
  editingDisabled
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [assignCoach] = useAssignCoachMutation({
    onError: () => showError('Unable to update the Assignee.')
  })

  const { assignees } = useGetCoachingAssignees()

  const options = useMemo(
    () => [
      ...assignees.map(({ id, fullName }) => ({
        text: fullName,
        value: id
      }))
    ],
    [assignees]
  )

  const handleChange = async (
    _key: string,
    payload: Partial<AssignCoachToTalentCoachingEngagementInput>
  ) => {
    const { data } = await assignCoach({
      variables: {
        input: {
          talentCoachingEngagementId: coachingEngagementId,
          coachId: payload.coachId ?? ''
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.assignCoachToTalentCoachingEngagement
    })
  }

  return (
    <EditableField<
      AssignCoachToTalentCoachingEngagementInput,
      string,
      SelectOption[]
    >
      name='coachId'
      value={coach?.id}
      onChange={handleChange}
      disabled={editingDisabled}
      queryValue={getTalentCoachingEngagementHook(
        coachingEngagementId,
        'coach'
      )}
      editor={props => (
        <Form.Select {...props} options={options} size='small' width='full' />
      )}
      viewer={<>{coach ? ResourceLink(coach?.webResource) : NO_VALUE}</>}
    />
  )
}

export default TalentCoachingAssignee
