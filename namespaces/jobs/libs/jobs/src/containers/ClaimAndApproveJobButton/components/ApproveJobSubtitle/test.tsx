import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ApproveJobSubtitle from './ApproveJobSubtitle'

const arrangeTest = (text: string, weight?: 'regular' | 'semibold') => {
  const {
    container: { textContent, innerHTML }
  } = render(
    <TestWrapper>
      <ApproveJobSubtitle weight={weight}>{text}</ApproveJobSubtitle>
    </TestWrapper>
  )

  return { textContent, innerHTML }
}

describe('ApproveJobSubtitle', () => {
  it('returns a simibold subtitle', () => {
    const { textContent, innerHTML } = arrangeTest('hello world')

    expect(textContent).toBe('hello world')
    expect(innerHTML).toContain('semibold')
  })

  it('returns a regular subtitle', () => {
    const { textContent, innerHTML } = arrangeTest('hello world', 'regular')

    expect(textContent).toBe('hello world')
    expect(innerHTML).toContain('regular')
    expect(innerHTML).not.toContain('semibold')
  })
})
