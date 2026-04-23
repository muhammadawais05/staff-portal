import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { InvestigationCreateModal } from '..'
import { InvestigationStartButton } from '.'

jest.mock('../InvestigationUpdateModal', () => null)
jest.mock('../InvestigationResolveModal', () => null)

jest.mock('@staff-portal/clients', () => ({
  CompanyApplicants: () => null
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
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

  render(<InvestigationStartButton operation={operation} clientId={clientId} />)
}

describe('InvestigationStartButton', () => {
  it('calls useModal with operation', () => {
    arrangeTest(createOperationMock())

    expect(useModalMock).toHaveBeenCalledWith(InvestigationCreateModal, {
      clientId
    })
  })

  describe('when createClientInvestigation operation is disabled', () => {
    it('renders disabled "Start Investigation" button', () => {
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

  describe('when createClientInvestigation operation is hidden', () => {
    it('hides the "Start Investigation" button', () => {
      arrangeTest(
        createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        })
      )

      expect(buttonMock).not.toHaveBeenCalled()
    })
  })

  describe('when createClientInvestigation operation is enabled', () => {
    it('shows the "Start Investigation" button', () => {
      arrangeTest(createOperationMock())

      expect(buttonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          size: 'small',
          variant: 'negative',
          onClick: showModalMock,
          children: 'Start Investigation'
        }),
        {}
      )
    })
  })
})
