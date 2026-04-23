import React, { Suspense } from 'react'
import { render } from '@testing-library/react'
import { Modal } from '@staff-portal/modals-service'

import AssignToJobModal from './AssignToJobModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn()
}))

const ModalMock = Modal as unknown as jest.Mock

const COMPANY_REPRESENTATIVE_ID = Symbol() as unknown as string
const HIDE_MODAL = Symbol() as unknown as () => void

describe('AssignToJobModal', () => {
  it('shows assign to job modal', () => {
    ModalMock.mockReturnValue(null)
    render(
      <Suspense fallback={null}>
        <AssignToJobModal
          companyRepresentativeId={COMPANY_REPRESENTATIVE_ID}
          hideModal={HIDE_MODAL}
        />
      </Suspense>
    )

    expect(ModalMock).toHaveBeenCalledWith(
      {
        children: expect.objectContaining({
          props: expect.objectContaining({
            hideModal: HIDE_MODAL,
            companyRepresentativeId: COMPANY_REPRESENTATIVE_ID
          })
        }),
        defaultTitle: 'Assign this Contact to Job',
        onClose: HIDE_MODAL,
        open: true,
        operationVariables: {
          nodeId: COMPANY_REPRESENTATIVE_ID,
          nodeType: 'CompanyRepresentative',
          operationName: 'assignCompanyRepresentativeToJob'
        }
      },
      {}
    )
  })
})
