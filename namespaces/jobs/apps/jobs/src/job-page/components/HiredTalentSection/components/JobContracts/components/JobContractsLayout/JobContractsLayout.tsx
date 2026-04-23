import { SubSection } from '@staff-portal/ui'
import React, { ReactNode, PropsWithChildren } from 'react'

type Props = {
  actions?: ReactNode
  children?: ReactNode
}

const JobContractsLayout = ({ actions, children }: PropsWithChildren<Props>) => (
  <SubSection title='Contracts' actions={actions} last>
    {children}
  </SubSection>
)

export default JobContractsLayout
