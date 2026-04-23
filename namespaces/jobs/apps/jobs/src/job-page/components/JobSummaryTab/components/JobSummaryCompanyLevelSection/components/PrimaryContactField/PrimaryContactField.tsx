import { Container, QuestionMark16, Tooltip } from '@toptal/picasso'
import React from 'react'

import PrimaryContactTooltipContent, {
  PrimaryContactProps
} from '../PrimaryContactTooltipContent'

const PrimaryContactField = ({ contact }: PrimaryContactProps) => (
  <Container flex>
    {contact?.fullName}{' '}
    <Tooltip
      interactive
      content={<PrimaryContactTooltipContent contact={contact} />}
    >
      <Container
        flex
        left='xsmall'
        alignItems='center'
        data-testid='company-level-primary-contact-tooltip'
      >
        <QuestionMark16 />
      </Container>
    </Tooltip>
  </Container>
)

export default PrimaryContactField
