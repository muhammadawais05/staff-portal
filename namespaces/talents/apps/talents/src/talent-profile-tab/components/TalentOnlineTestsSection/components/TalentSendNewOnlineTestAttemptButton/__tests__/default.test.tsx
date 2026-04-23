/* eslint-disable import/order */
import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { NodeType } from '@staff-portal/graphql'
import { useNewOnlineTestAttemptModal } from '../../TalentSendNewOnlineTestAttemptModal/hooks'

import TalentSendNewOnlineTestAttemptButton, {
  Props as ButtonProps
} from '../TalentSendNewOnlineTestAttemptButton'

jest.mock('../../TalentSendNewOnlineTestAttemptModal/hooks', () => ({
  useNewOnlineTestAttemptModal: jest.fn()
}))

const ONLINE_TEST_ATTEMPT_ID = '123'
const TALENT_ID = '456'

const buttonProps = {
  onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID,
  talentId: TALENT_ID,
  operation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  },
  nodeType: NodeType.CODILITY_RESULT
} as ButtonProps

const useNewOnlineTestAttemptModalMock =
  useNewOnlineTestAttemptModal as unknown as jest.Mock
const showModal = jest.fn()

const arrangeTest = (props: ButtonProps) => {
  useNewOnlineTestAttemptModalMock.mockReturnValue({ showModal })

  render(
    <TestWrapper>
      <TalentSendNewOnlineTestAttemptButton {...props} />
    </TestWrapper>
  )
}

describe('TalentSendNewOnlineTestAttemptButton', () => {
  it('calls modal hook with correct props', async () => {
    arrangeTest(buttonProps)

    expect(useNewOnlineTestAttemptModalMock).toHaveBeenCalledTimes(1)
    expect(useNewOnlineTestAttemptModalMock).toHaveBeenCalledWith({
      talentId: buttonProps.talentId,
      nodeType: buttonProps.nodeType,
      onlineTestAttemptId: buttonProps.onlineTestAttemptId
    })
  })
})
