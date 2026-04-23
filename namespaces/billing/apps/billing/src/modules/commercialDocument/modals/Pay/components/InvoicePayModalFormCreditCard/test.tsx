import { FinalForm } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalFormCreditCard from '.'

const render = (props: ComponentProps<typeof InvoicePayModalFormCreditCard>) =>
  renderComponent(
    <FinalForm onSubmit={noop}>
      {() => <InvoicePayModalFormCreditCard {...props} />}
    </FinalForm>
  )

describe('InvoicePayModalFormCreditCard', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => MockDate.reset())

  it('default render', () => {
    const { container } = render({
      hasOtherBillingMethods: false,
      options: [
        {
          disabled: false,
          id: 'abc1234',
          last4Digits: '1234',
          numericId: 1234,
          primary: true
        }
      ]
    })

    expect(container).toMatchSnapshot()
  })
})
