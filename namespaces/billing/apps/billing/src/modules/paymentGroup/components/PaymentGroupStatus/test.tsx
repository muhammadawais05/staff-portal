import React, { ComponentProps } from 'react'
import { PaymentGroupStatus as Status } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupStatus from '.'

const render = (props: ComponentProps<typeof PaymentGroupStatus>) =>
  renderComponent(<PaymentGroupStatus {...props} />)

describe('PaymentGroupStatus', () => {
  describe('when status specified', () => {
    it('renders correctly', () => {
      const { queryByTestId } = render({
        group: {
          status: Status.PENDING_PAYMENT
        }
      })

      expect(queryByTestId('PaymentGroupStatus-content')).toContainHTML(
        'Pending Payment'
      )
    })
  })
})
