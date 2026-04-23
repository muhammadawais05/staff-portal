import React from 'react'
import { AnyObject } from '@toptal/picasso-forms'

interface Props {
  'data-testid': string
  name: string
  value?: string
  initialValues: AnyObject
  disabled: boolean
  viewer: React.ReactElement
}

export const EditableField = (props: Props) => {
  const { name, value, initialValues, disabled, viewer } = props
  const testId = props['data-testid'] || `EditableField-${name}`

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-value`}>{JSON.stringify(value)}</span>
      <span data-testid={`${testId}-initialValues`}>
        {JSON.stringify(initialValues)}
      </span>
      <span data-testid={`${testId}-name`}>{name}</span>
      <span data-testid={`${testId}-viewer`}>{viewer}</span>
      <span data-testid={`${testId}-disabled`}>{JSON.stringify(disabled)}</span>
    </div>
  )
}
