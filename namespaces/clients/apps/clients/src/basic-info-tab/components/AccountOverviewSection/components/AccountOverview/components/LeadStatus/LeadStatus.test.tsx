import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'
import { CompanyOperationFragment } from '@staff-portal/clients'

import LeadStatus from './LeadStatus'
import useUpdateLeadStatusModal from './hooks/use-update-lead-status-modal'
import { getRenderEditButton } from './utils'

jest.mock('@toptal/picasso/Button')
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  useRenderLazyOperation: jest.fn()
}))
jest.mock('./hooks/use-update-lead-status-modal')
jest.mock('./utils')

const useUpdateLeadStatusModalMock = useUpdateLeadStatusModal as jest.Mock
const useRenderLazyOperationMock = useRenderLazyOperation as jest.Mock
const getRenderEditButtonMock = getRenderEditButton as jest.Mock

describe('LeadStatus', () => {
  const operation = {} as CompanyOperationFragment
  const clientId = 'client-id'
  const value = 'value'

  it('renders as expected', () => {
    // Arrange
    const renderOperationMock = jest.fn()

    useRenderLazyOperationMock.mockReturnValue(renderOperationMock)
    useUpdateLeadStatusModalMock.mockReturnValue({
      showModal: 'show-modal',
      loading: 'loading'
    })
    getRenderEditButtonMock.mockReturnValue('render-edit-button')

    // Act
    render(
      <TestWrapper>
        <LeadStatus clientId={clientId} operation={operation} value={value} />
      </TestWrapper>
    )

    // Assert
    expect(useUpdateLeadStatusModalMock).toHaveBeenCalledTimes(1)
    expect(useUpdateLeadStatusModalMock).toHaveBeenCalledWith(clientId)

    expect(useRenderLazyOperationMock).toHaveBeenCalledWith({
      getLazyOperationVariables: {
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'updateClientEnterpriseLeadStatus'
      },
      initialOperation: operation,
      onSuccess: expect.any(Function)
    })

    expect(getRenderEditButtonMock).toHaveBeenCalledTimes(1)

    expect(renderOperationMock).toHaveBeenCalledTimes(1)
    expect(renderOperationMock).toHaveBeenCalledWith('render-edit-button')
  })
})
