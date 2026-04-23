import { Container, Typography } from '@toptal/picasso'
import { useField } from '@toptal/picasso-forms'
import React from 'react'

interface ConfirmationProps {
  sourceSkillName: string
}

const EditSkillNameConfirmation = ({ sourceSkillName }: ConfirmationProps) => {
  const {
    input: { value: targetSkillName }
  } = useField<string>('newName')

  return (
    <Typography size='medium'>
      <Container>
        You are about to merge a clone of{' '}
        <Typography weight='semibold' as='span'>
          {sourceSkillName}
        </Typography>{' '}
        into{' '}
        <Typography weight='semibold' as='span'>
          {targetSkillName}
        </Typography>
        .
      </Container>
      <Container>
        Any changes you performed in the previous skill editing window will not
        be saved.
      </Container>
      <Container>Do you want to continue?</Container>
    </Typography>
  )
}

export default EditSkillNameConfirmation
