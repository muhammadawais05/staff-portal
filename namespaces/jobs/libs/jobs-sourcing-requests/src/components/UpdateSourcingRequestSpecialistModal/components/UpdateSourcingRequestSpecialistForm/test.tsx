import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { when } from 'jest-when'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { JOB_UPDATED } from '@staff-portal/jobs'

import UpdateSourcingRequestSpecialistForm from './UpdateSourcingRequestSpecialistForm'
import { UpdateSourcingRequestTalentSpecialistDocument } from './data'

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(
      UpdateSourcingRequestTalentSpecialistDocument,
      expect.anything()
    )
    .mockImplementation(() => [
      () => ({
        data: {
          updateSourcingRequestTalentSpecialist: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(
      UpdateSourcingRequestTalentSpecialistDocument,
      expect.anything()
    )
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) => {
  render(
    <TestWrapper>
      <UpdateSourcingRequestSpecialistForm
        jobId='123'
        sourcingRequestId='567'
        talentSpecialistId='123'
        talentSpecialistFullName='Specialist Name'
        sourcers={[
          { id: '567', fullName: 'Test Name' },
          { id: '123', fullName: 'Other one' }
        ]}
        hideModal={hideModal}
      />
    </TestWrapper>
  )
}

describe('UpdateSourcingRequestSpecialistForm', () => {
  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      arrangeTest({ hideModal })

      fireEvent.click(screen.getByTestId('FormCancelButton'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when sourcing request specialist was successfully changed', () => {
    it('shows success notification message', async () => {
      const COMMENT = 'Some comment'
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockSuccessImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      fireEvent.change(screen.getByLabelText(/Talent Specialist/), {
        target: { value: 'Test Name' }
      })

      fireEvent.click(screen.getByTestId('sourcing-request-specialist-submit'))

      expect(
        await screen.findByText(
          'The Talent Specialist was successfully updated.'
        )
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(JOB_UPDATED, {
        jobId: '123'
      })
    })
  })

  describe('when sourcing request specialist was changed with errors', () => {
    it('shows success notification message', async () => {
      const COMMENT = 'Some comment'

      mockErrorImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      fireEvent.change(screen.getByLabelText(/Talent Specialist/), {
        target: { value: 'Test Name' }
      })

      fireEvent.click(screen.getByTestId('sourcing-request-specialist-submit'))

      expect(
        await screen.findByText(
          'An error occurred, the Sourcing Request Talent Specialist was not updated.'
        )
      ).toBeInTheDocument()
    })
  })
})
