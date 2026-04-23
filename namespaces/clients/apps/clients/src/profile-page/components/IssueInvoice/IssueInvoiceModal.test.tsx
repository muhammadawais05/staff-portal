import React, { Suspense } from 'react'
import { render } from '@testing-library/react'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { Modal } from '@staff-portal/modals-service'

import IssueInvoiceModal from './IssueInvoiceModal'
import { IssueInvoiceModalContent } from './components'

jest.mock('@staff-portal/modals-service', () => ({
  Modal: jest.fn()
}))
jest.mock('./components/IssueInvoiceModalContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedModal = Modal as unknown as jest.Mock
const mockedIssueInvoiceModalContent =
  IssueInvoiceModalContent as unknown as jest.Mock

describe('IssueDepositInvoiceModal', () => {
  beforeEach(() => {
    mockedModal.mockImplementationOnce(({ children }) => <>{children}</>)
    mockedIssueInvoiceModalContent.mockReturnValueOnce(null)
  })

  it('default render', () => {
    const hideModal = () => null
    const modalTitle = 'Issue a Deposit Invoice'
    const mutationDocument = {} as DocumentNode
    const mutationResultName = 'createClientDepositInvoice'
    const successNotificationMessage = 'Invoice created'
    const clientId = 'clientId'
    const companyName = 'FullName'

    render(
      <Suspense fallback={null}>
        <IssueInvoiceModal
          modalTitle={modalTitle}
          mutationDocument={mutationDocument}
          mutationResultName={mutationResultName}
          successNotificationMessage={successNotificationMessage}
          clientId={clientId}
          companyName={companyName}
          hideModal={hideModal}
        />
      </Suspense>
    )

    expect(mockedModal).toHaveBeenCalledTimes(1)
    expect(mockedModal).toHaveBeenCalledWith(
      {
        children: expect.objectContaining({
          props: {
            clientId,
            companyName,
            hideModal,
            modalTitle,
            mutationDocument,
            mutationResultName,
            successNotificationMessage
          }
        }),
        'data-testid': 'issue-invoice-modal',
        onClose: hideModal,
        open: true,
        withForm: true
      },
      {}
    )
  })
})
