import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Tooltip } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

import UnavailableTalentTooltipContent from '../../../UnavailableTalentTooltipContent'
import UnavailableTalentIndicator from './UnavailableTalentIndicator'

jest.mock('@toptal/picasso/Tooltip')
jest.mock('@staff-portal/date-time-utils/src/get-date-distance-from-now')
const TooltipMock = Tooltip as unknown as jest.Mock
const getDateDistanceFromNowMock = getDateDistanceFromNow as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof UnavailableTalentIndicator>
) =>
  render(
    <TestWrapper>
      <UnavailableTalentIndicator {...props} />
    </TestWrapper>
  )

describe('UnavailableTalentIndicator', () => {
  beforeEach(() => {
    TooltipMock.mockImplementation(({ children }) => (
      <div data-testid='tooltip'>{children}</div>
    ))
    getDateDistanceFromNowMock.mockReturnValueOnce('1 month')
  })

  describe('when there is future availability', () => {
    it('renders tooltip, question icon, and tag with future availability', () => {
      const unavailableAllocatedHoursChangeRequest: ComponentProps<
        typeof UnavailableTalentIndicator
      >['unavailableAllocatedHoursChangeRequest'] = {
        id: '1',
        futureCommitment: 40,
        rejectReason: 'not_working',
        returnInDate: '2022-02-10'
      }
      const allocatedHoursConfirmedAt = '2022-01-01'

      arrangeTest({
        unavailableAllocatedHoursChangeRequest,
        allocatedHoursConfirmedAt
      })

      expect(screen.getByTestId('question-icon')).toBeInTheDocument()
      expect(screen.getByText('Available 40/40 in 1 month')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            type: UnavailableTalentTooltipContent,
            props: {
              unavailableAllocatedHoursChangeRequest,
              allocatedHoursConfirmedAt
            }
          })
        }),
        {}
      )
    })
  })

  describe('when there is no future availability', () => {
    it('renders tooltip and question icon', () => {
      const unavailableAllocatedHoursChangeRequest = {
        id: '1',
        rejectReason: 'not_working'
      }
      const allocatedHoursConfirmedAt = '2022-01-01'

      arrangeTest({
        unavailableAllocatedHoursChangeRequest,
        allocatedHoursConfirmedAt
      })

      expect(screen.getByTestId('question-icon')).toBeInTheDocument()
      expect(
        screen.queryByTestId('future-availability-tag')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            type: UnavailableTalentTooltipContent,
            props: {
              unavailableAllocatedHoursChangeRequest,
              allocatedHoursConfirmedAt
            }
          })
        }),
        {}
      )
    })
  })
})
