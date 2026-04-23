import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { NodeType } from '@staff-portal/graphql'

import TalentCancelOnlineTestModal, {
  Props as ModalProps
} from './TalentCancelOnlineTestModal'
import {
  createCancelOnlineTestAttemptFailedMock,
  createCancelOnlineTestAttemptMock
} from './hooks/cancel-online-test-attempt/mocks'
import { createGetTalentOnlineTestsMock } from '../../data/get-talent-online-results/mocks'

const arrangeTest = ({
  mocks = [],
  modalProps
}: {
  mocks?: MockedResponse[]
  modalProps: ModalProps
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentCancelOnlineTestModal {...modalProps} />
    </TestWrapperWithMocks>
  )

describe('TalentCancelOnlineTestModal', () => {
  it('shows correct text in modal', async () => {
    const TALENT_ID = 'talent-id-184'
    const TEST_NAME = 'Test Name ad4'
    const TEST_ID = 'test-id-163'

    const hideModal = jest.fn()

    arrangeTest({
      modalProps: {
        hideModal,
        talentId: TALENT_ID,
        testName: TEST_NAME,
        testType: NodeType.CODILITY_RESULT,
        testId: TEST_ID
      }
    })

    const modalTextContent = screen.getByTestId('modal-text-content')

    expect(modalTextContent.textContent).toBe(
      'Are you sure you want to cancel this Test Name ad4 test? Doing so will automatically cancel the test on Codility as well.'
    )
  })

  describe('when cancellation request is successful', () => {
    it('shows the notification and closes the modal', async () => {
      const TALENT_ID = 'talent-id-190'
      const TEST_ID = 'test-id-154'
      const COMMENT = 'Test Comment ap2'

      const hideModal = jest.fn()

      arrangeTest({
        mocks: [
          createCancelOnlineTestAttemptMock({
            comment: COMMENT,
            onlineTestAttemptId: TEST_ID
          }),
          createGetTalentOnlineTestsMock({
            talentId: TALENT_ID,
            onlineTests: []
          })
        ],
        modalProps: {
          hideModal,
          talentId: TALENT_ID,
          testName: 'Test Name pa2',
          testType: NodeType.CODILITY_RESULT,
          testId: TEST_ID
        }
      })

      fireEvent.change(
        (await screen.findByTestId('comment-field')).getElementsByTagName(
          'TEXTAREA'
        )[0],
        {
          target: { value: COMMENT }
        }
      )
      fireEvent.click(screen.getByTestId('cancel-online-test-button'))
      expect(
        await screen.findByText('Online test was canceled.')
      ).toBeInTheDocument()
      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when cancellation request fails', () => {
    it('shows the error notification', async () => {
      const TEST_ID = 'test-id-283'
      const TALENT_ID = 'talent-id-921'
      const COMMENT = 'Test Comment ai2'
      const ERROR_MESSAGE = 'Request Failed cl1.'

      const hideModal = jest.fn()

      arrangeTest({
        mocks: [
          createCancelOnlineTestAttemptFailedMock(
            {
              comment: COMMENT,
              onlineTestAttemptId: TEST_ID
            },
            ERROR_MESSAGE
          ),
          createGetTalentOnlineTestsMock({
            talentId: TALENT_ID,
            onlineTests: []
          })
        ],
        modalProps: {
          hideModal,
          talentId: TALENT_ID,
          testName: 'Test Name sk3',
          testType: NodeType.CODILITY_RESULT,
          testId: TEST_ID
        }
      })

      fireEvent.change(
        (await screen.findByTestId('comment-field')).getElementsByTagName(
          'TEXTAREA'
        )[0],
        {
          target: { value: COMMENT }
        }
      )
      fireEvent.click(screen.getByTestId('cancel-online-test-button'))
      expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
      expect(hideModal).not.toHaveBeenCalled()
    })
  })
})
