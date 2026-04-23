/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { COMMITMENT_MINIMUM_HOURS_FIELD } from '../../../../config'
import { useGetCommitmentSettingsApplicable } from './data'
import MinimumCommitmentFields from './MinimumCommitmentFields'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Select: ({ name }: any) => <input data-testid={`field-${name}`} />,
    Input: () => <input />
  },
  useField: jest.fn()
}))
jest.mock('./data', () => ({
  __esModule: true,
  useGetCommitmentHoursOptions: () => ({
    commitmentHoursOptions: [],
    loading: false
  }),
  useGetCommitmentSettingsApplicable: jest.fn()
}))

const useGetCommitmentSettingsApplicableMock =
  useGetCommitmentSettingsApplicable as jest.Mock
const mockUseField = useField as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <MinimumCommitmentFields />
    </TestWrapper>
  )

describe('MinimumCommitmentFields', () => {
  beforeEach(() => {
    useGetCommitmentSettingsApplicableMock.mockReturnValue({
      commitmentSettingsApplicable: true
    })
    mockUseField.mockReturnValue({
      input: { value: EngagementCommitmentEnum.HOURLY }
    })
  })

  it('renders the field', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${COMMITMENT_MINIMUM_HOURS_FIELD}`)
    ).toBeInTheDocument()
  })

  describe('when the commitmentSettingsApplicable is false', () => {
    it('hides the field', () => {
      useGetCommitmentSettingsApplicableMock.mockReturnValue({
        commitmentSettingsApplicable: false
      })

      arrangeTest()

      expect(
        screen.queryByTestId(`field-${COMMITMENT_MINIMUM_HOURS_FIELD}`)
      ).not.toBeInTheDocument()
    })
  })
})
