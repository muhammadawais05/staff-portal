import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import UnsafeAdvancedHtmlFormatter, {
  Props
} from './UnsafeAdvancedHtmlFormatter'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <UnsafeAdvancedHtmlFormatter {...props} />
    </TestWrapper>
  )

describe('UnsafeAdvancedHtmlFormatter', () => {
  it('should display given html string', async () => {
    const html = '<div>foo<span>bar</span></div>'

    const { container } = arrangeTest({ html })

    expect(container.querySelectorAll('div')).toHaveLength(3)
    expect(container.querySelectorAll('span')).toHaveLength(1)
    expect(screen.getByText('foo')).toBeInTheDocument()
    expect(screen.getByText('bar')).toBeInTheDocument()
  })

  describe('when `as` property is set', () => {
    it('should display given html string', async () => {
      const html = '<div>foo<span>bar</span></div>'

      const { container } = arrangeTest({ html, as: 'span' })

      expect(container.querySelectorAll('div')).toHaveLength(2)
      expect(container.querySelectorAll('span')).toHaveLength(2)
      expect(screen.getByText('foo')).toBeInTheDocument()
      expect(screen.getByText('bar')).toBeInTheDocument()
    })
  })

  describe('when `className` property is set', () => {
    it('should pass `className` property to inner component', async () => {
      const html = '<div>foo<span>bar</span></div>'

      arrangeTest({
        'data-testid': 'html-formatter',
        className: 'styled',
        html
      })

      expect(screen.getByTestId('html-formatter')).toHaveProperty(
        'className',
        'styled'
      )
    })
  })
})
