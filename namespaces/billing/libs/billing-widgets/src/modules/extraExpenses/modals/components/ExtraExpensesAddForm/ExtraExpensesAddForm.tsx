import { Modal, Container } from '@toptal/picasso'
import { Form, FinalField, OnChange } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo, useState } from 'react'
import {
  composeValidators,
  greaterOrEqualValue,
  positiveNumber,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  onBlurToFloatNumber,
  onChangeToFloatNumber
} from '@staff-portal/billing/src/_lib/form/handlers'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import FormInput from '@staff-portal/billing/src/components/FormInput'
import FormInputSelect from '@staff-portal/billing/src/components/FormInputSelect'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useGetExperimentsQuery } from '@staff-portal/billing/src/data/getExperiments.graphql.types'
import { Option } from '@staff-portal/billing/src/@types/types'

import { validatePurchaseOrderLine } from '../../utils'
import { PurchaseOrderFragment } from '../../../../__fragments__/purchaseOrderFragment.graphql.types'
import {
  PurchaseOrderLinesSelect,
  getSelectFormatPurchaseOrders
} from '../../../../job/utils'

const displayName = 'ExtraExpensesAddModalFormContent'

interface Props {
  purchaseOrders?: PurchaseOrderFragment[]
  purchaseOrderLines: PurchaseOrderLinesSelect
  jobTitle?: string
  talentName?: string
  isInline?: boolean
}

const amountInputProps = {
  icon: <span>$</span>,
  placeholder: '0.00',
  type: 'tel'
}

const ExtraExpensesAddForm = memo(
  ({
    purchaseOrders,
    purchaseOrderLines,
    jobTitle,
    talentName,
    isInline
  }: Props) => {
    const { t: translate } = useTranslation('extraExpenses')
    const { modalContainer } = useExternalIntegratorContext()
    const filteredPurchaseOrders = getSelectFormatPurchaseOrders(purchaseOrders)
    const POSelectdisabled = !filteredPurchaseOrders.length

    const [poLines, setPoLines] = useState<Option[]>([])

    const { data, loading } = useGetExperimentsQuery()

    const isPOLinesEnabled = Boolean(data?.experiments?.poLines?.enabled)

    const FormContainer = isInline ? Container : Modal.Content

    return (
      <>
        {!isInline && (
          <Modal.Title data-testid={`${displayName}-title`}>
            {translate('AddModal.title')}
          </Modal.Title>
        )}
        <FormContainer data-testid={`${displayName}-content`}>
          <FormBaseErrorContainer />
          <FinalField
            component={FormInputSelect}
            inputProps={{
              autoFocus: !POSelectdisabled,
              disabled: POSelectdisabled,
              enableReset: true,
              options: filteredPurchaseOrders,
              placeholder: translate('AddModal.fields.purchase.placeholder'),
              popperContainer: modalContainer,
              loading
            }}
            label={translate('AddModal.fields.purchase.label')}
            name='purchaseOrderId'
            testId='purchaseOrderId'
          />
          {poLines.length !== 0 && isPOLinesEnabled && (
            <FinalField
              component={FormInputSelect}
              required
              inputProps={{
                disabled: POSelectdisabled,
                enableReset: true,
                options: poLines,
                placeholder: translate('AddModal.fields.purchase.placeholder'),
                popperContainer: modalContainer,
                width: isInline ? 'full' : undefined
              }}
              validate={composeValidators(validatePurchaseOrderLine)}
              label={translate('AddModal.fields.line.label')}
              name='purchaseOrderLineId'
              testId='purchaseOrderLineId'
            />
          )}

          <OnChange name='purchaseOrderId'>
            {(value: string) => {
              setPoLines(purchaseOrderLines[value] || [])
            }}
          </OnChange>
          <FinalField
            component={FormInput}
            handleOnBlur={onBlurToFloatNumber}
            handleOnChange={onChangeToFloatNumber}
            inputProps={{
              ...amountInputProps,
              autoFocus: POSelectdisabled
            }}
            label={translate('AddModal.fields.developer.label')}
            name='talentAmount'
            required
            testId='talentAmount'
            validate={composeValidators(required, positiveNumber)}
          />
          <FinalField
            component={FormInput}
            handleOnBlur={onBlurToFloatNumber}
            handleOnChange={onChangeToFloatNumber}
            inputProps={amountInputProps}
            label={translate('AddModal.fields.company.label')}
            name='companyAmount'
            required
            testId='companyAmount'
            validate={composeValidators(
              required,
              positiveNumber,
              greaterOrEqualValue({
                errorMessage: translate('AddModal.fields.company.error'),
                valueKey: 'talentAmount',
                valueLabel: 'Talent amount'
              })
            )}
          />
          <FinalField
            component={FormInput}
            inputProps={{
              multiline: true,
              placeholder: translate(
                'AddModal.fields.description.placeholder',
                {
                  jobTitle,
                  talentName
                }
              ),
              rowsMin: 4
            }}
            label={translate('AddModal.fields.description.label')}
            name='description'
            testId='description'
          />
        </FormContainer>
        {!isInline && (
          <ModalFooter data-testid={`${displayName}-footer`}>
            <Form.SubmitButton data-testid='submit' variant='positive'>
              {translate('AddModal.submit')}
            </Form.SubmitButton>
          </ModalFooter>
        )}
      </>
    )
  }
)

ExtraExpensesAddForm.displayName = displayName

export default ExtraExpensesAddForm
