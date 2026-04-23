import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import RequestAvailabilityModal from './RequestAvailabilityModal'

jest.mock('./data', () => ({
  __esModule: true,
  useCreateTalentAvailabilityRequest: () => [() => {}, { loading: false }]
}))

jest.mock('../RequestAvailabilityForm', () => () => <div data-testid='form' />)

const arrangeTest = () =>
  render(
    <TestWrapper>
      <RequestAvailabilityModal talentId='id' hideModal={() => {}} />
    </TestWrapper>
  )

describe('RequestAvailabilityModal', () => {
  it('displays required copies and form', async () => {
    const { findByText, getByText, getByTestId } = arrangeTest()

    expect(await findByText('Talent Availability Request')).toBeInTheDocument()
    expect(getByTestId('form')).toBeInTheDocument()
    expect(
      getByText(
        'Select the company and specific job you would like to request talent availability for.'
      )
    ).toBeInTheDocument()
  })
})
