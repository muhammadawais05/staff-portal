/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { JobWorkType } from '@staff-portal/graphql/staff'

import { TIME_LENGTH_ONSITE_FIELD } from '../../../../config'
import TimeLengthOnsiteSelect from './TimeLengthOnsiteSelect'

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
      <TimeLengthOnsiteSelect />
    </TestWrapper>
  )

describe('TimeLengthOnsiteSelect', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      input: { value: JobWorkType.MIXED }
    })
  })

  it('renders the field', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${TIME_LENGTH_ONSITE_FIELD}`)
    ).toBeInTheDocument()
  })

  describe('when the workType is not MIXED', () => {
    it('hides the field', () => {
      mockUseField.mockReturnValue({
        input: { value: JobWorkType.REMOTE }
      })

      arrangeTest()

      expect(
        screen.queryByTestId(`field-${TIME_LENGTH_ONSITE_FIELD}`)
      ).not.toBeInTheDocument()
    })
  })
})
