import React, { useEffect, useState } from 'react'
import {
  CommunityLeaderType,
  UpdateCommunityLeaderInput
} from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { Option } from '@toptal/picasso/Select/types'
import { Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

import { CommunityLeaderData } from '../../types'
import { getCommunityLeaderType } from '../../services/get-community-leader-type'
import { useUpdateCommunityLeader } from '../TalentCommunityLeaderModal/data/update-community-leader'
import { useGetCommunityLeaderType } from '../../data/get-community-leader-type/get-community-leader-type.staff.gql'

interface Props {
  communityLeaderData: CommunityLeaderData
  onListChange?: () => void
}

const TYPE_KEY = 'type'

const CommunityLeaderUpdateField = ({
  communityLeaderData,
  onListChange
}: Props) => {
  const [value, setValue] = useState(
    communityLeaderData?.type ?? CommunityLeaderType.COMMUNITY_LEADER
  )

  useEffect(
    () =>
      setValue(
        communityLeaderData?.type ?? CommunityLeaderType.COMMUNITY_LEADER
      ),
    [communityLeaderData]
  )

  const id = communityLeaderData?.node?.id as string
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateCommunityLeader] = useUpdateCommunityLeader({
    onError() {
      showError('Unable to update community leader data')
    }
  })
  const getTypeQuery = useGetCommunityLeaderType({ id })

  const handleChange = async (
    _key: keyof UpdateCommunityLeaderInput,
    input: Partial<UpdateCommunityLeaderInput>
  ) => {
    const { type = CommunityLeaderType.COMMUNITY_LEADER } = input

    const { data } = await updateCommunityLeader({
      variables: {
        input: {
          type,
          id
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateCommunityLeader,
      successNotificationMessage: `Community Leader was updated successfully`,
      onSuccessAction: () => {
        setValue(input.type as CommunityLeaderType)
        onListChange?.()
      }
    })
  }

  const OPTIONS = [
    {
      text: getCommunityLeaderType(CommunityLeaderType.COMMUNITY_LEADER),
      value: CommunityLeaderType.COMMUNITY_LEADER
    },
    {
      text: getCommunityLeaderType(CommunityLeaderType.ONLINE_LEADER),
      value: CommunityLeaderType.ONLINE_LEADER
    }
  ]

  return (
    <EditableField<UpdateCommunityLeaderInput, CommunityLeaderType, Option[]>
      name={TYPE_KEY}
      onChange={handleChange}
      value={value || ''}
      disabled={
        !isOperationEnabled(
          communityLeaderData?.operations?.updateCommunityLeader
        )
      }
      viewer={<Typography>{getCommunityLeaderType(value)}</Typography>}
      queryValue={() => getTypeQuery}
      editor={props => (
        <Form.Select
          {...props}
          autoFocus
          size='small'
          placeholder='Choose an option...'
          width='full'
          options={OPTIONS}
        />
      )}
    />
  )
}

export default CommunityLeaderUpdateField
