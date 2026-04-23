import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Section } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import QuizSection from '.'

jest.mock('@toptal/picasso', () => ({
  Section: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof QuizSection>) =>
  render(
    <TestWrapper>
      <QuizSection {...props} />
    </TestWrapper>
  )

const SectionMock = Section as unknown as jest.Mock
const children = <div>children</div>

describe('QuizSection', () => {
  it('renders section', () => {
    SectionMock.mockImplementationOnce(() => null)

    arrangeTest({ children })

    expect(SectionMock).toHaveBeenCalledWith(
      { children, title: 'Q&A', collapsible: true, defaultCollapsed: false },
      {}
    )
  })

  it('passes defaultCollapsed', () => {
    SectionMock.mockImplementationOnce(() => null)

    arrangeTest({ children, defaultCollapsed: true })

    expect(SectionMock).toHaveBeenCalledWith(
      { children, title: 'Q&A', collapsible: true, defaultCollapsed: true },
      {}
    )
  })
})
