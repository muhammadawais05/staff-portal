import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { useMutation, useGetData } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import PendingTalentReasonModal from './PendingTalentReasonModal'

const JOB_ID = 'job-123'
const REASON = 'Sourcing'
const NOTES = 'Test note'

jest.mock('@staff-portal/data-layer-service')

const mockUseMutation = useMutation as jest.Mock
const mockUseGetData = useGetData as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <PendingTalentReasonModal jobId={JOB_ID} hideModal={() => {}} />
    </TestWrapper>
  )

describe('PendingTalentReasonModal', () => {
  it('Submit reason update', async () => {
    const mutation = jest.fn()

    mockUseGetData.mockReturnValue(() => ({
      data: []
    }))
    mockUseMutation.mockReturnValue([mutation, { loading: false }])

    const { getByLabelText, getByTestId } = arrangeTest()

    fireEvent.change(getByLabelText('Reason'), {
      target: { value: REASON }
    })

    fireEvent.change(getByLabelText(/Notes/i), {
      target: { value: NOTES }
    })

    fireEvent.click(getByTestId('PendingTalentReasonModal-submit-button'))

    await waitFor(() =>
      expect(mutation).toHaveBeenCalledWith({
        variables: {
          input: {
            jobId: JOB_ID,
            reasonNotes: NOTES,
            reason: REASON
          }
        }
      })
    )
  })
})
