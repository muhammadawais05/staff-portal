import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { LazyOperationRenderProps } from '@staff-portal/operations'

const EditButton = ({ checkOperation, disabled, loading }: LazyOperationRenderProps) => {
  return (
    <Container left='small'>
      <Button
        variant='secondary'
        size='small'
        loading={loading}
        disabled={disabled}
        onClick={checkOperation}
        data-testid='LeadStatus-edit-button'
      >
        Edit
      </Button>
    </Container>
  )
}

export default EditButton
