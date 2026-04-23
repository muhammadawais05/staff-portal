import { useField } from '@toptal/picasso-forms'
import { Container, Typography } from '@toptal/picasso'
import React from 'react'

interface Props {
  sourceSkillName: string
}

const CloneSkillNameConfirmation = ({ sourceSkillName }: Props) => {
  const {
    input: { value: targetSkillName }
  } = useField<string>('newName')

  return (
    <>
      You are about to merge a clone of{' '}
      <Typography as='span' weight='semibold'>
        {sourceSkillName}
      </Typography>
      {' into '}
      <Typography as='span' weight='semibold'>
        {targetSkillName}
      </Typography>
      .<Container top='small'>Do you want to continue?</Container>
    </>
  )
}

export default CloneSkillNameConfirmation
