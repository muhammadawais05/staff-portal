import React, { ComponentProps } from 'react'
import { fireEvent, render, screen, act } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import PresalesEngagementModal from './PresalesEngagementModal'

const mockUpdateJobPresalesEngagement = jest.fn()

jest.mock('./data/update-job-presales-engagement', () => ({
  __esModule: true,
  useUpdateJobPresalesEngagement: () => {
    return [mockUpdateJobPresalesEngagement, { loading: false }]
  }
}))

const arrangeTest = () => {
  window.Element.prototype.scrollIntoView = jest.fn()

  const defaultProps: ComponentProps<typeof PresalesEngagementModal> = {
    jobId: '1',
    hideModal: () => {}
  }

  return render(
    <TestWrapper>
      <PresalesEngagementModal {...defaultProps} />
    </TestWrapper>
  )
}

describe('PresalesEngagementModal', () => {
  it('submits the form', async () => {
    const COMMENTS = 'Some comment'

    arrangeTest()

    await act(async () => {
      fireEvent.click(
        screen.getByRole('radio', {
          name: /yes/i
        })
      )

      const commentField = await screen.findByLabelText(/Comment/i)

      fireEvent.change(commentField, {
        target: { value: COMMENTS }
      })

      fireEvent.click(screen.getByText('Save'))
    })

    expect(mockUpdateJobPresalesEngagement).toHaveBeenCalledWith({
      variables: {
        input: {
          jobId: '1',
          presalesEngagement: true,
          presalesEngagementComment: COMMENTS
        }
      }
    })
  })

  it('hides the comment field when presales engagement is false', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.click(
        screen.getByRole('radio', {
          name: /no/i
        })
      )

      fireEvent.click(screen.getByText('Save'))
    })

    expect(mockUpdateJobPresalesEngagement).toHaveBeenCalledWith({
      variables: {
        input: {
          jobId: '1',
          presalesEngagement: false
        }
      }
    })
  })
})
