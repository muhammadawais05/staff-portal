import React from 'react'
import { render, screen } from '@testing-library/react'
import { NegotiationStatus } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import {
  getCompanyNegotiationStatusColor,
  getCompanyNegotiationStatusText
} from './utils'
import { CompanyNegotiationStatus } from './CompanyNegotiationStatus'

jest.mock('./utils', () => ({
  getCompanyNegotiationStatusColor: jest.fn(),
  getCompanyNegotiationStatusText: jest.fn()
}))

const getCompanyNegotiationStatusColorMock =
  getCompanyNegotiationStatusColor as jest.Mock
const getCompanyNegotiationStatusTextMock =
  getCompanyNegotiationStatusText as jest.Mock

describe('CompanyNegotiationStatus', () => {
  describe('when negotiation status is empty', () => {
    beforeEach(() => {
      getCompanyNegotiationStatusColorMock.mockReturnValue('color')
      getCompanyNegotiationStatusTextMock.mockReturnValue(NO_VALUE)
    })

    it('renders placeholder', () => {
      render(<CompanyNegotiationStatus value={undefined} />)

      expect(screen.getByTestId('CompanyNegotiationStatus')).toHaveTextContent(
        NO_VALUE
      )
    })
  })

  describe('when there is a negotiation', () => {
    beforeEach(() => {
      getCompanyNegotiationStatusColorMock.mockReturnValue('color')
      getCompanyNegotiationStatusTextMock.mockReturnValue(
        'Waiting on Client (round: #50, 365 days)'
      )
    })

    it('renders as expected', () => {
      const value = {
        id: '123',
        status: NegotiationStatus.WAITING_ON_CLIENT,
        rounds: 50,
        negotiationDays: 365
      }

      render(<CompanyNegotiationStatus value={value} />)

      expect(screen.getByTestId('CompanyNegotiationStatus')).toHaveTextContent(
        'Waiting on Client (round: #50, 365 days)'
      )
    })
  })
})
