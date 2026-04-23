import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'

export type Props = {
  lockOverrideRequired?: Maybe<boolean>
}

const ConfirmLockOverrideQuestionItem = ({ lockOverrideRequired }: Props) => {
  if (!lockOverrideRequired) {
    return null
  }

  return (
    <DetailedList.Row>
      <DetailedList.Item>
        <Form.Checkbox
          required
          name='lockOverrideConfirmed'
          label="I've verified with my pod lead that I can override and send this talent"
          titleCase={false}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default ConfirmLockOverrideQuestionItem
