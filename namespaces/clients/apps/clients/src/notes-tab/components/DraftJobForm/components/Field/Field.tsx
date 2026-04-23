import React, { ReactNode } from 'react'
import { GridSize } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import Form from '@toptal/picasso/Form'

import DraftJobField from '../../../DraftJobField'

interface Props {
  label?: Maybe<ReactNode>
  labelCols?: GridSize
  required?: boolean
  children?: Maybe<ReactNode>
}

const DraftJobFormField = ({
  label,
  labelCols = 4,
  required,
  ...restProps
}: Props) => {
  return (
    <Form.Field>
      <DraftJobField
        label={
          <Form.Label requiredDecoration={required ? 'asterisk' : undefined}>
            {label}
          </Form.Label>
        }
        labelCols={labelCols}
        {...restProps}
      />
    </Form.Field>
  )
}

export default DraftJobFormField
