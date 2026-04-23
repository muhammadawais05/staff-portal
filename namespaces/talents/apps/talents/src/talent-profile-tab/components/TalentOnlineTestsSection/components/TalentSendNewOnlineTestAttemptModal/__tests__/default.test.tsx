import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NodeType } from '@staff-portal/graphql'

import TalentSendNewOnlineTestAttemptModal, {
  Props as ModalProps
} from '../TalentSendNewOnlineTestAttemptModal'

jest.mock('../TalentSendNewOnlineTestAttemptModal')

const ONLINE_TEST_ATTEMPT_ID = '123'
const TALENT_ID = '456'

const modalProps: ModalProps = {
  hideModal: jest.fn(),
  nodeType: NodeType.CODILITY_RESULT,
  onlineTestAttemptId: ONLINE_TEST_ATTEMPT_ID,
  talentId: TALENT_ID
}

const TalentSendNewOnlineTestAttemptModalMock =
  TalentSendNewOnlineTestAttemptModal as jest.Mock

const arrangeTest = (props: ModalProps) => {
  TalentSendNewOnlineTestAttemptModalMock.mockReturnValue(null)

  render(
    <TestWrapper>
      <TalentSendNewOnlineTestAttemptModal {...props} />
    </TestWrapper>
  )
}

describe('TalentSendNewOnlineTestAttemptModal', () => {
  it('renders TalentSendNewOnlineTestAttemptModal with expected props', async () => {
    arrangeTest(modalProps)

    expect(TalentSendNewOnlineTestAttemptModalMock).toHaveBeenCalledTimes(1)
    expect(TalentSendNewOnlineTestAttemptModalMock).toHaveBeenCalledWith(
      modalProps,
      {}
    )
  })
})
