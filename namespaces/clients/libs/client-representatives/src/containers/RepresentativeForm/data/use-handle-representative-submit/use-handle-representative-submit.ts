import { useCallback, useMemo } from 'react'
import { UpdateCompanyRepresentativeProfileInput } from '@staff-portal/graphql/staff'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  CreateRepresentativeFormValues,
  EditRepresentativeFormValues
} from '../../RepresentativeForm'
import {
  RepresentativeFragment,
  useUpdateCompanyRepresentativeProfile as useUpdateProfile
} from '../../../../data'
import { useCreateCompanyRepresentative } from '../create-company-representative/create-company-representative.staff.gql'
import { getCreateNewContactInput } from './get-create-new-contact-input'
import { adjustLanguageIds } from './adjust-language-ids'

const useHandleRepresentativeSubmit = ({
  clientIdOrRepresentative,
  jobId,
  onSuccess
}: {
  clientIdOrRepresentative: string | RepresentativeFragment
  jobId?: string
  onSuccess?: () => void
}) => {
  const { showError } = useNotifications()

  const { handleMutationResult } = useHandleMutationResult()

  // Edit Representative
  const [updateProfile, { loading: updating }] = useUpdateProfile({
    onError: () => showError('Unable to update contact profile.')
  })

  const handleSubmitEdit = useCallback(
    async (values: EditRepresentativeFormValues) => {
      const representative = clientIdOrRepresentative as RepresentativeFragment
      const { portalEnabled, readBillingReport, languageIds, ...restValues } =
        values

      const input: UpdateCompanyRepresentativeProfileInput = {
        companyRepresentativeId: representative.id,
        languageIds: adjustLanguageIds(languageIds),
        portalEnabled: portalEnabled === 'true',
        readBillingReport: readBillingReport === 'true',
        ...restValues
      }

      const { data } = await updateProfile({
        variables: { input }
      })

      return handleMutationResult({
        isFormSubmit: true,
        mutationResult: data?.updateCompanyRepresentativeProfile,
        successNotificationMessage: `Contact information updated.`,
        onSuccessAction: onSuccess
      })
    },
    [clientIdOrRepresentative, onSuccess, updateProfile, handleMutationResult]
  )

  // Create Representative
  const [createProfile, { loading: creating }] = useCreateCompanyRepresentative(
    { onError: () => showError('Unable to create contact profile.') }
  )

  const handleSubmitCreate = useCallback(
    async (values: CreateRepresentativeFormValues) => {
      const clientId = clientIdOrRepresentative as string

      const { creationMethod } = values

      const { data } = await createProfile({
        variables: {
          input: getCreateNewContactInput(clientId, creationMethod, {
            ...values,
            jobId: jobId ? encodeEntityId(jobId, 'Job') : undefined
          })
        }
      })

      return handleMutationResult({
        isFormSubmit: true,
        mutationResult: data?.createCompanyRepresentative,
        successNotificationMessage: `Contact created.`,
        onSuccessAction: onSuccess
      })
    },
    [
      clientIdOrRepresentative,
      onSuccess,
      createProfile,
      handleMutationResult,
      jobId
    ]
  )

  const handleSubmit = useCallback(
    async (
      values: CreateRepresentativeFormValues | EditRepresentativeFormValues
    ) =>
      typeof clientIdOrRepresentative !== 'string'
        ? handleSubmitEdit(values as EditRepresentativeFormValues)
        : handleSubmitCreate(values as CreateRepresentativeFormValues),
    [clientIdOrRepresentative, handleSubmitEdit, handleSubmitCreate]
  )

  return useMemo(
    () => ({
      handleSubmit,
      loading: creating || updating
    }),
    [handleSubmit, creating, updating]
  )
}

export default useHandleRepresentativeSubmit
