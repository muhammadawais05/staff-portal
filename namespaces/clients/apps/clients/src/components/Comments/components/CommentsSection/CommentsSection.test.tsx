import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Section } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import CommentsSection from '.'

jest.mock('@toptal/picasso', () => ({
  Section: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof CommentsSection>) =>
  render(
    <TestWrapper>
      <CommentsSection {...props} />
    </TestWrapper>
  )

const SectionMock = Section as unknown as jest.Mock
const children = <div>children</div>

describe('CommentsSection', () => {
  beforeEach(() => {
    SectionMock.mockImplementationOnce(() => null)
  })

  it('renders section', () => {
    arrangeTest({ children })

    expect(SectionMock).toHaveBeenCalledWith(
      {
        children,
        title: 'Comments',
        collapsible: true,
        defaultCollapsed: false
      },
      {}
    )
  })

  it('passes defaultCollapsed', () => {
    arrangeTest({ children, defaultCollapsed: true })

    expect(SectionMock).toHaveBeenCalledWith(
      {
        children,
        title: 'Comments',
        collapsible: true,
        defaultCollapsed: true
      },
      {}
    )
  })
})
