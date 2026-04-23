import React from 'react'
import { render, screen } from '@testing-library/react'
import { JobHoursOverlap } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import JobTimeZoneField, { Props } from './JobTimeZoneField'

const defaults: Props = {
  usePreferredHoursCheck: false,
  hoursOverlap: JobHoursOverlap.HOUR_4,
  timeZonePreference: {
    name: '(UTC+02:00) Europe - Prague',
    value: 'Europe - Prague'
  }
}

const arrangeTest = (props: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <JobTimeZoneField {...({ ...defaults, ...props } as Props)} />
    </TestWrapper>
  )

describe('JobTimeZoneField', () => {
  it('renders timezone information', () => {
    arrangeTest()

    const tzinfo = screen.getByTestId('timezone-info')

    expect(tzinfo).toBeInTheDocument()
    expect(tzinfo).toHaveTextContent('Europe - Prague, min 4 hours overlap')
  })

  it('renders timezone information with 1 hour overlap', () => {
    arrangeTest({ hoursOverlap: JobHoursOverlap.HOUR_1 })

    const tzinfo = screen.getByTestId('timezone-info')

    expect(tzinfo).toBeInTheDocument()
    expect(tzinfo).toHaveTextContent('Europe - Prague, min 1 hour overlap')
  })

  describe('without hoursOverlap', () => {
    it('does not display the overlap text', () => {
      arrangeTest({ hoursOverlap: null })

      const tzinfo = screen.getByTestId('timezone-info')

      expect(tzinfo).toHaveTextContent('Europe - Prague')
      expect(tzinfo).not.toHaveTextContent('hours overlap')
    })
  })

  describe('without hours overlap and timezone', () => {
    it('displays "No preference"', () => {
      arrangeTest({ hoursOverlap: null, timeZonePreference: null })

      const tzinfo = screen.getByTestId('timezone-info')

      expect(tzinfo).toHaveTextContent('No preference')
    })
  })

  describe('when "hasPreferredHours" is not truthy', () => {
    describe('and `usePreferredHoursCheck` is set', () => {
      it('displays "No preference" text', () => {
        arrangeTest({ hasPreferredHours: false, usePreferredHoursCheck: true })

        const tzinfo = screen.getByTestId('timezone-info')

        expect(tzinfo).toHaveTextContent('No preference')
      })
    })
    describe('and `usePreferredHoursCheck` is not set', () => {
      it('displays timezone information', () => {
        arrangeTest({ hasPreferredHours: false })

        const tzinfo = screen.getByTestId('timezone-info')

        expect(tzinfo).toHaveTextContent('Europe - Prague')
      })
    })
  })
})
