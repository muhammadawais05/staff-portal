import React, { ReactNode } from 'react'
import { Container, Button, CloseMinor16 } from '@toptal/picasso'

import { MarkAsPrimaryButton } from '..'

type Props = {
  formName: string
  itemIndex: number
  submitting: boolean
  onRemove: () => void
  onSetPrimary: () => void
  children?: ReactNode
}

const EditableFieldArrayItem = ({
  itemIndex,
  children,
  submitting,
  formName,
  onRemove,
  onSetPrimary
}: Props) => {
  return <Container flex>
    {children}
    <Container left='xsmall'>
      <Button.Circular
        data-testid={`RemoveButton-${itemIndex}`}
        disabled={submitting}
        icon={<CloseMinor16 color='dark-grey' />}
        variant='transparent'
        onClick={onRemove}
      />
    </Container>
    <MarkAsPrimaryButton
      itemIndex={itemIndex}
      setPrimary={onSetPrimary}
      formName={formName}
      disabled={submitting}
    />
  </Container>
}

export default EditableFieldArrayItem
