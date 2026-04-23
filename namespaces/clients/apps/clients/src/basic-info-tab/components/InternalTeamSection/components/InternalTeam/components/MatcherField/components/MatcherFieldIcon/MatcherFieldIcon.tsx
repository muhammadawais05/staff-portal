import React from 'react'
import { Container, Info16, Tooltip } from '@toptal/picasso'
import { InternalTeamMatcherFragment } from '@staff-portal/clients'

import { MatcherFieldTooltipContent } from './components'

type Props = {
  value?: Partial<InternalTeamMatcherFragment>
}

const MatcherFieldIcon = ({ value }: Props) => {
  const { handoff, node } = value || {}

  if (!handoff || !node?.role?.webResource.text) {
    return null
  }

  return (
    <Tooltip
      content={
        <MatcherFieldTooltipContent
          temporaryRecruiterFullName={handoff.fullName}
          primaryRecruiterFullName={node.role.webResource.text}
        />
      }
    >
      <Container top={0.3} flex alignItems='center' left='xsmall'>
        <Info16 color='dark-grey' />
      </Container>
    </Tooltip>
  )
}

export default MatcherFieldIcon
