import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentPoolProgressBar from './TalentPoolProgressBar'

const arrangeTest = (isVisible?: boolean) =>
  render(
    <TestWrapper>
      <TalentPoolProgressBar applicableTalentPool={70} isVisible={isVisible} />
    </TestWrapper>
  )

describe('TalentPoolProgressBar', () => {
  it('renders', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId('TalentPoolProgressBar')).toBeInTheDocument()
  })

  it('is not visible by default', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId('TalentPoolProgressBar')).not.toBeVisible()
  })

  it('is visible by passing `isVisible` prop being set to true', () => {
    const { getByTestId } = arrangeTest(true)

    expect(getByTestId('TalentPoolProgressBar')).toBeVisible()
  })

  it('renders label with correct label of talent pool', () => {
    const { getByText } = arrangeTest()

    expect(getByText('70%')).toBeInTheDocument()
    expect(getByText('of talent pool')).toBeInTheDocument()
  })
})
