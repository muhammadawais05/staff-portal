import { useMemo } from 'react'
import { useModal } from '@staff-portal/modals-service'
import { getCountriesHook } from '@staff-portal/facilities'
import { useCustomStatusMessagesContext } from '@staff-portal/page-wrapper'

import CheckClientComplianceModal from '../components/CheckClientComplianceModal/CheckClientComplianceModal'
import {
  useGetCheckClientComplianceData,
  useGetAvailableTimezonesLazy
} from '../data'

export const useCheckClientComplianceModal = ({
  clientId,
  onComplete: onSuccess
}: {
  clientId: string
  onComplete?: () => void
}) => {
  // a workaround for not being able to use this context in a modal
  // TODO: https://toptal-core.atlassian.net/browse/SPB-3155
  const { addStatusMessage, removeStatusMessage } =
    useCustomStatusMessagesContext()
  const useGetCountriesLazy = getCountriesHook()
  const {
    fetch: checkClientComplianceFetch,
    data: checkComplianceData,
    loading: checkComplianceLoading
  } = useGetCheckClientComplianceData(clientId)
  const {
    request: countriesFetch,
    data: countries,
    loading: countriesLoading
  } = useGetCountriesLazy()
  const {
    fetch: timezonesFetch,
    data: timezones,
    loading: timezonesLoading
  } = useGetAvailableTimezonesLazy()

  const countryOptions = useMemo(
    () =>
      (countries ?? []).map(({ id, name }) => ({
        value: id,
        text: name
      })),
    [countries]
  )

  const timezoneOptions = useMemo(
    () =>
      (timezones?.availableTimeZones ?? []).map(({ value, name }) => ({
        value,
        text: name
      })),
    [timezones]
  )

  const { showModal } = useModal(CheckClientComplianceModal, {
    clientId,
    countryOptions,
    timezoneOptions,
    clientName: checkComplianceData?.node?.fullName || '',
    countryId: checkComplianceData?.node?.country?.id || '',
    contactName: checkComplianceData?.node?.contact?.fullName || '',
    timeZoneName: checkComplianceData?.node?.timeZone?.value || '',
    loading: checkComplianceLoading || countriesLoading || timezonesLoading,
    addStatusMessage,
    removeStatusMessage,
    onSuccess
  })

  return {
    showModal: () => {
      checkClientComplianceFetch()
      countriesFetch()
      timezonesFetch()
      showModal()
    }
  }
}
