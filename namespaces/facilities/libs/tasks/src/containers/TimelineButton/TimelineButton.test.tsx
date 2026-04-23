import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'

import TimelineButton from './TimelineButton'
import TimelineModal from './components/TimelineModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const arrangeTest = (nodeId: string) =>
  render(
    <TestWrapper>
      <TimelineButton nodeId={nodeId} />
    </TestWrapper>
  )

describe('TimelineButton', () => {
  it('opens the timeline modal', () => {
    const showModal = jest.fn()
    const useModalMock = useModal as jest.Mock

    useModalMock.mockReturnValue({ showModal })

    const nodeId = '2'

    arrangeTest(nodeId)

    expect(useModalMock).toHaveBeenCalledWith(
      TimelineModal,
      expect.objectContaining({
        nodeId
      })
    )

    expect(showModal).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalled()
  })
})
