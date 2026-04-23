import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillCycleSelect from '.'

const render = (props: ComponentProps<typeof BillCycleSelect>) =>
  renderComponent(
    <Form onSubmit={() => {}}>
      <BillCycleSelect {...props} />
    </Form>
  )

describe('BillCycleSelect', () => {
  it('default render', () => {
    const { getByTestId } = render({})

    expect(getByTestId('BillCycleSelect')).toHaveTextContent(
      'Invoice Frequency'
    )
  })
})
