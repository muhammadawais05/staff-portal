import { Section, SectionProps } from '@toptal/picasso'
import React, { PropsWithChildren } from 'react'

import * as S from './styles'

interface Props extends SectionProps {
  last?: boolean
  hideBorder?: boolean
}

const SubSection = ({
  children,
  last,
  'data-testid': dataTestId,
  hideBorder = false,
  ...props
}: PropsWithChildren<Props>) => (
  <Section
    {...props}
    data-testid={dataTestId}
    titleSize='medium'
    css={[S.section, hideBorder && S.borderless, last && S.lastSection]}
  >
    {children}
  </Section>
)

export default SubSection
