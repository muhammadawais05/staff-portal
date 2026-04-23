import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SystemInformationSkeleton from '.'

jest.mock('../SystemInformationSection')

const arrangeTest = () =>
  render(
    <TestWrapper>
      <SystemInformationSkeleton />
    </TestWrapper>
  )

describe('SystemInformationSkeleton', () => {
  it('default render', () => {
    arrangeTest()

    expect(screen.getByTestId('SystemInformationSection')).toBeInTheDocument()
  })
})
