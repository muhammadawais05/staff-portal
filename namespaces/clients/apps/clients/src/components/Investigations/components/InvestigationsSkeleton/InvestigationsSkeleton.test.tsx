import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Section } from '@toptal/picasso'

import InvestigationsSkeleton from '.'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  SkeletonLoader: {
    Button: () => <div data-testid='SkeletonButton' />,
    Typography: ({ rows }: { rows: number }) => (
      <div data-testid='SkeletonTypography'>
        <div data-testid='SkeletonTypography-rows'>{rows}</div>
      </div>
    )
  },
  Section: jest.fn()
}))

const SectionMock = Section as unknown as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <InvestigationsSkeleton />
    </TestWrapper>
  )

describe('InvestigationsSkeleton', () => {
  beforeEach(() => {
    SectionMock.mockImplementation(({ children, actions }) => (
      <>
        {children}
        {actions}
      </>
    ))
  })

  it('renders section skeleton with two action buttons and one row', () => {
    renderComponent()

    expect(SectionMock).toHaveBeenCalledTimes(1)
    expect(SectionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Investigations',
        variant: 'withHeaderBar'
      }),
      {}
    )

    expect(screen.getAllByTestId('SkeletonButton')).toHaveLength(2)
    expect(screen.getByTestId('SkeletonTypography-rows').textContent).toBe('1')
  })
})
