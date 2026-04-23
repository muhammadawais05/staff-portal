import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Operation } from '@staff-portal/operations'
import { Maybe, Operation as GQLOperation } from '@staff-portal/graphql/staff'

export type Props = {
  acquireHighPriorityLockOperation?: Maybe<GQLOperation>
}

const ConfirmHighPriorityLockQuestionItem = ({
  acquireHighPriorityLockOperation
}: Props) => (
  <DetailedList.Row>
    <DetailedList.Item>
      <Operation
        operation={acquireHighPriorityLockOperation ?? undefined}
        render={disabled => (
          <Form.Checkbox
            disabled={disabled}
            name='highPriorityLockAcquired'
            label='Add a talent lock for high priority jobs (valid for 5 business days)'
            titleCase={false}
          />
        )}
      ></Operation>
    </DetailedList.Item>
  </DetailedList.Row>
)

export default ConfirmHighPriorityLockQuestionItem
