import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { CallRequestType } from '../../enums'
import OutsideWorkingHoursText from './OutsideWorkingHoursText'

const arrangeTest = ({
  inWorkingHours,
  type
}: {
  inWorkingHours: boolean
  type: CallRequestType
}) =>
  render(
    <TestWrapper>
      <OutsideWorkingHoursText type={type} inWorkingHours={inWorkingHours} />
    </TestWrapper>
  )

describe('OutsideWorkingHoursText', () => {
  describe('when scheduled outside of working hours', () => {
    it('renders text', () => {
      arrangeTest({ inWorkingHours: false, type: CallRequestType.SCHEDULED })

      expect(
        screen.getByText(
          'The requested start time is outside your working hours.'
        )
      ).toBeInTheDocument()
    })
  })

  describe('when scheduled in working hours', () => {
    it('does not render text', () => {
      arrangeTest({ inWorkingHours: true, type: CallRequestType.SCHEDULED })

      expect(
        screen.queryByText(
          'The requested start time is outside your working hours.'
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when not scheduled', () => {
    it('does not render text', () => {
      arrangeTest({ inWorkingHours: true, type: CallRequestType.INSTANT })

      expect(
        screen.queryByText(
          'The requested start time is outside your working hours.'
        )
      ).not.toBeInTheDocument()
    })
  })
})
