/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { EXPECTED_WEEKLY_HOURS_FIELD } from '../../../../config'
import ExpectedWeeklyHoursInput from './ExpectedWeeklyHoursInput'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    NumberInput: ({ name }: any) => <input data-testid={`field-${name}`} />
  },
  useField: jest.fn()
}))
const mockUseField = useField as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ExpectedWeeklyHoursInput />
    </TestWrapper>
  )

describe('ExpectedWeeklyHoursInput', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      input: { value: EngagementCommitmentEnum.HOURLY }
    })
  })

  it('renders the field', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${EXPECTED_WEEKLY_HOURS_FIELD}`)
    ).toBeInTheDocument()
  })

  describe('when the commitment is not HOURLY', () => {
    it('hides the field', () => {
      mockUseField.mockReturnValue({
        input: { value: EngagementCommitmentEnum.FULL_TIME }
      })

      arrangeTest()

      expect(
        screen.queryByTestId(`field-${EXPECTED_WEEKLY_HOURS_FIELD}`)
      ).not.toBeInTheDocument()
    })
  })
})
