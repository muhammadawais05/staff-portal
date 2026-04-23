import { Button, Container } from '@toptal/picasso'
import React from 'react'
import { Operation, OperationType } from '@staff-portal/operations'
import { useNavigate } from '@staff-portal/navigation'
import { getEmailTemplateCreatePath } from '@staff-portal/routes'

export interface Props {
  operation?: OperationType
}

const AddNewTemplateButtom = ({ operation }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(getEmailTemplateCreatePath())
  }

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Container left='xsmall'>
          <Button
            size='small'
            variant='positive'
            disabled={disabled}
            onClick={handleClick}
            data-testid='add-new-template-buttom'
          >
            Add New Template
          </Button>
        </Container>
      )}
    />
  )
}

export default AddNewTemplateButtom
