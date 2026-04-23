import React, { ReactNode } from 'react'
import { Section } from '@toptal/picasso'

interface Props {
  children: ReactNode
}

const SystemInformationSection = ({ children }: Props) => {
  return (
    <Section title='System information' variant='withHeaderBar'>
      {children}
    </Section>
  )
}

export default SystemInformationSection
