import React from 'react'
import { render } from '@testing-library/react'
import { Section } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import SystemInformationSection from '.'

jest.mock('@toptal/picasso', () => ({
  Section: jest.fn()
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <SystemInformationSection>content</SystemInformationSection>
    </TestWrapper>
  )

const SectionMock = Section as unknown as jest.Mock

describe('SystemInformationSection', () => {
  it('default render', () => {
    SectionMock.mockImplementationOnce(() => null)

    arrangeTest()

    expect(Section).toHaveBeenCalledWith(
      {
        children: 'content',
        title: 'System information',
        variant: 'withHeaderBar'
      },
      {}
    )
  })
})
