import { Form } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupSelectableList from '.'

jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
)
jest.mock('@staff-portal/billing/src/components/RowExpander')

const render = (props: ComponentProps<typeof PaymentGroupSelectableList>) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <PaymentGroupSelectableList {...props} />
    </Form>
  )

describe('PaymentGroupSelectableList', () => {
  describe('when its a non selectable List', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        paymentGroups: [fixtures.MockPaymentGroup],
        selectionEnabled: false
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'PaymentGroupSelectableList-checkbox-all'
      )
      const CheckBoxComponent = queryByTestId(
        'PaymentGroupSelectableListRow-checkbox'
      )
      const CheckBoxAllComponent = queryByTestId(
        'PaymentGroupSelectableList-checkbox-all'
      )
      const DateComponent = queryByTestId(
        'PaymentGroupSelectableListRow-created-on-date'
      )

      expect(CheckBoxHeaderComponent).toBeNull()
      expect(CheckBoxComponent).toBeNull()
      expect(CheckBoxAllComponent).toBeNull()
      expect(DateComponent).toBeInTheDocument()
    })
  })

  describe('when its a selectable List', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        paymentGroups: [fixtures.MockPaymentGroup],
        selectionEnabled: true
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'PaymentGroupSelectableList-checkbox-all'
      )
      const CheckBoxComponent = queryByTestId(
        `PaymentGroupSelectableListRow-checkbox`
      )
      const CheckBoxAllComponent = queryByTestId(
        'PaymentGroupSelectableList-checkbox-all'
      )
      const DateComponent = queryByTestId(
        'PaymentGroupSelectableListRow-created-on-date'
      )

      expect(CheckBoxHeaderComponent).not.toBeNull()
      expect(CheckBoxComponent).not.toBeNull()
      expect(CheckBoxAllComponent).not.toBeNull()
      expect(DateComponent).toBeInTheDocument()
    })
  })
})
