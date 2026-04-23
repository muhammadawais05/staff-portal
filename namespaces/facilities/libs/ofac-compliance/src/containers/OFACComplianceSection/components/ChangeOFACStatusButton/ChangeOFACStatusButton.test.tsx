import React, { ReactElement } from 'react'
import { Button } from '@toptal/picasso'
import { render } from '@toptal/picasso/test-utils'
import { useModal } from '@staff-portal/modals-service'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { Operation, OperationType } from '@staff-portal/operations'
import {
  ClientCumulativeStatus,
  ClientOperations,
  OfacStatus,
  OperationCallableTypes,
  TalentOperations
} from '@staff-portal/graphql/staff'

import ChangeOFACStatusModal from '../ChangeOFACStatusModal'
import ChangeOFACStatusButton from '.'

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))

jest.mock('../ChangeOFACStatusModal', () => ({
  __esModule: true,
  default: jest.fn()
}))

const { HIDDEN, DISABLED } = OperationCallableTypes

const buttonMock = Button as unknown as jest.Mock
const useModalMock = useModal as jest.Mock
const operationMock = Operation as jest.Mock
const ChangeOFACStatusModalMock = ChangeOFACStatusModal as jest.Mock
const showModalMock = jest.fn()

const nodeId = encodeEntityId('123', 'Client')

const associatedRoles = [
  {
    id: encodeEntityId('456', 'Client'),
    type: 'Client',
    clientCumulativeStatus: ClientCumulativeStatus.PENDING_TOS
  }
]

const renderComponent = (
  operations: Partial<ClientOperations> | Partial<TalentOperations>,
  ofacStatus = OfacStatus.NORMAL
) => {
  buttonMock.mockImplementationOnce(() => null)
  useModalMock.mockReturnValueOnce({
    showModal: showModalMock
  })

  operationMock.mockImplementationOnce(
    ({
      operation: { callable },
      render: renderChildren
    }: {
      operation: OperationType
      render: (disabled: boolean) => ReactElement
    }) => callable !== HIDDEN && renderChildren(callable === DISABLED)
  )

  render(
    <ChangeOFACStatusButton
      fullName='fullName'
      nodeId={nodeId}
      roleOrClientStatus='roleOrClientStatus'
      ofacStatus={ofacStatus}
      operations={operations}
      associatedRoles={associatedRoles}
    />
  )
}

describe('ChangeOFACStatusButton', () => {
  it('calls useModal with props', () => {
    renderComponent({ updateRoleOfacStatus: createOperationMock() })

    expect(useModalMock).toHaveBeenCalledWith(ChangeOFACStatusModalMock, {
      nodeId,
      associatedRoles,
      currentStatus: 'NORMAL',
      fullName: 'fullName',
      roleOrClientStatus: 'roleOrClientStatus'
    })

    expect(buttonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        onClick: showModalMock
      }),
      {}
    )
  })
})
