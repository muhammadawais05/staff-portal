import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingOptionConfirmRemoval from './BillingOptionConfirmRemoval'

const render = (props: ComponentProps<typeof BillingOptionConfirmRemoval>) =>
  renderComponent(<BillingOptionConfirmRemoval {...props} />)

describe('BillingOptionConfirmRemoval', () => {
  describe('when pull method is not last', () => {
    it('should not show warning', () => {
      const { getByTestId, queryByTestId } = render({
        isLastPullMethod: false
      })

      expect(getByTestId('BillingOptionConfirmRemoval')).toHaveTextContent(
        'Are you sure you want to delete this payment method?'
      )
      expect(queryByTestId('BillingOptionConfirmRemoval-warning')).toBeNull()
    })
  })

  describe('when pull method is last', () => {
    it('should show warning', () => {
      const { queryByTestId } = render({
        isLastPullMethod: true
      })

      expect(
        queryByTestId('BillingOptionConfirmRemoval-warning')
      ).toHaveTextContent('This is the last pull method!')
    })
  })
})
