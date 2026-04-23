import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetPaymentDetailsTable } from './data'
import PaymentDetailsTable from '.'

jest.mock('./data')
jest.mock('../../../commercialDocument/components/DetailsDescription')
jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('./utils', () => () => [{ label: 'a', value: 'b' }])

const render = () =>
  renderComponent(<PaymentDetailsTable paymentId={fixtures.MockPayment.id} />)

describe('PaymentDetailsTable', () => {
  describe('when payment is defined', () => {
    it('renders Component', () => {
      ;(useGetPaymentDetailsTable as jest.Mock).mockReturnValue({
        data: fixtures.MockPayment,
        loading: false
      })

      const { getByTestId } = render()

      expect(useGetPaymentDetailsTable).toHaveBeenCalledWith(
        'VjEtUGF5bWVudC0xMTA0NDI4'
      )

      expect(getByTestId('PaymentDetailsTable')).toBeInTheDocument()
      expect(getByTestId('DetailsDescription')).toContainHTML('Details')
      expect(getByTestId('DetailedList')).toBeInTheDocument()
      expect(getByTestId('DetailedList-columns')).toContainHTML('2')
      expect(getByTestId('DetailedList-items')).toContainHTML('ab')
      expect(getByTestId('DetailedList-labelColumnWidth').textContent).toBe('8')
      expect(getByTestId('DetailedList-striped')).toContainHTML('true')
      expect(getByTestId('DetailsDescription-description')).toContainHTML(
        'Commission for screening Technical 2 Core step of Martijn Meijer for his/her services on Python Developer for Rental Platform: June 21, 2020 to July 4, 2020.'
      )
    })
  })

  describe('when payment is undefined', () => {
    it('renders skeleton', () => {
      ;(useGetPaymentDetailsTable as jest.Mock).mockReturnValue({
        data: undefined,
        loading: false
      })

      const { queryByTestId, getByTestId } = render()

      expect(getByTestId('DetailsDescription')).toContainHTML('Details')
      expect(queryByTestId('DetailedList')).toBeNull()
    })
  })
})
