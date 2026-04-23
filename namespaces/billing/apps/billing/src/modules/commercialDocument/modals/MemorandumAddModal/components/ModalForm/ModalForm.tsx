import { Modal, Container, Typography } from '@toptal/picasso'
import { Form, OnChange, FormRenderProps } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState } from 'react'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { Maybe, MemorandumBalance } from '@staff-portal/graphql/staff'
import {
  composeValidators,
  positiveNumber,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  amountCleanNumberValue,
  formatCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import {
  QueryAutocompleteNodeFragment,
  QueryAutocompleteRoleTypeFragment
} from '@staff-portal/billing/src/data'
import { MemorandumCategoryCommonFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumCategoryCommon.graphql.types'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import {
  convertMemorandumCategoriesToOptions,
  canAffectCommissionRevenue,
  useAdjustedOriginalInvoices,
  getRecipientRole,
  useUpdateComment,
  useBalanceTypeOptions
} from '../../utils'
import {
  GetAddMemorandumInvoiceFragment as InvoiceFragment,
  GetAddMemorandumPaymentFragment as PaymentFragment
} from '../../data'
import ModalFormReceiver from '../ModalFormReceiver'
import ModalFormCommissionsWarning from '../ModalFormCommissionsWarning'
import ModalFormWarningText from '../ModalFormWarningText'

type CommercialDocument = InvoiceFragment | PaymentFragment

const displayName = 'MemorandumAddModalForm'

interface Props {
  nodeType?: CommercialDocumentType
  formProps: Omit<FormRenderProps, 'handleSubmit'>
  document?: CommercialDocument
  memorandumCategories?: MemorandumCategoryCommonFragment[]
  showReceiverField?: boolean
}

// eslint-disable-next-line max-lines-per-function
const ModalForm: FC<Props> = memo<Props>(
  ({
    nodeType,
    memorandumCategories,
    document = {} as CommercialDocument,
    formProps: { form, initialValues },
    showReceiverField
  }) => {
    const { t: translate } = useTranslation('memorandum')
    const { modalContainer } = useExternalIntegratorContext()

    // invoice specific only :
    const { invoiceKind, subjectObject, commissionable } =
      document as Partial<InvoiceFragment>

    // payment specific only :
    const { paymentKind } = document as Partial<PaymentFragment>

    const [receiver, setReceiver] =
      useState<QueryAutocompleteRoleTypeFragment>()
    const notifyReceiverName = subjectObject?.fullName
    const notificationName = notifyReceiverName
      ? translate('addModal.fields.notification.withName', {
          notifyReceiverName
        })
      : translate('addModal.fields.notification.noName')

    const memorandumCategoriesOptions =
      convertMemorandumCategoriesToOptions(memorandumCategories)
    const roleType = getRecipientRole(receiver)
    const canAffectCommissions = canAffectCommissionRevenue({
      nodeType,
      roleType,
      commissionable,
      invoiceKind,
      paymentKind
    })
    const originalInvoicesOptions = useAdjustedOriginalInvoices(
      document as Partial<InvoiceFragment>
    )
    const updateComment = useUpdateComment({
      form,
      document,
      memorandumCategories,
      nodeType
    })
    const balanceTypeOptions = useBalanceTypeOptions()

    const [affectsCommissions, setAffectsCommissions] = useState(
      initialValues.affectsCommissions
    )

    const [balanceType, setBalanceType] = useState(
      initialValues?.balanceType as MemorandumBalance
    )
    const [categoryId, setCategoryId] = useState(
      initialValues?.categoryId as string
    )

    const handleReceiverSelect = (
      receiverNode?: QueryAutocompleteNodeFragment
    ) => {
      const newReceiver =
        receiverNode as Maybe<QueryAutocompleteRoleTypeFragment>

      setReceiver(newReceiver || undefined)

      // recalculate affectsCommissions only if receiver has been set
      if (receiverNode) {
        form.change(
          'affectsCommissions',
          canAffectCommissionRevenue({ roleType: newReceiver?.roleType })
        )
      }

      // todo: remove this `change` triggers as soon as Form.Autocomplete
      // will support `id` instead of `search term` as value
      // see https://toptal-core.atlassian.net/browse/FX-1469
      form.change('receiverId', receiverNode?.id)

      if (form.getFieldState('receiverId__fake')?.submitError) {
        // form state needs to be completely reset to clear submit errors
        form.reset(form.getState().values)
      }
    }

    return (
      <>
        <Modal.Title data-testid='memo-title'>
          {translate('addModal.title')}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer />
          {showReceiverField && (
            <Container bottom={2}>
              <Typography size='medium' data-testid={`${displayName}-intro`}>
                {translate(`addModal.intro`)}
              </Typography>
            </Container>
          )}

          <ModalFormWarningText document={document} />

          {originalInvoicesOptions.length > 0 && (
            <Form.Select
              enableReset
              options={originalInvoicesOptions}
              popperContainer={modalContainer}
              label={translate('addModal.fields.originalInvoice.label')}
              name='originalInvoiceId'
              data-testid='memo-select-originalInvoiceId'
            />
          )}

          {showReceiverField && (
            <ModalFormReceiver
              handleReceiverSelect={handleReceiverSelect}
              required
              autoFocus
            />
          )}

          <Form.RadioGroup
            horizontal
            label={translate('addModal.fields.balanceType.label')}
            name='balanceType'
            required
            data-testid='memo-balanceType'
            validate={required}
          >
            {balanceTypeOptions.map(({ label, value }) => (
              <Form.Radio
                key={value}
                label={label}
                titleCase={false}
                value={value}
                data-testid='trigger'
              />
            ))}
          </Form.RadioGroup>
          <OnChange name='balanceType'>
            {(value: MemorandumBalance) => {
              setBalanceType(value)
              updateComment(value, categoryId)
            }}
          </OnChange>

          <Form.Input
            autoComplete='off'
            data-testid='memo-amount'
            format={formatCleanNumberValue}
            formatOnBlur
            icon={<ReferralBonus16 />}
            label={translate('addModal.fields.amount.label')}
            name='amount'
            parse={amountCleanNumberValue}
            placeholder='0.00'
            required
            validate={composeValidators(required, positiveNumber)}
            width='full'
          />

          {memorandumCategoriesOptions && (
            <>
              <Form.Select
                // TODO: remove "key" when https://toptal-core.atlassian.net/browse/FX-683 is fixed, right now the value
                //   prop needs to be taken into account when options are provided after the value (on next tick)
                //   (or use Form.Autocomplete instead?)
                key={`${memorandumCategoriesOptions.length}__${categoryId}`}
                enableReset
                options={memorandumCategoriesOptions}
                popperContainer={modalContainer}
                label={translate('addModal.fields.category.label')}
                name='categoryId'
                data-testid='memo-select-category'
                width='full'
              />
              <OnChange name='categoryId'>
                {(value: string) => {
                  setCategoryId(value)
                  updateComment(balanceType, value)
                }}
              </OnChange>
            </>
          )}

          <Form.Input
            data-testid='memo-comment'
            label={translate('addModal.fields.comment.label')}
            multiline
            multilineResizable
            name='comment'
            placeholder={translate('addModal.fields.comment.placeholder')}
            required
            rowsMin={5}
            validate={required}
            width='full'
          />

          <Form.Checkbox
            label={notificationName}
            name='notifyReceiver'
            data-testid='notify-receiver-checkbox'
            titleCase={false}
          />

          {canAffectCommissions && (
            <>
              <Form.Checkbox
                label={translate('addModal.fields.affectsCommissions')}
                name='affectsCommissions'
                data-testid='memo-affects-commissions'
                titleCase={false}
              />
              <OnChange name='affectsCommissions'>
                {(value: boolean) => setAffectsCommissions(value)}
              </OnChange>

              {!affectsCommissions && <ModalFormCommissionsWarning />}
            </>
          )}
        </Modal.Content>

        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('addModal.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </>
    )
  }
)

ModalForm.displayName = displayName

export default ModalForm
