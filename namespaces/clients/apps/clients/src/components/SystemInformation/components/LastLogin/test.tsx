import React, { ComponentProps, ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'
import { TypographyOverflow } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import LastLogin from '.'
import LastLoginTooltip from '../LastLoginTooltip'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: ({
    content,
    children
  }: {
    content: ReactNode
    children: ReactNode
  }) => (
    <div data-testid='Tooltip'>
      <div data-testid='Tooltip-content'>{content}</div>
      <div data-testid='Tooltip-children'>{children}</div>
    </div>
  ),
  QuestionMark16: () => <span data-testid='svg-question-mark-icon-16' />,
  TypographyOverflow: jest.fn()
}))

jest.mock('../LastLoginTooltip')
jest.mock('@staff-portal/current-user')

const TypographyOverflowMock = TypographyOverflow as unknown as jest.Mock
const LastLoginTooltipMock = LastLoginTooltip as jest.Mock

const lastLoginDetailsData = systemInformationDataMock.representatives.nodes[0]

const arrangeTest = ({
  lastLoginDetails = lastLoginDetailsData,
  timeZone = 'Europe/London'
}: Partial<ComponentProps<typeof LastLogin>>) =>
  render(
    <TestWrapper>
      <LastLogin {...{ lastLoginDetails, timeZone }} />
    </TestWrapper>
  )

describe('LastLogin', () => {
  beforeEach(() => {
    TypographyOverflowMock.mockImplementation(jest.fn(() => null))
    LastLoginTooltipMock.mockImplementation(() => (
      <span data-testid='LastLoginTooltip' />
    ))
  })

  it('renders last login date', () => {
    arrangeTest({})

    expect(TypographyOverflowMock).toHaveBeenCalledWith(
      {
        children: 'Apr 23, 2021 at 11:04 PM',
        size: 'medium'
      },
      {}
    )
  })

  it('renders tooltip with icon as its content', () => {
    arrangeTest({})

    expect(LastLoginTooltipMock).toHaveBeenCalledTimes(1)
    expect(LastLoginTooltipMock).toHaveBeenCalledWith(
      { lastLoginDetails: lastLoginDetailsData },
      {}
    )
    expect(
      within(screen.getByTestId('Tooltip-content')).getByTestId(
        'LastLoginTooltip'
      )
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('Tooltip-children')).getByTestId(
        'svg-question-mark-icon-16'
      )
    ).toBeInTheDocument()
  })
})
