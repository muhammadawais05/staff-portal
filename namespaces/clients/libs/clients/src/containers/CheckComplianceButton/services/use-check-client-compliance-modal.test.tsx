import { renderHook, act } from '@testing-library/react-hooks'
import { useModal } from '@staff-portal/modals-service'
import { getCountriesHook } from '@staff-portal/facilities'
import { useCustomStatusMessagesContext } from '@staff-portal/page-wrapper'

import CheckClientComplianceModal from '../components/CheckClientComplianceModal/CheckClientComplianceModal'
import {
  useGetCheckClientComplianceData,
  useGetAvailableTimezonesLazy
} from '../data'
import { useCheckClientComplianceModal } from './use-check-client-compliance-modal'

jest.mock('../data', () => ({
  ...jest.requireActual('../data'),
  useGetAvailableTimezonesLazy: jest.fn(),
  useGetCheckClientComplianceData: jest.fn()
}))

jest.mock('@staff-portal/page-wrapper', () => ({
  ...jest.requireActual('@staff-portal/page-wrapper'),
  useCustomStatusMessagesContext: jest.fn()
}))

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  getCountriesHook: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useGetAvailableTimezonesLazyMock =
  useGetAvailableTimezonesLazy as jest.Mock
const useGetCheckClientComplianceDataMock =
  useGetCheckClientComplianceData as jest.Mock
const useCustomStatusMessagesContextMock =
  useCustomStatusMessagesContext as jest.Mock
const getCountriesHookMock = getCountriesHook as jest.Mock
const useGetCountriesLazyMock = jest.fn()
const useModalMock = useModal as jest.Mock
const customStatusMessageContextValue = {
  addStatusMessage: {},
  removeStatusMessage: {}
}

describe('useCheckClientComplianceModal', () => {
  const props = {
    clientId: {} as string,
    onComplete: () => {}
  }

  beforeEach(() => {
    useCustomStatusMessagesContextMock.mockReturnValue(
      customStatusMessageContextValue
    )
    useGetCountriesLazyMock.mockReturnValue(() => {})
    getCountriesHookMock.mockReturnValue(useGetCountriesLazyMock)
  })

  it('calls useModal hook with expected props passed', () => {
    const nodeMock = {
      fullName: 'client_full_name',
      country: {
        id: 'client_country_id'
      },
      contact: {
        fullName: 'contact_full_name'
      },
      timeZone: {
        name: '(UTC-05:00) America - New York',
        value: 'America/New_York'
      }
    }

    useGetCheckClientComplianceDataMock.mockReturnValue({
      data: { node: nodeMock }
    })

    useGetCountriesLazyMock.mockReturnValue({
      data: [
        {
          id: 'country_id',
          name: 'country_name'
        },
        {
          id: 'latvia_id',
          name: 'Latvia'
        }
      ]
    })

    useGetAvailableTimezonesLazyMock.mockReturnValue({
      data: {
        availableTimeZones: [
          {
            name: 'timezone_name',
            value: 'timezone_value'
          },
          {
            name: '(UTC+00:00) Europe - Belfast',
            value: 'Europe/Belfast'
          }
        ]
      }
    })

    // Act

    renderHook(() => useCheckClientComplianceModal(props))

    // Assert

    expect(useCustomStatusMessagesContextMock).toHaveBeenCalledTimes(1)
    expect(getCountriesHookMock).toHaveBeenCalledTimes(1)
    expect(useGetCheckClientComplianceData).toHaveBeenCalledTimes(1)
    expect(useGetCheckClientComplianceData).toHaveBeenCalledWith(props.clientId)
    expect(useGetAvailableTimezonesLazyMock).toHaveBeenCalledTimes(1)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(
      CheckClientComplianceModal,
      expect.objectContaining({
        clientId: props.clientId,
        countryOptions: [
          { value: 'country_id', text: 'country_name' },
          { value: 'latvia_id', text: 'Latvia' }
        ],
        timezoneOptions: [
          { value: 'timezone_value', text: 'timezone_name' },
          { value: 'Europe/Belfast', text: '(UTC+00:00) Europe - Belfast' }
        ],
        timeZoneName: 'America/New_York',
        clientName: nodeMock.fullName,
        countryId: nodeMock.country.id,
        contactName: nodeMock.contact.fullName,
        addStatusMessage: customStatusMessageContextValue.addStatusMessage,
        removeStatusMessage:
          customStatusMessageContextValue.removeStatusMessage,
        onSuccess: props.onComplete
      })
    )
  })

  it('returns showModal method, which fetches data and opens modal', () => {
    const fetchClientComplianceData = jest.fn()
    const fetchCountries = jest.fn()
    const fetchAvailableTimezones = jest.fn()
    const showModal = jest.fn()

    useGetCheckClientComplianceDataMock.mockReturnValue({
      fetch: fetchClientComplianceData
    })
    useGetCountriesLazyMock.mockReturnValue({
      request: fetchCountries
    })
    useGetAvailableTimezonesLazyMock.mockReturnValue({
      fetch: fetchAvailableTimezones
    })
    useModalMock.mockReturnValue({
      showModal
    })

    const { result } = renderHook(() => useCheckClientComplianceModal(props))

    act(() => {
      result.current.showModal()

      expect(fetchClientComplianceData).toHaveBeenCalledTimes(1)
      expect(fetchCountries).toHaveBeenCalledTimes(1)
      expect(fetchAvailableTimezones).toHaveBeenCalledTimes(1)
      expect(showModal).toHaveBeenCalledTimes(1)
    })
  })
})
