import React, { ReactElement } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import AssignToJobButton from '.'
import AssignToJobModal from '../AssignToJobModal/AssignToJobModal'

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

const { HIDDEN, DISABLED } = OperationCallableTypes

const buttonMock = Button as unknown as jest.Mock
const useModalMock = useModal as jest.Mock
const operationMock = Operation as jest.Mock
const showModalMock = jest.fn()

const companyRepresentativeId = encodeEntityId('123', 'CompanyRepresentative')

const renderComponent = (operation: OperationType) => {
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
    <AssignToJobButton
      operation={operation}
      companyRepresentativeId={companyRepresentativeId}
    />
  )
}

describe('AssignToJobButton', () => {
  it('calls useModal with draftJobId', () => {
    renderComponent(createOperationMock())

    expect(useModalMock).toHaveBeenCalledWith(AssignToJobModal, {
      companyRepresentativeId
    })
  })

  describe('when assignCompanyRepresentativeToJob operation is disabled', () => {
    it('renders disabled "Assign to Job" button', () => {
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

  describe('when assignCompanyRepresentativeToJob operation is hidden', () => {
    it('hides the "Assign to Job" button', () => {
      renderComponent(
        createOperationMock({
          callable: HIDDEN
        })
      )

      expect(buttonMock).not.toHaveBeenCalled()
    })
  })

  describe('when assignCompanyRepresentativeToJob operation is enabled', () => {
    it('shows the "Assign to Job" button', () => {
      renderComponent(createOperationMock())

      expect(buttonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          onClick: showModalMock
        }),
        {}
      )
    })
  })
})
