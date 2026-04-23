import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  parseAndFormatDate,
  getDateDistanceFromNow
} from '@staff-portal/date-time-utils'

import UnavailableTalentTooltipContent from './UnavailableTalentTooltipContent'

jest.mock('@staff-portal/date-time-utils/src/parse-and-format-date')
jest.mock('@staff-portal/date-time-utils/src/get-date-distance-from-now')
const parseAndFormatDateMock = parseAndFormatDate as jest.Mock
const getDateDistanceFromNowMock = getDateDistanceFromNow as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof UnavailableTalentTooltipContent>
) =>
  render(
    <TestWrapper>
      <UnavailableTalentTooltipContent {...props} />
    </TestWrapper>
  )

describe('UnavailableTalentTooltipContent', () => {
  beforeEach(() => {
    getDateDistanceFromNowMock.mockReturnValueOnce('1 month')
    parseAndFormatDateMock.mockReturnValueOnce('Feb 10, 2022')
  })

  it('renders title, reason, comment, expected return date, future commitment, and update date', () => {
    const allocatedHoursConfirmedAt = '2022-01-01'

    const { container } = arrangeTest({
      unavailableAllocatedHoursChangeRequest: {
        id: '1',
        futureCommitment: 40,
        rejectReason: 'not_working',
        returnInDate: '2022-02-10',
        comment: 'I need some vacations'
      },
      allocatedHoursConfirmedAt
    })

    expect(container).toHaveTextContent('Talent is unavailable')
    expect(container).toHaveTextContent('Reason: Not working right now')
    expect(container).toHaveTextContent('Comment: I need some vacations')
    expect(container).toHaveTextContent(
      'Expected date to come back to Toptal: Feb 10, 2022'
    )
    expect(container).toHaveTextContent('Future Commitment: Full-time')
    expect(container).toHaveTextContent('Availability updated 1 month ago')
  })
})
