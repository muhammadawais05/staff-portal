import React, { ComponentProps, Suspense } from 'react'
import { render } from '@testing-library/react'
import { InvestigationReason } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'
import { Modal } from '@staff-portal/modals-service'

import { useGetApplyNoCommsFlag } from '../../data'
import InvestigationResolveModal from './InvestigationResolveModal'

const mockedHandleSubmit = jest.fn(() => null)
const mockedModal = Modal as unknown as jest.Mock
const mockedUseGetApplyNoCommsFlag = useGetApplyNoCommsFlag as jest.Mock

jest.mock('@staff-portal/mutation-result-handlers/src/hooks', () => ({
  useModalFormChangeHandler: () => ({
    handleSubmit: mockedHandleSubmit,
    loading: false
  })
}))
jest.mock('@staff-portal/tasks', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn(),
  defineLegacyHashModal: () => () => {}
}))
jest.mock('./components/InvestigationResolveModalContent', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValueOnce(null)
}))
jest.mock('./config', () => ({
  getInitialValues: jest.fn(),
  MUTATION_DOCUMENT_MAPPING: {
    REPORTED_ISSUES: null
  }
}))
jest.mock(
  '../../data',
  () => ({
    useGetApplyNoCommsFlag: jest.fn()
  })
)

const renderComponent = (
  props: ComponentProps<typeof InvestigationResolveModal>
) =>
  render(
    <Suspense fallback={null}>
      <InvestigationResolveModal {...props} />
    </Suspense>
  )

describe('InvestigationResolveModal', () => {
  beforeEach(() => {
    mockedModal.mockImplementationOnce(({ children }) => children)
    mockedUseGetApplyNoCommsFlag.mockReturnValue({
      data: { hasNoCommsTokenKey: true },
      loading: false,
      initialLoading: false
    })
  })

  it('renders component', () => {
    const clientId = 'clientId'
    const hideModal = () => null

    renderComponent({
      clientId,
      hideModal,
      investigationReason: InvestigationReason.REPORTED_ISSUES
    })

    expect(mockedModal).toHaveBeenCalledTimes(1)
    expect(mockedModal).toHaveBeenCalledWith(
      {
        open: true,
        onClose: hideModal,
        defaultTitle: 'Resolve Investigation',
        operationVariables: {
          nodeId: clientId,
          nodeType: NodeType.CLIENT,
          operationName: 'resolveClientReportedIssuesInvestigation'
        },
        children: expect.objectContaining({
          props: expect.objectContaining({
            handleSubmit: mockedHandleSubmit,
            hideModal: hideModal,
            hasNoCommsTokenKey: true,
            investigationReason: InvestigationReason.REPORTED_ISSUES,
            loading: false,
            submitting: false,
            title: 'Resolve Investigation'
          })
        })
      },
      {}
    )
  })
})
