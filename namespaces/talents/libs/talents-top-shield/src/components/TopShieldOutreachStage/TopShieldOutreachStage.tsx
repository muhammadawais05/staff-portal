import React from 'react'
import { TypographyOverflow, SelectOption } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  TopShieldApplicationOutreachStage,
  UpdateTopShieldApplicationOutreachStageInput
} from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'
import { EditableField } from '@staff-portal/editable'

import { useUpdateOutreachStage } from './hooks/use-update-outreach-stage'
import { getLazyOutreachStage } from './hooks/get-lazy-outreach-stage'
import { TOP_SHIELD_OUTREACH_STAGES } from '../../constants'

const TOP_SHIELD_OUTREACH_STAGES_OPTIONS = Object.entries(
  TOP_SHIELD_OUTREACH_STAGES
).map(([value, text]) => ({ value, text }))

interface Props {
  talentId: string
  applicationId: string
  outreachStage?: TopShieldApplicationOutreachStage | null
  operationDisabled: boolean
}

const TopShieldOutreachStage = ({
  talentId,
  applicationId,
  outreachStage,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateOutreachStage(applicationId)

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationOutreachStageInput, 'outreachStage'>,
      string,
      SelectOption[]
    >
      name='outreachStage'
      value={outreachStage ?? undefined}
      onChange={handleChange}
      disabled={operationDisabled}
      queryValue={getLazyOutreachStage(talentId)}
      editor={props => (
        <Form.Select
          {...props}
          enableReset
          options={TOP_SHIELD_OUTREACH_STAGES_OPTIONS}
          size='small'
          width='full'
        />
      )}
      viewer={
        <TypographyOverflow size='medium'>
          {outreachStage ? TOP_SHIELD_OUTREACH_STAGES[outreachStage] : NO_VALUE}
        </TypographyOverflow>
      }
    />
  )
}

export default TopShieldOutreachStage
