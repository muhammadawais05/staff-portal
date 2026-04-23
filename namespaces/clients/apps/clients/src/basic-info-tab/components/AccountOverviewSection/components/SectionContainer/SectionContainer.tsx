import React, { ReactNode } from 'react'
import { Section } from '@toptal/picasso'

type Props = {
  children: ReactNode
  actions?: ReactNode
}

const SectionContainer = ({ children, actions }: Props) => {
  return (
    <Section
      title='Account Overview'
      data-testid='account-overview-section'
      variant='withHeaderBar'
      actions={actions}
    >
      {children}
    </Section>
  )
}

export default SectionContainer
