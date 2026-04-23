import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@toptal/picasso'
import { SubSection } from '@staff-portal/ui'
import { isOperationHidden } from '@staff-portal/operations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import ShowInvoicesButton from '../ShowInvoicesButton'
import {
  getShowInvoicesOperations,
  BillingDetailsActionEnum,
  useBillingOptionSetUnsetPreferredActions,
  useBillingOptionRemoveActions,
  useBillingOptionCreditCardActions,
  useWireBillingOptionVerificationActions,
  useBillingOptionUpdateActions,
  useOnOpenJobBillingDeleteModal,
  shouldShowJobBillingDefaultsActions
} from '../../utils'
import { GetClientBillingDetailsQuery } from '../../data/getClientBillingDetails.graphql.types'
import BillingOption from '../BillingOption'
import DownloadClientBillingReportButton from '../DownloadClientBillingReportButton'
import JobBillingDefaultsActions from '../JobBillingDefaultsActions'
import BillingDetailsItems from '../BillingDetailsItems'
import JobBillingDefaultsDetails from '../JobBillingDefaultsDetails'

const displayName = 'BillingDetailsContent'

interface Props {
  client: Exclude<GetClientBillingDetailsQuery['node'], null | undefined>
  viewer: Exclude<GetClientBillingDetailsQuery['viewer'], null | undefined>
}

const BillingDetailsContent: FC<Props> = memo(({ client, viewer }) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])
  const {
    billingOptions,
    invoices,
    _companyId: companyId,
    jobTemplate,
    id: clientId,
    operations: { downloadClientBillingReport, createJobTemplate }
  } = client
  const { type: nodeType, id: nodeId } = decodeRawIdAndType(clientId)
  const showInvoicesOperation = getShowInvoicesOperations(invoices?.totalCount)
  const invoicesHref = `/invoices?badges[company_ids][]=${companyId}`
  const { handleOnReverifyCreditCardBillingOption } =
    useBillingOptionCreditCardActions()
  const {
    handleOnPreferEnterpriseBillingOption,
    handleOnUnsetPreferredBillingOption
  } = useBillingOptionSetUnsetPreferredActions()
  const { handleOnRemoveBillingOption, handleOnRemoveEnterpriseBillingOption } =
    useBillingOptionRemoveActions()
  const { handleOnVerifyWireBillingOption, handleOnUnverifyWireBillingOption } =
    useWireBillingOptionVerificationActions()
  const { handleOnUpdateBillingOption } = useBillingOptionUpdateActions()
  const [
    loadingPreferEnterpriseBillingOptionId,
    setLoadingPreferEnterpriseBillingOptionId
  ] = useState('')
  const onOpenJobBillingDeleteModal = useOnOpenJobBillingDeleteModal(
    jobTemplate?.id
  )
  const { handleOnOpenModal } = useModals()
  const showJobBillingDefaultsActions = shouldShowJobBillingDefaultsActions(
    jobTemplate,
    createJobTemplate
  )
  const showJobBillingDefaults = jobTemplate || showJobBillingDefaultsActions

  const showDownloadBillingReport = !isOperationHidden(
    downloadClientBillingReport
  )

  const handleOnActionClick = useCallback(
    // eslint-disable-next-line complexity
    async ({
      currentTarget: {
        value: id,
        dataset: { method, action }
      }
    }: SyntheticEvent<HTMLButtonElement, Event>) => {
      const billingOption = billingOptions?.nodes.find(
        ({ id: billingOptionId }) => id === billingOptionId
      )

      switch (action) {
        case 'job-billing-defaults-action-create':
        case 'job-billing-defaults-action-update':
          return handleOnOpenModal(
            action === 'job-billing-defaults-action-create'
              ? ModalKey.jobCreateTemplate
              : ModalKey.jobUpdateTemplate,
            { nodeId, nodeType }
          )
        case 'job-billing-defaults-action-remove':
          return onOpenJobBillingDeleteModal()
      }

      switch (method) {
        case BillingDetailsActionEnum.PREFER_ENTERPRISE_BILLING_OPTION:
          setLoadingPreferEnterpriseBillingOptionId(id)
          await handleOnPreferEnterpriseBillingOption(id)
          setLoadingPreferEnterpriseBillingOptionId('')
          break
        case BillingDetailsActionEnum.UNSET_PREFERRED_BILLING_OPTION:
          return handleOnUnsetPreferredBillingOption(id)
        case BillingDetailsActionEnum.REMOVE_BILLING_OPTION:
          return handleOnRemoveBillingOption({
            billingOptionId: id,
            isLastPullMethod: billingOption?.isLastPullMethod || undefined
          })
        case BillingDetailsActionEnum.REMOVE_ENTERPRISE_BILLING_OPTION:
          return handleOnRemoveEnterpriseBillingOption({
            billingOptionId: id,
            isLastPullMethod: billingOption?.isLastPullMethod || undefined
          })
        case BillingDetailsActionEnum.REVERIFY_CREDIT_CARD_BILLING_OPTION:
          return handleOnReverifyCreditCardBillingOption(id)
        case BillingDetailsActionEnum.VERIFY_WIRE_BILLING_OPTION:
          return handleOnVerifyWireBillingOption(id)
        case BillingDetailsActionEnum.UNVERIFY_WIRE_BILLING_OPTION:
          return handleOnUnverifyWireBillingOption(id)
        case BillingDetailsActionEnum.UPDATE_BILLING_OPTION:
          return handleOnUpdateBillingOption(id, clientId)
      }
    },
    [
      billingOptions?.nodes,
      handleOnPreferEnterpriseBillingOption,
      handleOnUnsetPreferredBillingOption,
      handleOnRemoveBillingOption,
      handleOnRemoveEnterpriseBillingOption,
      handleOnReverifyCreditCardBillingOption,
      handleOnVerifyWireBillingOption,
      handleOnUnverifyWireBillingOption,
      handleOnUpdateBillingOption,
      clientId,
      handleOnOpenModal
    ]
  )

  return (
    <Section
      title={translate('billingDetails:title')}
      variant='withHeaderBar'
      actions={
        <ShowInvoicesButton
          operation={showInvoicesOperation}
          href={invoicesHref}
        />
      }
    >
      <SubSection
        last={
          !showJobBillingDefaults &&
          !showDownloadBillingReport &&
          !billingOptions?.nodes.length
        }
      >
        <BillingDetailsItems client={client} />
      </SubSection>
      {billingOptions?.nodes.map(billingOption => (
        <BillingOption
          key={billingOption.billingMethod}
          billingOption={billingOption}
          handleOnClick={handleOnActionClick}
          activeId={loadingPreferEnterpriseBillingOptionId}
          canManageBillingOptions={viewer.permits.canManageBillingOptions}
        />
      ))}
      {showJobBillingDefaults && (
        <SubSection
          last={!showDownloadBillingReport}
          data-testid={displayName}
          title={translate('billingDetails:jobBillingDefaults.title')}
          actions={
            showJobBillingDefaultsActions &&
            (jobTemplate ? (
              <>
                <JobBillingDefaultsActions
                  type='update'
                  handleOnClick={handleOnActionClick}
                  operation={jobTemplate.operations.updateJobTemplate}
                />
                <JobBillingDefaultsActions
                  type='remove'
                  handleOnClick={handleOnActionClick}
                  operation={jobTemplate.operations.deleteJobTemplate}
                />
              </>
            ) : (
              <JobBillingDefaultsActions
                type='create'
                handleOnClick={handleOnActionClick}
              />
            ))
          }
        >
          <JobBillingDefaultsDetails jobTemplate={jobTemplate} />
        </SubSection>
      )}
      {showDownloadBillingReport && (
        <SubSection
          last
          data-testid={`${displayName}-downloadBillingReport`}
          title={translate('billingDetails:downloadBillingReport.title')}
          actions={
            <DownloadClientBillingReportButton
              clientId={clientId}
              operation={downloadClientBillingReport}
            />
          }
        />
      )}
    </Section>
  )
})

BillingDetailsContent.displayName = displayName

export default BillingDetailsContent
