import { FormApi } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import {
  CommitmentAvailability,
  MemorandumBalance,
  Engagement,
  Scalars
} from '@staff-portal/graphql/staff'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'
import { formatDateFull } from '@staff-portal/billing/src/_lib/dateTime'
import { MemorandumCategoryCommonFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumCategoryCommon.graphql.types'

import { interpolateTemplate, getMemorandumCommentTemplates } from '.'
import {
  GetAddMemorandumBillingCycleFragment as BillingCycle,
  GetAddMemorandumInvoiceFragment as InvoiceFragment,
  GetAddMemorandumPaymentFragment as PaymentFragment
} from '../data'

type CommercialDocument = InvoiceFragment | PaymentFragment

const weeklyOrHourly = (billingCycle?: BillingCycle | null) => {
  switch (billingCycle?.actualCommitment?.availability) {
    case CommitmentAvailability.hourly:
      return 'hourly'
    case CommitmentAvailability.part_time:
    case CommitmentAvailability.full_time:
      return 'weekly'
  }
}

const formatDateIfExists = (date?: Scalars['Date'] | null) =>
  date ? formatDateFull(date) : undefined

export const useUpdateComment = ({
  form,
  document = {} as CommercialDocument,
  memorandumCategories,
  nodeType
}: {
  form: FormApi
  document?: CommercialDocument
  memorandumCategories?: MemorandumCategoryCommonFragment[]
  nodeType?: 'invoice' | 'payment'
}) => {
  const { documentNumber, billingCycle, job, subjectObject, reason } = document
  const { talent } = document as Partial<InvoiceFragment>
  const { client } = document as Partial<PaymentFragment>
  const isInvoiceType = nodeType === 'invoice'

  const { handleOnCloseConfirmation, handleOnOpenConfirmation } =
    useConfirmations()
  const { t: translate } = useTranslation('memorandum')

  // Backend provides some pre-ready data, that can be used to preset some initial values of template.
  // Not all values are replaced by data, some of them should be left as placeholders.
  // This logic is similar to the Platform
  const replacements = useMemo(
    () => ({
      billing_date_from: formatDateIfExists(billingCycle?.startDate),
      billing_date_to: formatDateIfExists(billingCycle?.endDate),
      client: isInvoiceType ? subjectObject?.fullName : client?.fullName,
      engagement_end_date: formatDateIfExists((reason as Engagement)?.endDate),
      invoice_id: documentNumber,
      job: job?.title,
      payment_id: documentNumber,
      talent: talent?.fullName,
      weekly_or_hourly: weeklyOrHourly(billingCycle)
    }),
    [
      billingCycle,
      client,
      reason,
      isInvoiceType,
      subjectObject,
      job,
      talent,
      documentNumber
    ]
  )

  const memorandumCommentTemplates =
    getMemorandumCommentTemplates(memorandumCategories)

  return useCallback(
    (commentBalanceType?: MemorandumBalance, commentCategoryId?: string) => {
      if (!commentBalanceType || !commentCategoryId) {
        return
      }

      const template =
        memorandumCommentTemplates[commentCategoryId][commentBalanceType]
      const interpolatedTemplate = interpolateTemplate(template, replacements)
      const isCommentModified = form.getFieldState('comment')?.modified

      if (isCommentModified) {
        handleOnOpenConfirmation({
          actionTitle: translate('addModal.confirmOverride.submitText'),
          description: translate('addModal.confirmOverride.message'),
          title: translate('addModal.confirmOverride.title'),
          onSuccess: () => {
            form.change('comment', interpolatedTemplate)
            form.resetFieldState('comment')
            handleOnCloseConfirmation()
          }
        })
      } else {
        form.change('comment', interpolatedTemplate)
        form.resetFieldState('comment')
      }
    },
    [
      form,
      translate,
      replacements,
      handleOnCloseConfirmation,
      handleOnOpenConfirmation,
      memorandumCommentTemplates
    ]
  )
}
