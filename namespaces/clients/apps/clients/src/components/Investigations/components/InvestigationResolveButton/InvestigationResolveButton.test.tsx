import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  InvestigationReason,
  Operation,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { InvestigationAvailableReason } from '../../../../config'
import { InvestigationResolveModal } from '..'
import { InvestigationResolveButton } from '.'

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

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn(),
  defineLegacyHashModal: () => () => {}
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

const buttonMock = Button as unknown as jest.Mock
const useModalMock = useModal as jest.Mock
const showModalMock = jest.fn()

const clientId = encodeEntityId('123', 'Client')

const renderComponent = (
  operation: Operation,
  investigationReason: InvestigationAvailableReason = InvestigationReason.LEGAL
) => {
  useModalMock.mockReturnValueOnce({
    showModal: showModalMock
  })
  buttonMock.mockImplementationOnce(() => null)

  render(
    <InvestigationResolveButton
      operation={operation}
      clientId={clientId}
      investigationReason={investigationReason}
    />
  )
}

describe('InvestigationResolveButton', () => {
  it('calls useModal with operation', () => {
    renderComponent(createOperationMock())

    expect(useModalMock).toHaveBeenCalledWith(InvestigationResolveModal, {
      clientId,
      investigationReason: InvestigationReason.LEGAL
    })
  })

  describe('when resolve...Investigation operation is disabled', () => {
    it('renders disabled "Resolve Investigation" button', () => {
      renderComponent(
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

  describe('when resolve...Investigation operation is hidden', () => {
    it('hides the "Resolve Investigation" button', () => {
      renderComponent(
        createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        })
      )

      expect(buttonMock).not.toHaveBeenCalled()
    })
  })

  describe('when resolve...Investigation operation is enabled', () => {
    it('shows the "Resolve Investigation" button', () => {
      renderComponent(createOperationMock())

      expect(buttonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          size: 'small',
          variant: 'positive',
          onClick: showModalMock,
          children: 'Resolve Investigation'
        }),
        {}
      )
    })
  })
})
