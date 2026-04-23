import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { noop, TestWrapperWithMocks } from '@staff-portal/test-utils'
import { OfacStatus } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'

import ChangeOFACStatusModal, { Props } from './ChangeOFACStatusModal'
import ChangeOFACStatusModalContent from '../ChangeOFACStatusModalContent'

const mockedHandleSubmit = jest.fn(() => null)
const ChangeOFACStatusModalContentMock =
  ChangeOFACStatusModalContent as jest.Mock

jest.mock('@staff-portal/mutation-result-handlers/src/hooks', () => ({
  useModalFormChangeHandler: () => ({
    handleSubmit: mockedHandleSubmit,
    loading: false
  })
}))

jest.mock('../ChangeOFACStatusModalContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const arrangeTest = (
  {
    nodeId,
    fullName,
    currentStatus,
    hideModal,
    roleOrClientStatus,
    associatedRoles
  }: Props,
  mocks: MockedResponse[] = []
) => {
  ChangeOFACStatusModalContentMock.mockImplementation(() => null)

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ChangeOFACStatusModal
        nodeId={nodeId}
        fullName={fullName}
        currentStatus={currentStatus}
        hideModal={hideModal}
        associatedRoles={associatedRoles}
        roleOrClientStatus={roleOrClientStatus}
      />
    </TestWrapperWithMocks>
  )
}

describe('ChangeOFACStatusModal', () => {
  it('default render', () => {
    arrangeTest(
      {
        nodeId: encodeEntityId('100', 'Test'),
        fullName: 'John Doe s3o',
        currentStatus: OfacStatus.INVESTIGATION,
        roleOrClientStatus: 'Test',
        hideModal: noop,
        associatedRoles: null
      },
      []
    )

    expect(ChangeOFACStatusModalContentMock).toHaveBeenCalledTimes(1)
    expect(ChangeOFACStatusModalContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        associatedRoles: null,
        currentStatus: 'INVESTIGATION',
        fullName: 'John Doe s3o',
        handleSubmit: mockedHandleSubmit,
        hideModal: noop,
        initialValues: {
          roleId: 'VjEtVGVzdC0xMDA'
        },
        nodeType: 'Test',
        roleOrClientStatus: 'Test',
        submitting: false
      }),
      {}
    )
  })
})
