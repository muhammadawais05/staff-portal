import { FinalForm } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalFormAch from '.'

const render = (props: ComponentProps<typeof InvoicePayModalFormAch>) =>
  renderComponent(
    <FinalForm onSubmit={jest.fn()}>
      {() => <InvoicePayModalFormAch {...props} />}
    </FinalForm>
  )

describe('InvoicePayModalFormAch', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => MockDate.reset())

  describe('when single option provided', () => {
    it('render required visuals', () => {
      const { getByTestId, getByText } = render({
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

      expect(getByText('***** 1234')).toBeInTheDocument()
      expect(getByTestId('payment-processing-date').innerHTML).toBe(
        '{"width":"full","testIds":{"input":"payment-processing-date"},"name":"achProcessingDate","minDate":"2019-01-01T19:00:00.000Z","displayDateFormat":"","editDateFormat":"","id":"payment-processing-date","weekStartsOn":0,"error":false}'
      )
    })
  })
})
