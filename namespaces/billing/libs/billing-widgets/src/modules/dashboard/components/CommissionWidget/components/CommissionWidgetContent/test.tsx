import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import CommissionWidgetContent from '.'

const render = (props: ComponentProps<typeof CommissionWidgetContent>) =>
  renderComponent(<CommissionWidgetContent {...props} />)

const testId = CommissionWidgetContent.displayName

describe('CommissionWidgetContent', () => {
  describe('when data is missing', () => {
    it('not renders Components', () => {
      const { queryByTestId } = render({})

      expect(queryByTestId(`${testId}-payment`)).not.toBeInTheDocument()
      expect(queryByTestId(`${testId}-subtitle_amount`)).not.toBeInTheDocument()
      expect(queryByTestId(`${testId}-subtitle`)).not.toBeInTheDocument()
    })
  })

  describe('when data is defined', () => {
    describe('when data has no months', () => {
      it('renders Empty Components', () => {
        const { getByTestId, queryByTestId } = render({
          data: {
            widgets: {
              commissions: {
                months: [],
                totalAmount: '0'
              }
            }
          }
        })

        expect(getByTestId(`DashboardItemWrapper-title`)).toHaveTextContent(
          'Commissions'
        )
        expect(queryByTestId(`${testId}-payment`)).not.toBeInTheDocument()

        expect(getByTestId(`${testId}-subtitle`)).toHaveTextContent(
          'Total Earnings'
        )
        expect(getByTestId(`${testId}-subtitle_amount`)).toHaveTextContent('$0')

        expect(getByTestId(`${testId}Empty`)).toHaveTextContent(
          "As soon as your referrals are approved and actively working, you'll start receiving commissions from their payments."
        )
      })
    })

    describe('when data has months', () => {
      it('renders Table Components', () => {
        const { getAllByTestId, getByTestId } = render({
          data: fixtures.MockGetDashboardCommissionWidgetQuery
        })

        expect(getByTestId(`DashboardItemWrapper-title`)).toHaveTextContent(
          'Commissions'
        )
        expect(getByTestId(`${testId}-payment`)).toHaveTextContent(
          'See Payments'
        )

        expect(getByTestId(`${testId}-subtitle`)).toHaveTextContent(
          'Total Earnings'
        )
        expect(getByTestId(`${testId}-subtitle_amount`)).toHaveTextContent(
          '$11,628.13'
        )

        expect(getByTestId(`${testId}Table-title`)).toHaveTextContent(
          'Recent Earnings'
        )
        expect(getByTestId(`${testId}-payment`)).toHaveTextContent(
          'See Payments'
        )

        expect(getAllByTestId(`${testId}Table-date`)[0]).toHaveTextContent(
          'September 2020'
        )
        expect(getAllByTestId(`${testId}Table-amount`)[0]).toHaveTextContent(
          '$2,569.30'
        )
        expect(getAllByTestId(`${testId}Table-date`)[1]).toHaveTextContent(
          'October 2020'
        )
        expect(getAllByTestId(`${testId}Table-amount`)[1]).toHaveTextContent(
          '$4,603.85'
        )
        expect(getAllByTestId(`${testId}Table-date`)[2]).toHaveTextContent(
          'November 2020'
        )
        expect(getAllByTestId(`${testId}Table-amount`)[2]).toHaveTextContent(
          '$16.20'
        )
      })
    })
  })
})
