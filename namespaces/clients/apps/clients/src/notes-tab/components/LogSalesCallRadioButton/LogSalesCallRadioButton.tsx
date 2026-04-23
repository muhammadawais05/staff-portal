import { Container, Tooltip } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { concatMessages } from '@staff-portal/data-layer-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { LogSalesCallBusinessAction } from '../../types'

export interface Props {
  label: string
  value: LogSalesCallBusinessAction
  operation: CompanyOperationFragment
}

const LogSalesCallRadioButton = ({ label, value, operation }: Props) => {
  const isEnabled = isOperationEnabled(operation)

  const content = (
    <Form.Radio
      key={value}
      disabled={!isEnabled}
      titleCase={false}
      label={label}
      value={value}
    />
  )

  if (isEnabled) {
    return <>{content}</>
  }

  const messages = concatMessages(operation.messages)

  return (
    <Tooltip interactive content={messages}>
      <Container as='span'>{content}</Container>
    </Tooltip>
  )
}

export default LogSalesCallRadioButton
