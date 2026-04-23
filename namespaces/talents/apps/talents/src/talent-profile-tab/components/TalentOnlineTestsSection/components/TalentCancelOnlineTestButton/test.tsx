import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { NodeType } from '@staff-portal/graphql'
import { useModal } from '@staff-portal/modals-service'

import TalentCancelOnlineTestModal from '../TalentCancelOnlineTestModal/TalentCancelOnlineTestModal'
import TalentCancelOnlineTestButton, {
  Props as ButtonProps
} from './TalentCancelOnlineTestButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()

const TALENT_ID = 'talent-id'
const TEST_ID = 'test-id'
const TEST_NAME = 'test-name'
const TEST_TYPE = NodeType.CODILITY_RESULT

const modalProps = {
  talentId: TALENT_ID,
  testId: TEST_ID,
  testName: TEST_NAME,
  testType: TEST_TYPE
}

const buttonProps = {
  talentId: TALENT_ID,
  testId: TEST_ID,
  testName: TEST_NAME,
  nodeType: TEST_TYPE,
  operation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
} as ButtonProps

const arrangeTest = (props: ButtonProps) => {
  useModalMock.mockReturnValue({ showModal })
  render(
    <TestWrapper>
      <TalentCancelOnlineTestButton {...props} />
    </TestWrapper>
  )
}

describe('TalentCancelOnlineTestButton', () => {
  it('opens the Talent Cancel Online Test modal', async () => {
    arrangeTest(buttonProps)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(
      TalentCancelOnlineTestModal,
      modalProps
    )
  })
})
