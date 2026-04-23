import React from 'react'
import { TypographyOverflow, SelectOption } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  Maybe,
  UpdateTopShieldApplicationSegmentInput
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { useUpdateSegment } from './hooks/use-update-segment'
import { getLazySegment } from './hooks/get-lazy-segment'
import { TOP_SHIELD_SEGMENTS } from '../../constants'

const TOP_SHIELD_SEGMENT_OPTIONS = TOP_SHIELD_SEGMENTS.map(segment => ({
  text: segment,
  value: segment
}))

interface Props {
  talentId: string
  applicationId: string
  segment: Maybe<string> | undefined
  operationDisabled: boolean
}

const TopShieldStatus = ({
  talentId,
  applicationId,
  segment,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateSegment(applicationId)

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationSegmentInput, 'segment'>,
      string,
      SelectOption[]
    >
      name='segment'
      value={segment ?? undefined}
      onChange={handleChange}
      disabled={operationDisabled}
      queryValue={getLazySegment(talentId)}
      editor={props => (
        <Form.Select
          {...props}
          enableReset
          options={TOP_SHIELD_SEGMENT_OPTIONS}
          size='small'
          width='full'
        />
      )}
      viewer={
        <TypographyOverflow size='medium'>
          {segment ?? NO_VALUE}
        </TypographyOverflow>
      }
    />
  )
}

export default TopShieldStatus
