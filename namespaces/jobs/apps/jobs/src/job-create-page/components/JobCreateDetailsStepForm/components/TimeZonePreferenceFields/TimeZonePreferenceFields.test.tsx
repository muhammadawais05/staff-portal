/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  WORKING_TIME_FROM_FIELD,
  WORKING_TIME_TO_FIELD,
  HOURS_OVERLAP_FIELD
} from '../../../../config'
import TimeZonePreferenceFields from './TimeZonePreferenceFields'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Select: ({ name }: any) => <input data-testid={`field-${name}`} />
  },
  useField: jest.fn()
}))
const mockUseField = useField as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TimeZonePreferenceFields />
    </TestWrapper>
  )

describe('TimeZonePreferenceFields', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      input: { value: 'YES' }
    })
  })

  it('renders the fields', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${WORKING_TIME_FROM_FIELD}`)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(`field-${WORKING_TIME_TO_FIELD}`)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(`field-${HOURS_OVERLAP_FIELD}`)
    ).toBeInTheDocument()
  })

  describe('when there is no timezonePreference', () => {
    it('hides the fields', () => {
      mockUseField.mockReturnValue({
        input: { value: 'NO' }
      })

      arrangeTest()

      expect(
        screen.queryByTestId(`field-${WORKING_TIME_FROM_FIELD}`)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId(`field-${WORKING_TIME_TO_FIELD}`)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId(`field-${HOURS_OVERLAP_FIELD}`)
      ).not.toBeInTheDocument()
    })
  })
})
