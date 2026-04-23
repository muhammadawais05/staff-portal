import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import StepMainButton, { Props } from './StepMainButton'
import { StepIndicatorColor } from '../enums'
import StepIndicator from '../StepIndicator'

jest.mock('../StepIndicator', () => ({
  __esModule: true,
  default: jest.fn()
}))
const StepIndicatorMock = StepIndicator as jest.Mock

const defaultProps = {
  label: 'Step label',
  onClick: () => {}
}

const arrangeTest = (props: Partial<Props> = {}) => {
  StepIndicatorMock.mockReturnValue(null)

  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <StepMainButton {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  )

  return {
    content: innerHTML
  }
}

describe('StepMainButton', () => {
  it('renders a step indicator', () => {
    arrangeTest({
      indicatorData: {
        color: StepIndicatorColor.Green,
        withArrow: true
      }
    })

    expect(StepIndicatorMock).toHaveBeenCalledWith(
      { color: StepIndicatorColor.Green, withArrow: true },
      {}
    )
  })

  it('does not render a content icon', () => {
    arrangeTest({
      indicatorData: undefined
    })

    expect(StepIndicatorMock).toHaveBeenCalledTimes(0)
  })

  it('renders a step label', () => {
    const { content } = arrangeTest()

    expect(content).toContain('Step label')
  })

  it('renders a tooltip', () => {
    const { content } = arrangeTest({ tooltip: 'test' })

    expect(content).toContain('test')
  })
})
