import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'

import SystemInformationSection from '../SystemInformationSection'

const SystemInformationSkeleton = () => {
  return (
    <SystemInformationSection>
      <DetailedListSkeleton items={20} />
    </SystemInformationSection>
  )
}

export default SystemInformationSkeleton
