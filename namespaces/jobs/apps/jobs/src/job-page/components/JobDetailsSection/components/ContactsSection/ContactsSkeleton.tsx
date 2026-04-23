import React from 'react'
import { SubSection, DetailedListSkeleton } from '@staff-portal/ui'

import { LABEL_COLUMN_WIDTH } from '../../../../config'
import { CONTACTS_TITLE } from '../../config'

const ContactsSkeleton = () => (
  <SubSection title={CONTACTS_TITLE} titleSize='small'>
    <DetailedListSkeleton
      columns={2}
      labelColumnWidth={LABEL_COLUMN_WIDTH}
      items={5}
    />
  </SubSection>
)

export default ContactsSkeleton
