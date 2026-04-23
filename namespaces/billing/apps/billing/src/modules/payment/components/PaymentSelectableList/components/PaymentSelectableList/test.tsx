import { Form } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentSelectableList from '.'

jest.mock(
  '@staff-portal/billing-widgets/src/modules/payment/components/PaymentShortDescription'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
)
jest.mock('@staff-portal/billing/src/components/RowExpander')

const render = (props: ComponentProps<typeof PaymentSelectableList>) =>
  renderComponent(
    <Form>
      <PaymentSelectableList {...props} />
    </Form>
  )

describe('PaymentSelectableList', () => {
  describe('when its a non selectable List', () => {
    it('default render', () => {
      const { container, queryByTestId } = render({
        payments: [fixtures.MockPayment],
        selectionEnabled: false
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'PaymentSelectableList-checkbox-all'
      )
      const CheckBoxComponent = queryByTestId(
        'PaymentSelectableListRow-checkbox'
      )
      const CheckBoxAllComponent = queryByTestId(
        'PaymentSelectableList-checkbox-all'
      )
      const DateComponent = queryByTestId(
        'PaymentSelectableListRow-created-on-date'
      )

      expect(CheckBoxHeaderComponent).toBeNull()
      expect(CheckBoxComponent).toBeNull()
      expect(CheckBoxAllComponent).toBeNull()
      expect(DateComponent).toBeInTheDocument()
      expect(container).toMatchSnapshot()
    })
  })

  describe('when its a selectable List', () => {
    it('default render', () => {
      const { container, queryByTestId } = render({
        payments: [fixtures.MockPayment],
        selectionEnabled: true
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'PaymentSelectableList-checkbox-all'
      )
      const CheckBoxComponent = queryByTestId(
        `PaymentSelectableListRow-checkbox`
      )
      const CheckBoxAllComponent = queryByTestId(
        'PaymentSelectableList-checkbox-all'
      )
      const DateComponent = queryByTestId(
        'PaymentSelectableListRow-created-on-date'
      )

      expect(CheckBoxHeaderComponent).not.toBeNull()
      expect(CheckBoxComponent).not.toBeNull()
      expect(CheckBoxAllComponent).not.toBeNull()
      expect(DateComponent).toBeInTheDocument()
      expect(container).toMatchSnapshot()
    })
  })
})
