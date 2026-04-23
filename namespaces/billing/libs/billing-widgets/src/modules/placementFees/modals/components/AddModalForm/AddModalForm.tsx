import { Container, Modal, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, SyntheticEvent, memo } from 'react'
import { useForm, useFormState } from '@toptal/picasso-forms'
import { Option } from '@staff-portal/billing/src/@types/types'
import {
  formatDateURL,
  getCurrentTime,
  parse
} from '@staff-portal/billing/src/_lib/dateTime'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import { useGetExperimentsQuery } from '@staff-portal/billing/src/data/getExperiments.graphql.types'

import { PlacementFeeInput } from '../AddModal/AddModal'
import AddModalFormConfirm from '../AddModalFormConfirm'
import AddModalFormContent from '../AddModalFormContent'
import AddModalFormFooter from '../AddModalFormFooter'
import getInstallmentsTotal from './getInstallmentsTotal'
import { getIsValidForm } from './utils'
import { PurchaseOrderLinesSelect } from '../../../../job/utils'

const displayName = 'AddModalForm'
const MAX_INSTALLMENTS = 6

interface Props {
  purchaseOrders: Option[]
  setConfirmStep: (value: boolean) => void
  isConfirmStep: boolean
  isInline?: boolean
  purchaseOrderLines: PurchaseOrderLinesSelect
}

export const AddModalForm: FC<Props> = memo(
  ({
    purchaseOrders,
    isConfirmStep,
    setConfirmStep,
    isInline,
    purchaseOrderLines
  }) => {
    const { t: translate } = useTranslation('placementFees')
    const { blur, mutators } = useForm<PlacementFeeInput>()
    const { submitting, values, errors } = useFormState<PlacementFeeInput>()
    const { data, loading } = useGetExperimentsQuery()

    const isPOLinesEnabled = Boolean(data?.experiments?.poLines?.enabled)

    const installmentCount = values.installments?.length
    const isInstallmentsLimitReached = installmentCount === MAX_INSTALLMENTS
    const isPODisabled = !purchaseOrders.length

    const getNextDueDateValue = () => {
      const nextDueDateValue =
        installmentCount < 1
          ? getCurrentTime()
          : parse(values.installments[installmentCount - 1].dueDate).plus({
              months: 1
            })

      return formatDateURL(nextDueDateValue)
    }

    const getNextAmountValue = () => {
      return installmentCount < 1
        ? ''
        : values.installments[installmentCount - 1].amount
    }

    const handleOnInstallmentAdd = () => {
      mutators.push('installments', {
        amount: getNextAmountValue(),
        dueDate: getNextDueDateValue()
      })
    }

    const handleOnFooterButtonClick = (
      e: SyntheticEvent<HTMLButtonElement>
    ) => {
      if (e.currentTarget.value === 'back') {
        setConfirmStep(false)
      } else {
        if (getIsValidForm({ values, blur, errors })) {
          setConfirmStep(true)
        }
      }
    }

    const totalAmount = Number(getInstallmentsTotal(values))

    const title = isConfirmStep
      ? translate('AddModal.confirm.title')
      : translate('AddModal.title')

    const Wrapper = isInline ? React.Fragment : Modal.Content
    const wrapperProps = isInline
      ? {}
      : {
          'data-testid': `${displayName}-content`
        }

    return (
      <Container data-testid={displayName} top={isInline ? 1 : 0}>
        {isInline ? (
          <Container data-testid='inline-title' bottom='small'>
            <Typography size='medium'>{title}</Typography>
          </Container>
        ) : (
          <Modal.Title data-testid={`${displayName}-title`}>
            {title}
          </Modal.Title>
        )}

        <Wrapper {...wrapperProps}>
          <FormBaseErrorContainer />
          <AddModalFormConfirm
            isHidden={!isConfirmStep}
            purchaseOrders={purchaseOrders}
            totalAmount={totalAmount}
            purchaseOrderLines={purchaseOrderLines}
            values={values}
          />
          <AddModalFormContent
            isInline={isInline}
            filteredPurchaseOrders={purchaseOrders}
            purchaseOrderLines={purchaseOrderLines}
            loading={loading}
            handleOnInstallmentAdd={handleOnInstallmentAdd}
            isHidden={isConfirmStep}
            isInstallmentsLimitReached={isInstallmentsLimitReached}
            isPODisabled={isPODisabled}
            isSubmitting={submitting}
            totalAmount={totalAmount}
            poLinesEnabled={isPOLinesEnabled}
          />
        </Wrapper>
        {!isInline && (
          <AddModalFormFooter
            handleOnClick={handleOnFooterButtonClick}
            isSubmitting={submitting}
            isConfirmStep={isConfirmStep}
          />
        )}
      </Container>
    )
  }
)

AddModalForm.displayName = displayName

export default AddModalForm
