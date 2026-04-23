import React from 'react'
import { Button } from '@toptal/picasso'

interface TalentCardBuilderActionProps {
  inEdit: boolean
  onEdit: () => void
}

const TalentCardBuilderAction = ({
  inEdit,
  onEdit
}: TalentCardBuilderActionProps) => (
  <Button size='small' variant='secondary' onClick={onEdit}>
    {inEdit ? 'Preview Card' : 'Edit Card'}
  </Button>
)

export default TalentCardBuilderAction
