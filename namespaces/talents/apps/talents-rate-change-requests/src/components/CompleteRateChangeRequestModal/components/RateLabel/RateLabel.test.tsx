import React, { ComponentProps } from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import RateLabel from './RateLabel'

const arrangeTest = (props: ComponentProps<typeof RateLabel>) =>
  render(
    <TestWrapper>
      <RateLabel {...props} />
    </TestWrapper>
  )

describe('RateLabel', () => {
  it('shows label and formatted amount', () => {
    arrangeTest({
      label: 'Test label',
      amount: '123.45'
    })

    expect(screen.getByText('Test label')).toBeInTheDocument()
    expect(screen.getByText('$123.45')).toBeInTheDocument()
  })

  it('shows labe and no value when amount is not present', () => {
    arrangeTest({
      label: 'Test label'
    })

    expect(screen.getByText('Test label')).toBeInTheDocument()
    expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
  })
})
