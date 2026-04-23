import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ClientHierarchyEngagementScope } from '@staff-portal/graphql/staff'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleSubmit,
  handleOnSubmissionError
} from '@staff-portal/billing/src/_lib/form/handlers'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'

import ConsolidationDefaultModalForm from '../ModalForm'
import {
  useCreateConsolidationDefaultMutation,
  useGetDataForConsolidationDefaultModalQuery
} from '../../data'

interface Props {
  options: Required<ModalData>
}

const displayName = 'JobCreateTemplateModal'
const responseKey = 'createConsolidationDefault'

const ConsolidationDefaultCreateModal: FC<Props> = memo(
  ({ options: { clientId } }) => {
    const { t: translate } = useTranslation(['billingDetails', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [createConsolidationDefault] = useCreateConsolidationDefaultMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const { data, loading, initialLoading } =
      useGetDataForConsolidationDefaultModalQuery({
        variables: {
          id: clientId,
          scope: ClientHierarchyEngagementScope.WORKING
        },
        fetchPolicy: 'no-cache'
      })

    const title = translate(
      'billingDetails:modals.createConsolidationDefault.title',
      { clientName: data?.node?.fullName }
    )

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={title} />}
      >
        <ConsolidationDefaultModalForm
          handleOnSubmit={handleSubmit({
            handleError: handleOnSubmissionError(responseKey),
            handleSuccess: handleOnSuccess({
              apolloEvent: ApolloContextEvents.consolidationDefaultCreate,
              successMessage: translate(
                'billingDetails:actions.createConsolidationDefault.notification.success'
              )
            }),
            responseKey,
            submit: createConsolidationDefault
          })}
          initialValues={{ clientId, engagementIds: [], name: '' }}
          title={title}
          submitButtonText={translate('common:actions.create')}
          engagements={data?.node?.hierarchy?.engagements?.nodes || []}
        />
      </ContentLoader>
    )
  }
)

ConsolidationDefaultCreateModal.displayName = displayName

export default ConsolidationDefaultCreateModal
