import { Button, Typography } from '@toptal/picasso'
import { Pencil16 } from '@toptal/picasso/Icon'
import { FormSpy } from '@toptal/picasso-forms'
import React, { SyntheticEvent, memo, useCallback } from 'react'
import { formatAmount } from '@toptal/picasso/utils'
import {
  Operation,
  UpdatePurchaseOrderInput,
  Maybe,
  Scalars
} from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  EMPTY_DATA,
  formatAsPercentage
} from '@staff-portal/billing/src/_lib/helpers'
import {
  convertToInteger,
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { formatDateFull } from '@staff-portal/billing/src/_lib/dateTime/format'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import ComponentTogglerWithForm from '@staff-portal/billing/src/components/ComponentTogglerWithForm'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'

import { useSetUpdatePurchaseOrderMutation } from '../../../../../data/setUpdatePurchaseOrder.graphql.types'
import adjustValues from '../adjustValues'
import { PurchaseOrderPropertyEditorField } from './PurchaseOrderPropertyEditorField'

const displayName = 'PurchaseOrderPropertyEditor'
const responseKey = 'updatePurchaseOrder'

type Props = {
  disabled?: boolean
  isToggled: boolean
  loading?: boolean
  name: string
  operation: Operation
  onClose: () => void
  onToggle: (event?: SyntheticEvent<HTMLButtonElement>) => void
  purchaseOrderId: string
  successMessage?: string
  tooltipMessage?: string
} & (
  | {
      type: 'amount'
      value?: Maybe<string>
    }
  | {
      type: 'percentage'
      value?: Maybe<string>
    }
  | {
      type: 'date'
      value?: Maybe<Scalars['Date']>
    }
)
const formatInitialInputValue = (
  type: string,
  value: Maybe<string> | undefined
) => {
  switch (type) {
    case 'percentage':
      return value ? Math.round(Number(value)) : ''
    case 'amount':
      return convertToInteger(value || '')
    default:
      return value
  }
}

const PurchaseOrderPropertyEditor = memo<Props>(
  ({
    disabled = false,
    tooltipMessage,
    loading,
    isToggled,
    name,
    operation,
    onClose,
    onToggle,
    purchaseOrderId,
    successMessage = '',
    ...restProps
  }: Props) => {
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [updatePurchaseOrderMutation] = useSetUpdatePurchaseOrderMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const handleSuccess = useCallback(() => {
      handleOnSuccess({
        apolloEvent: ApolloContextEvents.purchaseOrderUpdate,
        isModal: false,
        successMessage
      })()
      onClose()
    }, [handleOnSuccess, onClose, successMessage])

    const testId = `${displayName}-${name}`

    const initialValues: UpdatePurchaseOrderInput = {
      [name]: formatInitialInputValue(restProps.type, restProps.value),
      purchaseOrderId
    }

    return (
      <ComponentTogglerWithForm
        alignItems='center'
        disabled={disabled}
        tooltipMessage={tooltipMessage}
        tooltipPlacement='bottom'
        flex
        inline
        isToggled={isToggled}
        onToggle={onToggle}
        initialFormValues={initialValues}
        handleOnSubmit={handleSubmit({
          adjustValues: adjustValues(name),
          handleError: handleOnSubmissionError(responseKey),
          handleSuccess,
          responseKey,
          submit: updatePurchaseOrderMutation
        })}
        ComponentA={() => {
          let content: string | undefined | null

          switch (restProps.type) {
            case 'amount':
              content =
                restProps.value && formatAmount({ amount: restProps.value })
              break

            case 'percentage':
              content = restProps.value && formatAsPercentage(restProps.value)
              break

            default:
              content = restProps.value && formatDateFull(restProps.value)
          }

          return (
            <Typography
              data-testid={testId}
              size='medium'
              // TODO: Need to extend Picasso Typography to be able to inherit `weight`
              weight='semibold'
            >
              {content || EMPTY_DATA}
            </Typography>
          )
        }}
        ComponentB={() => (
          <PurchaseOrderPropertyEditorField
            name={name}
            isToggled={isToggled}
            loading={loading}
            type={restProps.type}
            testId={testId}
            onClose={onClose}
          />
        )}
        ToggleButton={({ onClick }) =>
          !isToggled ? (
            <FormSpy subscription={{ initialValues: true, submitting: true }}>
              {({ submitting }) => (
                <InlineActionsWrapper left='small'>
                  <OperationWrapper
                    isLoading={submitting}
                    operation={operation}
                  >
                    <Button.Circular
                      data-testid={`${testId}-toggle`}
                      disabled={disabled}
                      name={testId}
                      icon={<Pencil16 />}
                      onClick={onClick}
                      variant='flat'
                    />
                  </OperationWrapper>
                </InlineActionsWrapper>
              )}
            </FormSpy>
          ) : null
        }
      />
    )
  }
)

PurchaseOrderPropertyEditor.displayName = displayName

export default PurchaseOrderPropertyEditor
