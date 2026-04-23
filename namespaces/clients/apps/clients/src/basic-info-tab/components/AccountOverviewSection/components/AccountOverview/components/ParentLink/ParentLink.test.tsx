import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Button, Tooltip } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { isOperationEnabled, LazyOperation } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { getParentLinkHook } from '../../utils/get-client-parent-hook'
import ParentLink from '.'
import { CompanyParentFragment } from '../../../../data'

jest.mock('@staff-portal/clients', () => ({
  NO_VALUE: '—'
}))
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  isOperationEnabled: jest.fn(),
  LazyOperation: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('../../utils/get-client-parent-hook', () => ({
  getParentLinkHook: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn(),
  Tooltip: jest.fn()
}))
jest.mock('./data', () => ({
  useRemoveClientParentLinkMutation: () => [() => {}, { loading: false }]
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('./hooks', () => ({
  useUpdateCascadeParentModal: () => ({ showModal: () => null })
}))
jest.mock('./components/ParentLinkEditor', () => jest.fn())

const editableFieldMock = EditableField as jest.Mock
const tooltipMock = Tooltip as unknown as jest.Mock
const getClientParentLinkHookMock = getParentLinkHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const mockButton = Button as unknown as jest.Mock
const mockLazyOperation = LazyOperation as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock

const getOperations = () => {
  const operation: CompanyOperationFragment = {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }

  return {
    updateClientParent: operation,
    removeClientParent: operation,
    cascadeClientParentUpdates: operation
  }
}

const arrangeTest = (
  props: Partial<ComponentProps<typeof ParentLink>> = {}
) => {
  return render(
    <TestWrapper>
      <ParentLink
        clientId='clientId'
        parent={props.parent}
        operations={props.operations ?? getOperations()}
      />
    </TestWrapper>
  )
}

describe('ParentLink', () => {
  describe('when operation is enabled', () => {
    beforeEach(() => {
      mockButton.mockImplementation(
        ({ children }: { children: JSX.Element }) => (
          <div data-testid='Button'>{children}</div>
        )
      )
      editableFieldMock.mockReturnValue(null)
      getClientParentLinkHookMock.mockReturnValue('query')
      useEditableFieldChangeHandlerMock.mockReturnValue('onChange')
      isOperationEnabledMock.mockReturnValue(true)
      mockLazyOperation.mockImplementation(({ children }) =>
        children({ disabled: false })
      )
    })

    describe.each([
      {
        condition: 'has parent',
        parent: {
          id: 'parentId',
          webResource: { text: 'parent' }
        } as CompanyParentFragment['parent'],
        expected: { viewer: 'parent', editableFieldValue: 'parentId' }
      },
      {
        condition: 'has no parent',
        parent: null,
        expected: { viewer: NO_VALUE, editableFieldValue: '' }
      },
      {
        condition: 'has no parent',
        parent: undefined,
        expected: { viewer: NO_VALUE, editableFieldValue: '' }
      }
    ])('when $condition', ({ parent, expected }) => {
      it(`returns ${JSON.stringify(expected)}`, () => {
        const { viewer, editableFieldValue } = expected

        arrangeTest({
          parent,
          operations: {
            ...getOperations(),
            updateClientParent: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        })

        const { container } = render(editableFieldMock.mock.calls[0][0].viewer)

        expect(container).toHaveTextContent(viewer)

        expect(getClientParentLinkHookMock).toHaveBeenCalledTimes(1)
        expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
        expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)

        expect(editableFieldMock).toHaveBeenCalledTimes(1)
        expect(editableFieldMock).toHaveBeenCalledWith(
          expect.objectContaining({
            disabled: false,
            name: 'parentId',
            onChange: 'onChange',
            queryValue: 'query',
            value: editableFieldValue,
            editor: expect.any(Function)
          }),
          {}
        )
      })
    })

    it('renders remove button', () => {
      const removeClientParent = {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }

      arrangeTest({
        parent: {
          id: 'parentId',
          webResource: { text: 'parent' }
        } as CompanyParentFragment['parent'],
        operations: {
          ...getOperations(),
          removeClientParent
        }
      })

      expect(mockLazyOperation).toHaveBeenCalledWith(
        {
          children: expect.any(Function),
          getLazyOperationVariables: {
            nodeId: 'clientId',
            nodeType: NodeType.CLIENT,
            operationName: 'removeClientParent'
          },
          initialOperation: removeClientParent
        },
        {}
      )
      expect(mockButton).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Remove'
        }),
        {}
      )
    })
  })

  describe('when operation is disabled', () => {
    beforeEach(() => {
      mockButton.mockReturnValue(null)
      editableFieldMock.mockReturnValue(null)
      getClientParentLinkHookMock.mockReturnValue('')
      useEditableFieldChangeHandlerMock.mockReturnValue('')
      isOperationEnabledMock.mockReturnValue(false)
      mockLazyOperation.mockImplementation(({ children }) =>
        children({ disabled: true })
      )
    })

    it('renders tooltip for inline field', () => {
      tooltipMock.mockReturnValue(null)
      arrangeTest({
        parent: {
          id: 'parentId',
          webResource: { text: 'parent' }
        } as CompanyParentFragment['parent'],
        operations: {
          ...getOperations(),
          updateClientParent: {
            callable: OperationCallableTypes.DISABLED,
            messages: ['message']
          }
        }
      })

      render(editableFieldMock.mock.calls[0][0].viewer)

      expect(tooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({ content: 'message.' }),
        {}
      )
    })

    it('does not render remove button', () => {
      arrangeTest({
        parent: {
          id: 'parentId',
          webResource: { text: 'parent' }
        } as CompanyParentFragment['parent'],
        operations: {
          ...getOperations(),
          removeClientParent: {
            callable: OperationCallableTypes.DISABLED,
            messages: ['message']
          }
        }
      })

      expect(mockButton).toHaveBeenCalledTimes(0)
    })
  })
})
