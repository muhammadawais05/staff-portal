import React, { ComponentProps, Suspense } from 'react'
import { render } from '@testing-library/react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import ClaimClientEnterpriseModal from './ClaimClientEnterpriseModal'

jest.mock('@staff-portal/modals-service', () => ({
  Modal: jest.fn()
}))
jest.mock(
  './components/ClaimClientEnterpriseModalContent/ClaimClientEnterpriseModalContent',
  () => ({
    __esModule: true,
    default: jest.fn().mockReturnValueOnce(null)
  })
)

const renderComponent = (
  props: ComponentProps<typeof ClaimClientEnterpriseModal>
) =>
  render(
    <Suspense fallback={null}>
      <ClaimClientEnterpriseModal {...props} />
    </Suspense>
  )

const mockedModal = Modal as unknown as jest.Mock

describe('ClaimClientEnterpriseModal', () => {
  beforeEach(() => {
    mockedModal.mockImplementationOnce(({ children }) => children)
  })

  it('renders component', () => {
    const clientId = 'clientId'
    const hideModal = () => null

    renderComponent({
      clientId,
      hideModal
    })

    expect(mockedModal).toHaveBeenCalledTimes(1)
    expect(mockedModal).toHaveBeenCalledWith(
      {
        onClose: hideModal,
        open: true,
        defaultTitle: 'Notice: Claiming Enterprise Lead',
        'data-testid': 'ClaimClientEnterpriseModal',
        operationVariables: {
          nodeId: clientId,
          nodeType: NodeType.CLIENT,
          operationName: 'claimClientEnterprise'
        },
        children: expect.objectContaining({
          props: {
            clientId,
            hideModal
          }
        })
      },
      {}
    )
  })
})
