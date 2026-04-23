import React, { ComponentProps, ReactNode } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import PaymentsRateTableHourlyTooltip from './PaymentsRateTableHourlyTooltip'
import { DetailsStepPaymentsTalentFragment } from '../../../../data/get-details-step-data'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: ({
    content,
    children
  }: {
    content: ReactNode
    children: ReactNode
  }) => (
    <div data-testid='tooltip'>
      <div data-testid='tooltip-content'>{content}</div>
      <div>{children}</div>
    </div>
  )
}))

const renderComponent = (
  props?: ComponentProps<typeof PaymentsRateTableHourlyTooltip>
) =>
  render(
    <TestWrapper>
      <PaymentsRateTableHourlyTooltip
        talent={{} as DetailsStepPaymentsTalentFragment}
        {...props}
      />
    </TestWrapper>
  )

describe('PaymentsRateTableHourlyTooltip', () => {
  describe('when baseHourlyRate & requestedHourlyRate are equal', () => {
    it('does not render tooltip', () => {
      renderComponent({
        mostRecentEngageableApplication: {
          requestedHourlyRate: '10.00',
          baseHourlyRate: '10.00'
        },
        talent: {
          hourlyRate: '12.00'
        } as DetailsStepPaymentsTalentFragment
      })

      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument()
    })
  })

  describe('when talent.hourlyRate & requestedHourlyRate are equal', () => {
    it('does not render tooltip', () => {
      renderComponent({
        mostRecentEngageableApplication: {
          requestedHourlyRate: '10.00',
          baseHourlyRate: null
        },
        talent: {
          hourlyRate: '10.00'
        } as DetailsStepPaymentsTalentFragment
      })

      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument()
    })
  })

  describe('when baseHourlyRate & requestedHourlyRate are not equal, but there are no defaultClientRates', () => {
    it('does not render tooltip', () => {
      renderComponent({
        mostRecentEngageableApplication: {
          requestedHourlyRate: '10.00',
          baseHourlyRate: '12.00'
        },
        talent: {} as DetailsStepPaymentsTalentFragment
      })

      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument()
    })
  })

  describe('when baseHourlyRate & requestedHourlyRate are not equal, and there are defaultClientRates', () => {
    it('renders tooltip', () => {
      renderComponent({
        mostRecentEngageableApplication: {
          requestedHourlyRate: '10.00',
          baseHourlyRate: '12.00'
        },
        talent: {
          defaultClientRates: {
            hourlyRate: '10.00',
            weeklyRatePartTime: '40.00',
            weeklyRateFullTime: '55.00'
          }
        } as DetailsStepPaymentsTalentFragment
      })

      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        `Company RatesHourly: $10.00/hPart-time: $40.00/weekFull-time: $55.00/weekTalent updated their rate for this job:$12.00/hr $10.00/hr`
      )
    })
  })
})
