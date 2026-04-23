import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Tooltip } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

import UpdatedAtIndicator from './UpdatedAtIndicator'

jest.mock('@toptal/picasso/Tooltip')
jest.mock('@staff-portal/date-time-utils/src/get-date-distance-from-now')
const TooltipMock = Tooltip as unknown as jest.Mock
const getDateDistanceFromNowMock = getDateDistanceFromNow as jest.Mock

const arrangeTest = (props: ComponentProps<typeof UpdatedAtIndicator>) =>
  render(
    <TestWrapper>
      <UpdatedAtIndicator {...props} />
    </TestWrapper>
  )

describe('UpdatedAtIndicator', () => {
  beforeEach(() => {
    TooltipMock.mockImplementation(({ children }) => (
      <div data-testid='tooltip'>{children}</div>
    ))
    getDateDistanceFromNowMock.mockReturnValueOnce('1 month')
  })

  it('renders tooltip with update date and info icon', () => {
    arrangeTest({
      allocatedHoursConfirmedAt: '2022-01-01'
    })

    expect(screen.getByTestId('info-icon')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Updated 1 month ago'
      }),
      {}
    )
  })
})
