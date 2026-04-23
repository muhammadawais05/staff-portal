import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import {
  useGetMinimumCommitmentEdit,
  useSetUpdateClientCommitmentMutation
} from '../../data'
import MinimumCommitmentEditModal from './'

jest.mock('../MinimumCommitmentModalForm')
jest.mock('../../data')

const mockGetClient = useGetMinimumCommitmentEdit as jest.Mock
const mockUpdateClientCommitmentMutation =
  useSetUpdateClientCommitmentMutation as jest.Mock

describe('MinimumCommitmentEditModal', () => {
  it('renders form', () => {
    mockGetClient.mockReturnValue({ data: fixtures.MockClient })
    mockUpdateClientCommitmentMutation.mockReturnValue([jest.fn()])

    const { getByTestId } = renderComponent(
      <MinimumCommitmentEditModal
        options={{ nodeId: fixtures.MockClient.id }}
      />
    )

    expect(getByTestId('MinimumCommitmentModalForm')).toBeInTheDocument()
    expect(getByTestId('MinimumCommitmentModalForm-title')).toHaveTextContent(
      'Edit Minimum Commitment for Casper, Johnson and Larkin'
    )
    expect(
      getByTestId('MinimumCommitmentModalForm-initial-values-minimum-hours')
    ).toHaveTextContent(5)
    expect(
      getByTestId('MinimumCommitmentModalForm-initial-values-comment')
    ).toHaveTextContent('')
  })
})
