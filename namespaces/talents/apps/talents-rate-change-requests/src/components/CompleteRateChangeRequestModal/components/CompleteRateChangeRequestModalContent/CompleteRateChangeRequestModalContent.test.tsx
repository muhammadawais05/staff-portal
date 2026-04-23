import React, { ComponentProps } from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'

import CompleteRateChangeRequestModalContent from './CompleteRateChangeRequestModalContent'

const arrangeTest = (
  props: ComponentProps<typeof CompleteRateChangeRequestModalContent>
) =>
  render(
    <TestWrapper>
      <CompleteRateChangeRequestModalContent {...props} />
    </TestWrapper>
  )

describe('CompleteRateChangeRequestModalContent', () => {
  it('renders content for rate consultation', () => {
    arrangeTest({
      currentRate: '123.45',
      requestTypeEnumValue: RateChangeRequestTypeEnum.CONSULTATION,
      talentComment: 'Test talent comment'
    })

    expect(screen.getByText('Current Hourly Rate')).toBeInTheDocument()
    expect(screen.getByText('$123.45')).toBeInTheDocument()
    expect(screen.queryByText('Desired Hourly Rate')).not.toBeInTheDocument()
    expect(screen.getByText('Comment from talent:')).toBeInTheDocument()
    expect(screen.getByText('Test talent comment')).toBeInTheDocument()
  })

  it('renders content for rate change', () => {
    arrangeTest({
      currentRate: '123.45',
      desiredRate: '234.56',
      requestTypeEnumValue: RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT,
      talentComment: 'Test talent comment'
    })

    expect(screen.getByText('Current Hourly Rate')).toBeInTheDocument()
    expect(screen.getByText('$123.45')).toBeInTheDocument()
    expect(screen.getByText('Desired Hourly Rate')).toBeInTheDocument()
    expect(screen.getByText('$234.56')).toBeInTheDocument()
    expect(screen.getByText('Comment from talent:')).toBeInTheDocument()
    expect(screen.getByText('Test talent comment')).toBeInTheDocument()
  })
})
