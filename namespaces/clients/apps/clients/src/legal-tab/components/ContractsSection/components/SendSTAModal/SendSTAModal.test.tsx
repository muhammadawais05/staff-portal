import React, { ComponentProps, Suspense } from 'react'
import { render, waitFor } from '@toptal/picasso/test-utils'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import SendStaForm from './components/SendStaForm/SendStaForm'
import { DefaultContactFragment } from '../../data/default-contact-fragment'
import SendSTAModal from './SendSTAModal'
import { useGetClientSignerDetails } from './utils/use-get-client-signer-details'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn(),
  ModalSuspender: jest.fn()
}))

jest.mock('./components/SendStaForm/SendStaForm', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('./utils/use-get-client-signer-details', () => ({
  useGetClientSignerDetails: jest.fn()
}))

const useGetClientSignerDetailsMock = useGetClientSignerDetails as jest.Mock
const ModalSuspenderMock = ModalSuspender as unknown as jest.Mock
const ModalMock = Modal as unknown as jest.Mock
const SendStaFormMock = SendStaForm as jest.Mock

const data = {
  signerEmail: {} as string,
  signerFullName: {} as string
}
const clientId = {} as string
const modalProps: ComponentProps<typeof SendStaForm> = {
  hideModal: () => {},
  clientId,
  defaultContact: {} as DefaultContactFragment,
  isSubsidiarySelected: {} as boolean,
  signerEmail: data.signerEmail,
  signerFullName: data.signerFullName
}

const renderComponent = () =>
  render(
    <Suspense fallback={null}>
      <SendSTAModal {...modalProps} />
    </Suspense>
  )

describe('SendStaModal', () => {
  beforeEach(() => {
    ModalMock.mockImplementation(({ children }) => (
      <section>{children}</section>
    ))
    SendStaFormMock.mockReturnValue(<div>me</div>)
    ModalSuspenderMock.mockReturnValue(null)
  })

  describe('when data is loading', () => {
    it('renders modal suspender', () => {
      useGetClientSignerDetailsMock.mockReturnValue({
        data: undefined,
        loading: true
      })

      renderComponent()

      expect(useGetClientSignerDetailsMock).toHaveBeenCalledTimes(1)
      expect(ModalSuspenderMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('when data is not loading', () => {
    it('renders inner components with correct props passed', async () => {
      useGetClientSignerDetailsMock.mockReturnValue({
        data,
        loading: false
      })

      renderComponent()

      expect(ModalSuspenderMock).not.toHaveBeenCalled()
      expect(ModalMock).toHaveBeenCalledTimes(1)
      expect(ModalMock).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true,
          operationVariables: {
            nodeId: clientId,
            operationName: 'sendSTA',
            nodeType: NodeType.CLIENT
          },
          defaultTitle: 'Send Sourced Talent Agreement'
        }),
        {}
      )

      await waitFor(() => {
        expect(SendStaFormMock).toHaveBeenCalledTimes(1)
        expect(SendStaFormMock).toHaveBeenCalledWith(modalProps, {})
      })
    })
  })
})
