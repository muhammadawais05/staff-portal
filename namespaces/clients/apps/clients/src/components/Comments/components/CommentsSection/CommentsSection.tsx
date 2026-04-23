import React, { ReactNode } from 'react'
import { Section, SectionProps } from '@toptal/picasso'

interface Props {
  children: ReactNode
  defaultCollapsed?: boolean
  sectionVariant?: SectionProps['variant']
}

const CommentsSection = ({
  children,
  defaultCollapsed = false,
  sectionVariant
}: Props) => {
  return (
    <Section
      title='Comments'
      collapsible
      defaultCollapsed={defaultCollapsed}
      variant={sectionVariant}
    >
      {children}
    </Section>
  )
}

export default CommentsSection
