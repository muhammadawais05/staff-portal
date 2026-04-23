import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Country, UsaState } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { useGetData, useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import {
  useGetCountriesQuery,
  useSetUpdateClientBillingAddressMutation,
  useGetUpdateClientBillingAddressQuery,
  useGetUsaStatesQuery
} from '../../data'
import BillingAddressEditModalForm from '../ModalForm'
import adjustValues from '../../utils/adjustValues'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'BillingAddressEditModal'
const responseKey = 'updateClientBillingAddress'

// eslint-disable-next-line complexity
const BillingAddressEditModal: FC<Props> = memo(({ options: { nodeId } }) => {
  const {
    data: {
      fullName = '',
      billingAdditionalInfo = '',
      billingAddress = '',
      billingName = '',
      billingCity = '',
      billingCountry,
      billingZip = '',
      billingState,
      billingPhone = ''
    } = {},
    loading: loadingClient,
    initialLoading: initialLoadingClient
  } = useGetNode(useGetUpdateClientBillingAddressQuery)({
    id: nodeId
  })
  const {
    data: { nodes: countries = [] } = {},
    loading: loadingCountries,
    initialLoading: initialLoadingCountries
  } = useGetData(useGetCountriesQuery, 'countries')({})
  const {
    data: usaStates = [],
    loading: loadingStates,
    initialLoading: initialLoadingStates
  } = useGetData(useGetUsaStatesQuery, 'usaStates')({})

  const countryOptions = (countries as Country[]).map(country => ({
    key: decodeId({ type: 'country', id: country.id }),
    text: country.name,
    value: country.id
  }))
  const usaCountryId =
    countryOptions.find(country => country.text === 'United States')?.value ||
    ''
  const stateOptions = (usaStates as UsaState[]).map(state => ({
    text: state.name,
    value: state.code
  }))

  const { t: translate } = useTranslation('billingDetails')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setUpdateClientBillingAddressMutation] =
    useSetUpdateClientBillingAddressMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const handleOnSubmit = handleSubmit({
    adjustValues: formValues => adjustValues(formValues, usaCountryId),
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.billingAddressEdit,
      successMessage: translate(
        'modals.billingAddressEdit.notification.success'
      )
    }),
    responseKey,
    submit: setUpdateClientBillingAddressMutation,
    variables: {
      clientId: nodeId
    }
  })
  const initialValues = {
    billingAdditionalInfo,
    billingAddress: billingAddress || '',
    billingName,
    billingCity: billingCity || '',
    billingZip: billingZip || '',
    billingPhone: billingPhone || '',
    billingCountryId: billingCountry?.id || '',
    billingStateSelect: '',
    billingStateInput: ''
  }

  if (usaCountryId === billingCountry?.id) {
    initialValues.billingStateSelect = billingState || ''
  } else {
    initialValues.billingStateInput = billingState || ''
  }

  return (
    <ContentLoader
      loading={loadingClient && loadingCountries && loadingStates}
      showSkeleton={
        initialLoadingClient && initialLoadingCountries && initialLoadingStates
      }
      skeletonComponent={
        <ModalSkeleton title={translate('modals.billingAddressEdit.title')} />
      }
    >
      <BillingAddressEditModalForm
        handleOnSubmit={handleOnSubmit}
        companyName={fullName}
        countries={countryOptions}
        usaStates={stateOptions}
        usaCountryId={usaCountryId}
        initialValues={initialValues}
      />
    </ContentLoader>
  )
})

BillingAddressEditModal.displayName = displayName

export default BillingAddressEditModal
