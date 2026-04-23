import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NodeType } from '@staff-portal/graphql'
import { useModal } from '@staff-portal/modals-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import TalentTrackOnlineTestAttemptModal from '../../TalentTrackOnlineTestAttemptModal/TalentTrackOnlineTestAttemptModal'
import TalentTrackOnlineTestAttemptButton, {
  Props as ButtonProps
} from '../TalentTrackOnlineTestAttemptButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()
const ONLINE_TEST_ATTEMPT_ID = '123'
const TALENT_ID = '456'

const buttonProps = {
  onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID,
  talentId: TALENT_ID,
  nodeType: NodeType.CODILITY_RESULT,
  operation: createOperationMock()
} as ButtonProps

const modalProps = {
  talentId: TALENT_ID,
  onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID,
  nodeType: NodeType.CODILITY_RESULT
}

const arrangeTest = (props: ButtonProps) => {
  useModalMock.mockReturnValue({ showModal })

  render(
    <TestWrapper>
      <TalentTrackOnlineTestAttemptButton {...props} />
    </TestWrapper>
  )
}

describe('TalentTrackOnlineTestAttemptButton', () => {
  it('opens the modal', () => {
    arrangeTest(buttonProps)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(
      TalentTrackOnlineTestAttemptModal,
      modalProps
    )
  })
})
