import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleSubmit,
  handleOnSubmissionError
} from '@staff-portal/billing/src/_lib/form/handlers'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import {
  useCreateJobTemplateMutation,
  useGetClientJobTemplate
} from '../../data'
import JobTemplateModalForm from '../JobTemplateModalForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const displayName = 'JobCreateTemplateModal'
const responseKey = 'createJobTemplate'

const JobCreateTemplateModal: FC<Props> = memo(
  ({ options: { nodeId, nodeType } }) => {
    const { t: translate } = useTranslation(['billingDetails', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [createJobTemplate] = useCreateJobTemplateMutation({
      onRootLevelError: handleOnRootLevelError
    })
    const clientId = encodeId({ id: nodeId, type: nodeType })
    const { data, loading, initialLoading } = useGetClientJobTemplate(clientId)
    const title = translate('billingDetails:modals.createJobTemplate.title')

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate('billingDetails:modals.updateJobTemplate.title')}
          />
        }
      >
        <JobTemplateModalForm
          handleOnSubmit={handleSubmit({
            handleError: handleOnSubmissionError(responseKey),
            handleSuccess: handleOnSuccess({
              apolloEvent: ApolloContextEvents.jobCreateTemplate,
              successMessage: translate(
                'billingDetails:actions.createJobTemplate.notification.success'
              )
            }),
            responseKey,
            submit: createJobTemplate
          })}
          initialValues={{ clientId }}
          title={title}
          submitButtonText={translate('common:actions.create')}
          client={data}
        />
      </ContentLoader>
    )
  }
)

JobCreateTemplateModal.displayName = displayName

export default JobCreateTemplateModal
