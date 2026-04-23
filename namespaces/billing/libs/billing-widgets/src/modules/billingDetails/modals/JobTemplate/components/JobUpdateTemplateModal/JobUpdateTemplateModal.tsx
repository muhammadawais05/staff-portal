import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotifications } from '@toptal/picasso/utils'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import {
  useUpdateJobTemplateMutation,
  useGetClientJobTemplate
} from '../../data'
import adjustValues from '../../utils/adjustValues'
import JobTemplateModalForm from '../JobTemplateModalForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const displayName = 'JobUpdateTemplateModal'
const responseKey = 'updateJobTemplate'

const JobUpdateTemplateModal: FC<Props> = memo(
  ({ options: { nodeId, nodeType } }) => {
    const { t: translate } = useTranslation(['billingDetails', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [updateJobTemplate] = useUpdateJobTemplateMutation({
      onRootLevelError: handleOnRootLevelError
    })
    const clientId = encodeId({ id: nodeId, type: nodeType })
    const { data, loading, initialLoading } = useGetClientJobTemplate(clientId)
    const { handleOnCloseModal } = useModals()
    const { showError } = useNotifications()
    const title = translate('billingDetails:modals.updateJobTemplate.title')
    const initialValues = {
      jobTemplateId: data?.jobTemplate?.id as string,
      commitment: data?.jobTemplate?.commitment,
      billCycle: data?.jobTemplate?.billCycle,
      billDay: data?.jobTemplate?.billDay
    }
    const dataIsObsolete =
      !loading &&
      !isCallableEnabled(
        data?.jobTemplate?.operations?.updateJobTemplate?.callable
      )

    if (dataIsObsolete) {
      handleOnCloseModal()
      showError(
        translate('billingDetails:actions.updateJobTemplate.notification.error')
      )

      return null
    }

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={title} />}
      >
        <JobTemplateModalForm
          handleOnSubmit={handleSubmit({
            adjustValues,
            handleError: handleOnSubmissionError(responseKey),
            handleSuccess: handleOnSuccess({
              apolloEvent: ApolloContextEvents.jobUpdateTemplate,
              successMessage: translate(
                'billingDetails:actions.updateJobTemplate.notification.success'
              )
            }),
            responseKey,
            submit: updateJobTemplate
          })}
          initialValues={initialValues}
          title={title}
          submitButtonText={translate('common:actions.update')}
          client={data}
        />
      </ContentLoader>
    )
  }
)

JobUpdateTemplateModal.displayName = displayName

export default JobUpdateTemplateModal
