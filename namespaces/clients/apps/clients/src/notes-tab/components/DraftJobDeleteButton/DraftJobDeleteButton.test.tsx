import React, { ReactElement } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Button, Trash16 } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import DraftJobDeleteModal from '../DraftJobDeleteModal'
import DraftJobDeleteButton from '.'

jest.mock('@staff-portal/ui', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: {
    Circular: jest.fn()
  }
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))

const { HIDDEN, DISABLED } = OperationCallableTypes

const buttonMock = Button.Circular as unknown as jest.Mock
const useModalMock = useModal as jest.Mock
const mockOperation = Operation as jest.Mock
const showModalMock = jest.fn()

const draftJobId = encodeEntityId('123', 'Job')

const renderComponent = (operation: OperationType) => {
  buttonMock.mockImplementationOnce(() => null)
  useModalMock.mockReturnValueOnce({
    showModal: showModalMock
  })

  mockOperation.mockImplementationOnce(
    ({
      operation: { callable },
      render: renderChildren
    }: {
      operation: OperationType
      render: (disabled: boolean) => ReactElement
    }) => callable !== HIDDEN && renderChildren(callable === DISABLED)
  )

  render(<DraftJobDeleteButton operation={operation} draftJobId={draftJobId} />)
}

describe('DraftJobDeleteButton', () => {
  it('calls useModal with draftJobId', () => {
    renderComponent(createOperationMock())

    expect(useModalMock).toHaveBeenCalledWith(DraftJobDeleteModal, {
      draftJobId
    })
  })

  describe('when removeSalesDraftJobOperation operation is disabled', () => {
    it('renders disabled "Delete Draft Job" button', () => {
      renderComponent(
        createOperationMock({
          callable: DISABLED
        })
      )

      expect(buttonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: true
        }),
        {}
      )
    })
  })

  describe('when removeSalesDraftJobOperation operation is hidden', () => {
    it('hides the "Delete Draft Job" button', () => {
      renderComponent(
        createOperationMock({
          callable: HIDDEN
        })
      )

      expect(buttonMock).not.toHaveBeenCalled()
    })
  })

  describe('when removeSalesDraftJobOperation operation is enabled', () => {
    it('shows the "Delete Draft Job" button', () => {
      renderComponent(createOperationMock())

      expect(buttonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          'aria-label': 'Delete Draft Job',
          disabled: false,
          icon: expect.objectContaining({
            type: Trash16
          }),
          onClick: showModalMock,
          variant: 'flat'
        }),
        {}
      )
    })
  })
})
