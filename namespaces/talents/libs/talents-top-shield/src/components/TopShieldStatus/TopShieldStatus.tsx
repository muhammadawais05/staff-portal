import React from 'react'
import { TypographyOverflow, SelectOption } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  TopShieldApplicationStatus,
  UpdateTopShieldApplicationStatusInput
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'

import { useUpdateStatus } from './hooks/use-update-status'
import { getLazyStatus } from './hooks/get-lazy-status'
import { TOP_SHIELD_STATUS_MAPPING } from '../../constants'

const TOP_SHIELD_STATUS_OPTIONS = [
  ...Object.keys(TOP_SHIELD_STATUS_MAPPING).map(key => ({
    text: TOP_SHIELD_STATUS_MAPPING[key as TopShieldApplicationStatus].text,
    value: key
  }))
]

interface Props {
  talentId: string
  applicationId: string
  status: TopShieldApplicationStatus
  operationDisabled: boolean
}

const TopShieldStatus = ({
  talentId,
  applicationId,
  status,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateStatus(applicationId)

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationStatusInput, 'status'>,
      string,
      SelectOption[]
    >
      name='status'
      value={status}
      onChange={handleChange}
      disabled={operationDisabled}
      queryValue={getLazyStatus(talentId)}
      editor={props => (
        <Form.Select
          {...props}
          options={TOP_SHIELD_STATUS_OPTIONS}
          size='small'
          width='full'
        />
      )}
      viewer={
        <TypographyOverflow
          size='medium'
          color={TOP_SHIELD_STATUS_MAPPING[status].color}
        >
          {TOP_SHIELD_STATUS_MAPPING[status].text}
        </TypographyOverflow>
      }
    />
  )
}

export default TopShieldStatus
