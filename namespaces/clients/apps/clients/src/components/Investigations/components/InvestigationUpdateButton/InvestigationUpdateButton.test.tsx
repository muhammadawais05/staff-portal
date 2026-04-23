import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { InvestigationUpdateModal } from '..'
import { InvestigationUpdateButton } from '.'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@staff-portal/communication', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/jobs', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/filters', () => ({
  pageQueryParam: jest.fn(),
  createInputCategory: jest.fn(),
  SortOrder: {
    ASC: 'asc',
    DESC: 'desc'
  }
}))

jest.mock('@staff-portal/communication-send-email', () => ({
  __esModule: true,
  default: jest.fn()
}))

const buttonMock = Button as unknown as jest.Mock
const useModalMock = useModal as jest.Mock
const showModalMock = jest.fn()

const clientId = encodeEntityId('123', 'Client')

const arrangeTest = (operation: Operation) => {
  useModalMock.mockReturnValueOnce({
    showModal: showModalMock
  })
  buttonMock.mockImplementationOnce(() => null)

  render(
    <InvestigationUpdateButton operation={operation} clientId={clientId} />
  )
}

describe('InvestigationUpdateButton', () => {
  it('calls useModal with operation', () => {
    arrangeTest(createOperationMock())

    expect(useModalMock).toHaveBeenCalledWith(InvestigationUpdateModal, {
      clientId
    })
  })

  describe('when updateClientInvestigation operation is disabled', () => {
    it('renders disabled "Update Investigation" button', () => {
      arrangeTest(
        createOperationMock({
          callable: OperationCallableTypes.DISABLED
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

  describe('when updateClientInvestigation operation is hidden', () => {
    it('hides the "Update Investigation" button', () => {
      arrangeTest(
        createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        })
      )

      expect(buttonMock).not.toHaveBeenCalled()
    })
  })

  describe('when updateClientInvestigation operation is enabled', () => {
    it('shows the "Update Investigation" button', () => {
      arrangeTest(createOperationMock())

      expect(buttonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          size: 'small',
          variant: 'positive',
          onClick: showModalMock,
          children: 'Update Investigation'
        }),
        {}
      )
    })
  })
})
