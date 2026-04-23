import React, { Suspense } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import InviteContactModal from './InviteContactModal'

jest.mock('@staff-portal/modals-service', () => ({
  Modal: jest.fn()
}))
jest.mock('./components/InviteContactContent/InviteContactContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const ModalMock = Modal as unknown as jest.Mock

describe('InviteContactModal', () => {
  it('renders with the correct props', () => {
    const clientId = 'clientId'
    const hideModal = () => {}

    ModalMock.mockImplementationOnce(({ children }) => <>{children}</>)

    render(
      <Suspense fallback={null}>
        <InviteContactModal clientId={clientId} hideModal={hideModal} />
      </Suspense>
    )

    expect(ModalMock).toHaveBeenCalledTimes(1)
    expect(ModalMock).toHaveBeenCalledWith(
      {
        children: expect.objectContaining({
          props: {
            clientId,
            hideModal
          }
        }),
        onClose: hideModal,
        open: true,
        operationVariables: {
          nodeId: clientId,
          nodeType: NodeType.CLIENT,
          operationName: 'inviteCompanyRepresentative'
        },
        size: 'small'
      },
      {}
    )
  })
})
