import React from 'react'
import { TypographyOverflow, SelectOption } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  TopShieldApplicationOutreachStatus,
  UpdateTopShieldApplicationOutreachStatusInput
} from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'
import { EditableField } from '@staff-portal/editable'

import { useUpdateOutreachStatus } from './hooks/use-update-outreach-status'
import { getLazyOutreachStatus } from './hooks/get-lazy-outreach-status'
import { TOP_SHIELD_OUTREACH_STATUS } from '../../constants'

const TOP_SHIELD_OUTREACH_STATUS_OPTIONS = Object.entries(
  TOP_SHIELD_OUTREACH_STATUS
).map(([value, text]) => ({ value, text }))

interface Props {
  talentId: string
  applicationId: string
  outreachStatus?: TopShieldApplicationOutreachStatus | null
  operationDisabled: boolean
}

const TopShieldOutreachStatus = ({
  talentId,
  applicationId,
  outreachStatus,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateOutreachStatus(applicationId)

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationOutreachStatusInput, 'outreachStatus'>,
      string,
      SelectOption[]
    >
      name='outreachStatus'
      value={outreachStatus ?? undefined}
      onChange={handleChange}
      disabled={operationDisabled}
      queryValue={getLazyOutreachStatus(talentId)}
      editor={props => (
        <Form.Select
          {...props}
          enableReset
          options={TOP_SHIELD_OUTREACH_STATUS_OPTIONS}
          size='small'
          width='full'
        />
      )}
      viewer={
        <TypographyOverflow size='medium'>
          {outreachStatus
            ? TOP_SHIELD_OUTREACH_STATUS[outreachStatus]
            : NO_VALUE}
        </TypographyOverflow>
      }
    />
  )
}

export default TopShieldOutreachStatus
