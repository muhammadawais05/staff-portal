import React, { memo, useMemo } from 'react'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { EditableField, QueryResult } from '@staff-portal/editable'
import { Operation } from '@staff-portal/graphql/staff'
import {
  getOperationMessage,
  isCallableEnabled
} from '@staff-portal/billing/src/_lib/helpers/operations'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { EMPTY_DATA, getYesOrNo } from '@staff-portal/billing/src/_lib/helpers'

import { adjustValues } from './utils'

export const EMPTY_VALUE = -1

export const EMPTY_OPTION = {
  text: EMPTY_DATA,
  value: EMPTY_VALUE
}

const displayName = 'YesOrNoItem'

type Props = {
  name: string
  onSubmit: (input: AnyObject) => Promise<AnyObject>
  value: boolean | null | undefined
  operation: Operation
  hasEmptyOption?: boolean
  queryValue: () => QueryResult<number>
  initialValues?: AnyObject
  editorSize?: 'medium' | 'small'
}

export const YesOrNoItem = ({
  name,
  value = null,
  operation,
  hasEmptyOption,
  onSubmit,
  queryValue,
  initialValues,
  editorSize = 'small'
}: Props) => {
  const { t: translate } = useTranslation('common')
  const responseKey = useMemo(() => `updateClient${upperFirst(name)}`, [name])
  const { modalContainer } = useExternalIntegratorContext()

  const options = useMemo(() => {
    const items = [
      {
        text: translate('details.values.yes'),
        value: 1
      },
      {
        text: translate('details.values.no'),
        value: 0
      }
    ]

    return [...(hasEmptyOption ? [EMPTY_OPTION] : []), ...items]
  }, [translate, hasEmptyOption])

  const handleChange = (key: string, values: AnyObject) =>
    handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      responseKey,
      submit: onSubmit,
      adjustValues: adjustValues(name)
    })(values)

  const disabledOperation = !isCallableEnabled(operation.callable)
  const tooltipText = getOperationMessage(operation?.messages)

  return (
    <EditableField<Record<string, number>, number>
      name={name}
      disabled={disabledOperation}
      alignItems='center'
      data-testid={`${displayName}-${name}`}
      flex
      onChange={handleChange}
      tooltipMessage={tooltipText}
      initialValues={initialValues}
      value={Number(value ?? (hasEmptyOption ? EMPTY_VALUE : 0))}
      queryValue={queryValue}
      viewer={value === null ? EMPTY_DATA : getYesOrNo(value)}
      editor={props => (
        <Form.Select
          {...props}
          data-testid={`${displayName}-${name}-select`}
          options={options}
          popperContainer={modalContainer}
          width='auto'
          size={editorSize}
          validate={val => {
            if (val === EMPTY_VALUE) {
              return translate('validation.required')
            }
          }}
        />
      )}
    />
  )
}

export default memo(YesOrNoItem)
