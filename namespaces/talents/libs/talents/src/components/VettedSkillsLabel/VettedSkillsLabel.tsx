import React from 'react'
import { Container, Tooltip, QuestionMark16 } from '@toptal/picasso'

interface Props {
  label: string
  tooltipContent: string
}

const VettedSkillsLabel = ({ label, tooltipContent }: Props) => {
  return <Container flex alignItems='center'>
    {label}
    <Tooltip content={tooltipContent}>
      <Container left={0.25} as='span'>
        <QuestionMark16 color='dark-grey' />
      </Container>
    </Tooltip>
  </Container>
}

export default VettedSkillsLabel
