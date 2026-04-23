import { SubSection } from '@staff-portal/ui'
import React, { PropsWithChildren } from 'react'

const JobCommissionsLayout = ({ children }: PropsWithChildren<{}>) => (
  <SubSection title='Commissions'>{children}</SubSection>
)

export default JobCommissionsLayout
