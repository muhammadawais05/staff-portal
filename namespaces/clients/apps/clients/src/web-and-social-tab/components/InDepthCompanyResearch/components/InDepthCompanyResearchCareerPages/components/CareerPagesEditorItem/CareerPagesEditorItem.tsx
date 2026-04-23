import React from 'react'
import { Form } from '@toptal/picasso-forms'

type Props = {
  disabled: boolean
  formName: string
  itemIndex: number
  autoFocus?: boolean
}

const CareerPagesEditorItem = ({
  disabled,
  formName,
  itemIndex,
  autoFocus = true
}: Props) => (
  <Form.Input
    data-testid={`CareerPagesEditorItem-${itemIndex}-url`}
    name={`${formName}.${itemIndex}.url`}
    required
    disabled={disabled}
    width='shrink'
    size='small'
    autoFocus={autoFocus}
  />
)

export default CareerPagesEditorItem
