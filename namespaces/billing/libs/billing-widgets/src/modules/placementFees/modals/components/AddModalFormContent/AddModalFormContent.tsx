import {
  Amount,
  Button,
  Container,
  Tooltip,
  Typography,
  Plus16
} from '@toptal/picasso'
import { FinalField, OnChange } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState } from 'react'
import { Option } from '@staff-portal/billing/src/@types/types'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormInputSelect from '@staff-portal/billing/src/components/FormInputSelect'

import * as S from './styles'
import AddModalFormContentFieldArray from '../AddModalFormContentFieldArray'
import { PurchaseOrderLinesSelect } from '../../../../job/utils'

const displayName = 'AddModalFormContent'

interface Props {
  totalAmount: number
  isInstallmentsLimitReached: boolean
  isPODisabled: boolean
  isSubmitting: boolean
  handleOnInstallmentAdd: () => void
  filteredPurchaseOrders: Option[]
  purchaseOrderLines: PurchaseOrderLinesSelect
  poLinesEnabled: boolean
  loading: boolean
  isHidden: boolean
  isInline?: boolean
}

const AddModalFormContent: FC<Props> = memo(
  ({
    totalAmount,
    isInstallmentsLimitReached,
    isPODisabled,
    isSubmitting,
    handleOnInstallmentAdd,
    filteredPurchaseOrders,
    purchaseOrderLines,
    poLinesEnabled,
    loading,
    isInline,
    isHidden
  }) => {
    const { t: translate } = useTranslation('placementFees')
    const { modalContainer } = useExternalIntegratorContext()
    const [poLines, setPoLines] = useState<Option[]>([])

    return (
      <Container css={S.wrapper(isHidden)}>
        <Container bottom={1}>
          <Typography size='medium'>
            {translate('AddModal.summary')}{' '}
            <Amount amount={totalAmount} size='medium' weight='semibold' />.
          </Typography>
        </Container>

        <Container bottom={2}>
          <FinalField
            component={FormInputSelect}
            inputProps={{
              autoFocus: !isPODisabled,
              disabled: isPODisabled,
              enableReset: true,
              options: filteredPurchaseOrders,
              placeholder: translate('AddModal.fields.purchase.placeholder'),
              popperContainer: modalContainer,
              loading,
              width: isInline ? 'auto' : undefined
            }}
            label={translate('AddModal.fields.purchase.label')}
            name='purchaseOrderId'
            testId='purchaseOrderId'
          />
        </Container>

        {poLines.length !== 0 && poLinesEnabled && (
          <Container bottom={2}>
            <FinalField
              component={FormInputSelect}
              inputProps={{
                disabled: isPODisabled,
                enableReset: true,
                options: poLines,
                placeholder: translate('AddModal.fields.purchase.placeholder'),
                popperContainer: modalContainer,
                width: isInline ? 'auto' : undefined
              }}
              label={translate('AddModal.fields.line.label')}
              name='purchaseOrderLineId'
              testId='purchaseOrderLineId'
            />
          </Container>
        )}

        <OnChange name='purchaseOrderId'>
          {(value: string) => {
            setPoLines(purchaseOrderLines[value] || [])
          }}
        </OnChange>

        <AddModalFormContentFieldArray
          autoFocusDatepicker={isPODisabled}
          isInline={isInline}
        />

        <Container direction='row' flex justifyContent='flex-start' top={1}>
          <Tooltip
            content={translate('AddModal.actions.addInstallmentLimitReached')}
            disableListeners={!isInstallmentsLimitReached}
            interactive
          >
            <span>
              <Button.Action
                data-testid='addInstallment'
                disabled={isSubmitting || isInstallmentsLimitReached}
                onClick={handleOnInstallmentAdd}
                icon={<Plus16 />}
              >
                {translate('AddModal.actions.addInstallment')}
              </Button.Action>
            </span>
          </Tooltip>
        </Container>
      </Container>
    )
  }
)

AddModalFormContent.displayName = displayName

export default AddModalFormContent
