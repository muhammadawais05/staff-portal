import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import BillingTableDocuments from '.'

const render = (props: ComponentProps<typeof BillingTableDocuments>) =>
  renderComponent(<BillingTableDocuments {...props} />)

describe('BillingTableDocuments', () => {
  describe('when `data` is `empty`', () => {
    it('default render', () => {
      const { queryByTestId, queryByText } = render({ data: { nodes: [] } })

      expect(queryByTestId('BillingTableDocuments-item_0')).toBeNull()
      expect(queryByText(EMPTY_DATA)).toBeInTheDocument()
    })
  })

  describe('when `data` is not `empty`', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        data: fixtures.MockExtraExpenses.nodes[0].payments
      })

      expect(queryByTestId('BillingTableDocuments-item_0')).toBeInTheDocument()
    })
  })
})
