import React, { ReactNode } from 'react'
import { Grid } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'

type Props = {
  children: ReactNode
  sectionVariant?: SectionProps['variant']
}

const TalentActivationSectionLayout = ({
  children,
  sectionVariant = 'default'
}: Props) => (
  <Section
    title='Activation'
    variant={sectionVariant}
    data-testid='talent-activation-section'
  >
    <Grid spacing={8}>{children}</Grid>
  </Section>
)

export default TalentActivationSectionLayout
