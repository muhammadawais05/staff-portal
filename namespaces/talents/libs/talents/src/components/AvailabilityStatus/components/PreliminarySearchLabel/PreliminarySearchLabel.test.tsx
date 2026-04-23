import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import PreliminarySearchLabel from './PreliminarySearchLabel'

const arrangeTest = (
  props: ComponentProps<typeof PreliminarySearchLabel> = {}
) =>
  render(
    <TestWrapper>
      <PreliminarySearchLabel {...props} />
    </TestWrapper>
  )

describe('PreliminarySearchLabel', () => {
  it('shows disabled job search message', () => {
    const { container } = arrangeTest()

    expect(container).toHaveTextContent(
      'Job search before engagement ends is disabled'
    )
  })

  it('shows enabled job search message', () => {
    const { container } = arrangeTest({ preliminarySearchEnabled: true })

    expect(container).toHaveTextContent(
      'Job search before engagement ends is enabled'
    )
  })
})
