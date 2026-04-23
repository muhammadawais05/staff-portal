import React, { FC, memo } from 'react'
import { uniq } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleSubmit,
  handleOnSubmissionError
} from '@staff-portal/billing/src/_lib/form/handlers'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import {
  useUpdateConsolidationDefaultMutation,
  useGetConsolidationDefaultQuery,
  useGetDataForConsolidationDefaultModalQuery
} from '../../data'
import ConsolidationDefaultModalForm from '../ModalForm'

interface Props {
  options: Required<ModalData>
}

const displayName = 'ConsolidationDefaultUpdateModal'
const responseKey = 'updateConsolidationDefault'

const ConsolidationDefaultUpdateModal: FC<Props> = memo(
  ({ options: { consolidationDefaultId } }) => {
    const { t: translate } = useTranslation(['billingDetails', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [updateConsolidationDefault] = useUpdateConsolidationDefaultMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const {
      data: consolidationDefaultData,
      loading: consolidationDefaultLoading,
      initialLoading: consolidationDefaultInitialLoading
    } = useGetConsolidationDefaultQuery({
      variables: { id: consolidationDefaultId }
    })

    const clientId = consolidationDefaultData?.node?.client.id

    const { data, loading, initialLoading } =
      useGetDataForConsolidationDefaultModalQuery({
        variables: { id: clientId as string },
        skip: !clientId,
        fetchPolicy: 'no-cache'
      })

    const title = translate(
      'billingDetails:modals.updateConsolidationDefault.title',
      { clientName: data?.node?.fullName }
    )

    const initialValues = {
      clientId: clientId as string,
      engagementIds: consolidationDefaultData?.node?.engagements.nodes.map(
        node => node.id
      ) as string[],
      name: consolidationDefaultData?.node?.name as string,
      consolidationDefaultId
    }

    const initialCompanies = uniq(
      consolidationDefaultData?.node?.engagements.nodes.map(
        node => node.client?.id
      )
    ) as string[]

    return (
      <ContentLoader
        loading={loading || consolidationDefaultLoading}
        showSkeleton={initialLoading || consolidationDefaultInitialLoading}
        skeletonComponent={<ModalSkeleton title={title} />}
      >
        <ConsolidationDefaultModalForm
          handleOnSubmit={handleSubmit({
            handleError: handleOnSubmissionError(responseKey),
            handleSuccess: handleOnSuccess({
              apolloEvent: ApolloContextEvents.consolidationDefaultUpdate,
              successMessage: translate(
                'billingDetails:consolidationDefaults.list.actions.edit.notification',
                { name: consolidationDefaultData?.node?.name }
              )
            }),
            responseKey,
            submit: updateConsolidationDefault
          })}
          initialValues={initialValues}
          initialCompanies={initialCompanies}
          title={title}
          submitButtonText={translate('common:actions.update')}
          engagements={data?.node?.hierarchy?.engagements?.nodes || []}
        />
      </ContentLoader>
    )
  }
)

ConsolidationDefaultUpdateModal.displayName = displayName

export default ConsolidationDefaultUpdateModal
