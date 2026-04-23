import React, { memo, useCallback } from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { EditableField } from '@staff-portal/editable'
import {
  Operation,
  UpdateClientNetTermsInput
} from '@staff-portal/graphql/staff'
import {
  getOperationMessage,
  isCallableEnabled
} from '@staff-portal/billing/src/_lib/helpers/operations'
import {
  handleSubmit,
  handleOnSubmissionError,
  cleanNumberValue,
  convertToInteger
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { validNumber } from '@staff-portal/billing/src/_lib/form/fieldValidators'

import { useSetUpdateClientNetTermsMutation } from '../../data'
import { adjustValues, useGetNetTerms } from './utils'

const displayName = 'NetTermsItem'
const responseKey = 'updateClientNetTerms'

type Props = {
  initialValues: {
    netTerms: number
    clientId: string
  }
  operation: Operation
}

const NetTermsItem = ({
  initialValues: { netTerms, clientId },
  operation
}: Props) => {
  const { t: translate } = useTranslation('billingDetails')
  const { handleOnRootLevelError } = useFormSubmission()
  const getNetTerms = useGetNetTerms(clientId)
  const [updateClientNetTermsMutation] = useSetUpdateClientNetTermsMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const getNetTermsItemLabel = useCallback(
    () => (
      <TypographyOverflow
        weight='semibold'
        size='medium'
        data-testid={`${displayName}-label`}
      >
        {netTerms
          ? translate('values.net.existing', { terms: netTerms })
          : translate('values.net.empty')}
      </TypographyOverflow>
    ),
    [netTerms, translate]
  )

  const handleChange = useCallback(
    (key: keyof UpdateClientNetTermsInput, vals: AnyObject) => {
      if (Number(vals[key]) === netTerms) {
        return
      }

      const values = { [key]: vals[key], clientId }

      return handleSubmit({
        handleError: handleOnSubmissionError(responseKey),
        responseKey,
        submit: updateClientNetTermsMutation,
        adjustValues
      })(values)
    },
    [clientId, netTerms, updateClientNetTermsMutation]
  )

  const disabled = !isCallableEnabled(operation.callable)
  const tooltipText = getOperationMessage(operation?.messages)

  return (
    <EditableField<UpdateClientNetTermsInput, number, number>
      data-testid={displayName}
      alignItems='center'
      disabled={disabled}
      flex
      inline
      updateOnBlur
      name='netTerms'
      initialValues={{ netTerms }}
      onChange={handleChange}
      queryValue={getNetTerms}
      tooltipMessage={tooltipText as string}
      viewer={getNetTermsItemLabel()}
      editor={props => (
        <Form.Input
          {...props}
          data-testid='NetTermsItem-input'
          autoFocus
          width='auto'
          validate={validNumber}
          required
          formatOnBlur
          maxLength={9}
          format={convertToInteger}
          parse={cleanNumberValue}
          size='small'
        />
      )}
    />
  )
}

NetTermsItem.displayName = displayName

export default memo(NetTermsItem)
