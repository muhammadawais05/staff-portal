import React from 'react'
import { screen, render, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import useCloneJobForRehireMutation from './hooks/use-clone-job-for-rehire-mutation'
import CloneJobForRehireModal from './CloneJobForRehireModal'

jest.mock('./hooks/use-clone-job-for-rehire-mutation')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  FormDatePickerWrapper: () => null
}))

const useCloneJobForRehireMutationMock =
  useCloneJobForRehireMutation as jest.Mock

const JOB_ID = 'test-job-id'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <CloneJobForRehireModal
        jobId={JOB_ID}
        hideModal={() => {}}
        isTopModal={true}
      />
    </TestWrapper>
  )
}
const handleSubmitMock = jest.fn()

describe('CloneJobForRehireModal', () => {
  beforeEach(() => {
    useCloneJobForRehireMutationMock.mockReturnValue({
      handleSubmit: handleSubmitMock,
      loadingImplementation: false
    })
  })
  it('renders the modal', () => {
    arrangeTest()

    expect(
      screen.getByTestId('CloneJobForRehireModal-modal')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('CloneJobForRehireModal-select-commitment')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('CloneJobForRehireModal-submit-button')
    ).toBeInTheDocument()
  })

  it('submits form', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Commitment'))

    fireEvent.click(screen.getByText('Hourly'))

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Rehire/i }))
    })

    expect(handleSubmitMock).toHaveBeenCalled()
  })
})
