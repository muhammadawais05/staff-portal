import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import BillingCommissions from '.'

const render = (props: ComponentProps<typeof BillingCommissions>) =>
  renderComponent(<BillingCommissions {...props} />)

describe('BillingCommissions', () => {
  describe('when `commissions` is empty', () => {
    it('default render', () => {
      const { queryByTestId, queryByText } = render({ commissions: [] })

      expect(queryByTestId('BillingCommissions-commission')).toBeNull()
      expect(queryByText(EMPTY_DATA)).toBeInTheDocument()
    })
  })

  describe('when `commissions` has data', () => {
    it('default render', () => {
      const { queryAllByTestId } = render({
        commissions: fixtures.MockEngagementDocuments.commissions
      })

      const renderedCommissions = queryAllByTestId(
        'BillingCommissions-commission-amount'
      )

      expect(renderedCommissions).toHaveLength(211)
    })
  })
})
