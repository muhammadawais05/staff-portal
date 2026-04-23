import React, { ComponentProps } from 'react'
import { PaymentOptionPaymentMethod } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AccountDetails from '.'

const render = (props: ComponentProps<typeof AccountDetails>) =>
  renderComponent(<AccountDetails {...props} />)

describe('AccountDetails', () => {
  describe('when `accountDetails` empty', () => {
    it('not renders `AccountDetails`', () => {
      const { queryByTestId } = render({
        accountDetails: []
      })

      expect(queryByTestId('AccountDetails')).not.toBeInTheDocument()
    })
  })

  describe('when `accountDetails` is a valid list', () => {
    it('renders `AccountDetails`', () => {
      const { getByTestId } = render({
        accountDetails: [
          {
            accountInfo: [
              { label: 'Iban', value: '' },
              { label: 'Routing number', value: '' },
              { label: 'Name on account', value: '' },
              { label: 'Personal address', value: '' },
              { label: 'Bank address', value: '' },
              { label: 'Comment', value: '' },
              { label: 'Payoneer Id', value: '' },
              { label: 'Payoneer', value: '' },
              { label: 'Username', value: '' }
            ],
            text: 'Bank Wire',
            value: PaymentOptionPaymentMethod.BANK_WIRE
          }
        ]
      })

      expect(getByTestId('AccountDetails')).toBeInTheDocument()
      expect(getByTestId('DetailedList-items')).toContainHTML(
        '[{"label":"Account number or IBAN","value":"—"},{"label":"Routing number or SWIFT","value":"—"},{"label":"Name on account","value":"—"},{"label":"Personal address","value":"—"},{"label":"Bank address","value":"—"},{"label":"Comment","value":"—"},{"label":"Payoneer ID","value":"—"},{"label":"Payoneer ID","value":"—"},{"label":"PayPal ID","value":"—"}]'
      )
      expect(getByTestId('DetailedList-columns')).toContainHTML('1')
      expect(getByTestId('DetailedList-labelColumnWidth').textContent).toBe(
        '14'
      )
      expect(getByTestId('DetailedList-striped')).toContainHTML('true')
    })
  })
})
