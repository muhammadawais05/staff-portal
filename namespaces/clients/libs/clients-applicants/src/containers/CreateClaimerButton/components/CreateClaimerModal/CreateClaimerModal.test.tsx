import React, { ComponentProps, Suspense } from 'react'
import { render } from '@testing-library/react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import CreateClaimerModal from './CreateClaimerModal'

jest.mock('@staff-portal/modals-service', () => ({
  Modal: jest.fn()
}))
jest.mock('../CreateClaimerModalContainer/CreateClaimerModalContainer', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValueOnce(null)
}))

const renderComponent = (props: ComponentProps<typeof CreateClaimerModal>) =>
  render(
    <Suspense fallback={null}>
      <CreateClaimerModal {...props} />
    </Suspense>
  )

const mockedModal = Modal as unknown as jest.Mock

describe('CreateClaimerModal', () => {
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
        size: 'medium',
        operationVariables: {
          nodeId: clientId,
          nodeType: NodeType.CLIENT,
          operationName: 'createClientClaimer'
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
