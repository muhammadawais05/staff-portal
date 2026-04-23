import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'
import { BillCycle, Maybe } from '@staff-portal/graphql/staff'

const FIELD_NAME = 'semiMonthlyBilling'

interface Props {
  billCycle?: Maybe<BillCycle>
}

const SemiMonthlyBillingCyclesRadio = ({ billCycle }: Props) => (
  <GridItemField
    label='Semi-monthly billing cycles required?'
    labelFor={FIELD_NAME}
    size='medium'
  >
    <Form.RadioGroup id={FIELD_NAME} name={FIELD_NAME} horizontal>
      <Form.Radio label='Yes' value='YES' disabled={!!billCycle} />
      <Form.Radio label='No' value='NO' disabled={!!billCycle} />
    </Form.RadioGroup>
  </GridItemField>
)

export default SemiMonthlyBillingCyclesRadio
