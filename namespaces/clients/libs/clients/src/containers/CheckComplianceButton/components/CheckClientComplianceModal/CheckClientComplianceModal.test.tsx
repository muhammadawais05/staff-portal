import React, { ComponentProps, Suspense } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Modal } from '@staff-portal/modals-service'

import CheckClientComplianceModal from './CheckClientComplianceModal'
import CheckClientComplianceModalContent from '../CheckClientComplianceModalContent'

const CLIENT_ID = 'client-id'
const COUNTRY_ID = 'country-id-1'
const CONTACT_NAME = 'Megan Fox'
const TIMEZONE_NAME = 'timezone-name-1'
const CLIENT_NAME = 'Demi Moore'
const COUNTRIES = [
  {
    value: COUNTRY_ID,
    text: 'Greenland'
  },
  {
    value: 'country-id-2',
    text: 'Poland'
  }
]
const TIMEZONES = [
  {
    text: TIMEZONE_NAME,
    value: TIMEZONE_NAME
  },
  {
    text: 'timezone-name-2',
    value: 'timezone-name-2'
  }
]

type Props = ComponentProps<typeof CheckClientComplianceModal>

const mockedHandleSubmit = jest.fn(() => null)
const mockedModal = Modal as unknown as jest.Mock
const mockedCheckClientComplianceModalContent =
  CheckClientComplianceModalContent as unknown as jest.Mock

jest.mock('@staff-portal/mutation-result-handlers/src/hooks', () => ({
  useModalFormChangeHandler: () => ({
    handleSubmit: mockedHandleSubmit,
    loading: false
  })
}))
jest.mock('@staff-portal/modals-service', () => ({
  Modal: jest.fn(),
  defineLegacyHashModal: () => () => {}
}))
jest.mock('../CheckClientComplianceModalContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const renderComponent = ({
  hideModal,
  clientName
}: Pick<Props, 'hideModal' | 'clientName'>) =>
  render(
    <Suspense fallback={null}>
      <CheckClientComplianceModal
        clientId={CLIENT_ID}
        countryId={COUNTRY_ID}
        contactName={CONTACT_NAME}
        clientName={clientName}
        timeZoneName={TIMEZONE_NAME}
        countryOptions={COUNTRIES}
        timezoneOptions={TIMEZONES}
        loading={false}
        addStatusMessage={() => {}}
        removeStatusMessage={() => {}}
        onSuccess={() => {}}
        hideModal={hideModal}
      />
    </Suspense>
  )

describe('CheckClientComplianceModal', () => {
  beforeEach(() => {
    mockedModal.mockImplementation(({ children }) => children)
    mockedCheckClientComplianceModalContent.mockImplementation(() => null)
  })

  it('renders default fields', () => {
    const hideModal = () => null

    renderComponent({
      clientName: CLIENT_NAME,
      hideModal
    })

    expect(mockedModal).toHaveBeenCalledTimes(1)
    expect(mockedModal).toHaveBeenCalledWith(
      {
        open: true,
        onClose: hideModal,
        defaultTitle: 'Check Compliance',
        'data-testid': 'check-compliance-modal',
        size: 'small',
        operationVariables: {
          nodeId: CLIENT_ID,
          nodeType: 'Client',
          operationName: 'checkClientCompliance'
        },
        children: expect.objectContaining({
          props: expect.objectContaining({
            countryOptions: COUNTRIES,
            timezoneOptions: TIMEZONES,
            handleSubmit: mockedHandleSubmit,
            hideModal,
            initialValues: expect.objectContaining({
              clientId: CLIENT_ID,
              contactName: CONTACT_NAME,
              countryId: COUNTRY_ID,
              timeZoneName: TIMEZONE_NAME
            }),
            submitting: false,
            title: 'Check Compliance',
            showContactNameHint: false
          })
        })
      },
      {}
    )
  })

  it('renders hint if clientName equals clientName', () => {
    renderComponent({
      clientName: CONTACT_NAME,
      hideModal: () => null
    })

    expect(mockedModal).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.objectContaining({
          props: expect.objectContaining({
            showContactNameHint: true
          })
        })
      }),
      {}
    )
  })
})
