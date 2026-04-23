import React, {
  FC,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useState
} from 'react'
import { Button } from '@toptal/picasso'
import { VariantType } from '@toptal/picasso/Button'
import { createPortal } from 'react-dom'
import { CreateNoteForm, getPersistStorageKey } from '@staff-portal/notes'
import { useTranslation } from 'react-i18next'
import { ClientNoteType } from '@staff-portal/graphql/staff'
import { usePersistentFormContext } from '@staff-portal/forms'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { useGetClientDefaultNoteAnswersLazyQuery } from '../../data/getClientDefaultNoteAnswers.graphql.types'
import { useSetLogClientBillingInformationMutation } from '../../data/setLogClientBillingInformation.graphql.types'

const displayName = 'LogBillingInformationButton'
const responseKey = 'logClientBillingInformation'

interface Props {
  formContainer: RefObject<HTMLDivElement>
  variant: VariantType
  clientId: string
  clientName?: string
}

const LogBillingInformationButton: FC<Props> = memo(
  ({ formContainer, clientId, clientName = '', variant, children }) => {
    const { t: translate } = useTranslation('billingInformationNotes')
    const persistentStorageKey = getPersistStorageKey(clientId)
    const [getDefaultAnswers, { loading, data: defaultAnswersData }] =
      useGetClientDefaultNoteAnswersLazyQuery({
        fetchPolicy: 'network-only',
        onCompleted: () => {
          setIsFormOpen(true)
        },
        variables: {
          clientId
        }
      })
    const [isFormOpen, setIsFormOpen] = useState(false)
    const showForm = useCallback(() => {
      getDefaultAnswers()
    }, [getDefaultAnswers])
    const hideForm = () => setIsFormOpen(false)
    const { checkForm } = usePersistentFormContext()

    useEffect(() => {
      if (isFormOpen) {
        return
      }

      const shouldOpenForm = checkForm({
        nodeId: clientId,
        localStorageKey: persistentStorageKey
      })

      if (shouldOpenForm) {
        showForm()
      }
    }, [checkForm, clientId, isFormOpen, persistentStorageKey, showForm])

    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
    const [setLogClientBillingInformationMutation] =
      useSetLogClientBillingInformationMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.billingInformationNoteCreate
      }),
      responseKey,
      submit: setLogClientBillingInformationMutation,
      variables: {
        clientId
      }
    })

    return (
      <>
        <Button
          onClick={showForm}
          data-testid={displayName}
          disabled={isFormOpen}
          loading={loading}
          variant={variant}
          size='small'
        >
          {children}
        </Button>

        {isFormOpen &&
          formContainer.current &&
          createPortal(
            <CreateNoteForm
              answers={defaultAnswersData?.node?.defaultNoteAnswers?.nodes}
              commentRequired={false}
              hideTitle
              nodeId={clientId}
              notableTitle={clientName}
              noteType={ClientNoteType.BILLING_INFORMATION}
              onClose={hideForm}
              onSubmit={handleOnSubmit}
              title={translate('logBillingInfo.title')}
            />,
            formContainer.current
          )}
      </>
    )
  }
)

LogBillingInformationButton.displayName = displayName

export default LogBillingInformationButton
