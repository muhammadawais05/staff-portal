import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'

export type Props = {
  lockOverrideConfirmed?: Maybe<boolean>
}

const LockOverrideReasonItem = ({ lockOverrideConfirmed }: Props) => {
  if (!lockOverrideConfirmed) {
    return null
  }

  return (
    <DetailedList.Row>
      <DetailedList.Item>
        <Form.Input
          required
          name='lockOverrideReason'
          placeholder="It's ok to send the talent to another position because..."
          multiline
          width='full'
          rows={5}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default LockOverrideReasonItem
