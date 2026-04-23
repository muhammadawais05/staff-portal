import React, { ComponentProps, Suspense } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Modal, ModalForm } from '@staff-portal/modals-service'

import { ClientClaimingOperationsFragment } from '../../data/client-claiming-operations-fragment'
import LogSalesCallActionsModal from './LogSalesCallActionsModal'
import LogSalesCallActionsModalContent from './components/LogSalesCallActionsModalContent'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn(),
  ModalForm: jest.fn()
}))

jest.mock('./components/LogSalesCallActionsModalContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const renderComponent = (
  props: ComponentProps<typeof LogSalesCallActionsModal>
) =>
  render(
    <Suspense fallback={null}>
      <LogSalesCallActionsModal {...props} />
    </Suspense>
  )

const MockModal = Modal as unknown as jest.Mock
const MockModalForm = ModalForm as unknown as jest.Mock
const MockLogSalesCallActionsModalContent =
  LogSalesCallActionsModalContent as unknown as jest.Mock

describe('LogSalesCallActionsModal', () => {
  beforeEach(() => {
    MockModal.mockImplementationOnce(({ children }) => <>{children}</>)
    MockModalForm.mockImplementationOnce(({ children }) => <>{children}</>)
    MockLogSalesCallActionsModalContent.mockReturnValueOnce(null)
  })

  it('shows the log sales call business actions modal', () => {
    const clientId = {} as unknown as string
    const operations = {} as unknown as ClientClaimingOperationsFragment
    const hideModal = () => null

    renderComponent({
      onSubmit: () => null,
      operations,
      clientId,
      hideModal
    })

    expect(MockModal).toHaveBeenCalledTimes(1)
    expect(MockModal).toHaveBeenCalledWith(
      expect.objectContaining({
        onClose: hideModal
      }),
      {}
    )
    expect(MockModalForm).toHaveBeenCalledTimes(1)
    expect(MockModalForm).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Sales Call Notes Saved',
        children: expect.objectContaining({
          props: {
            clientId,
            operations,
            hideModal
          }
        })
      }),
      {}
    )
  })
})
