import React from 'react'
import { Typography } from '@toptal/picasso'
import { TypographyOverflowLink, LinkWrapper } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { StaffUserFragment } from '../../data'

type Props = {
  value: Partial<StaffUserFragment> | undefined | null
  'data-testid'?: string
}

const EditableStaffViewer = ({
  value,
  'data-testid': testId = 'EditableStaffViewer'
}: Props) => {
  if (!value) {
    return (
      <Typography size='medium' data-testid={testId}>
        {NO_VALUE}
      </Typography>
    )
  }

  return (
    <TypographyOverflowLink size='medium'>
      <LinkWrapper
        data-testid={`${testId}-link`}
        wrapWhen={Boolean(value?.webResource?.url)}
        href={value?.webResource?.url as string}
        title={value?.fullName}
      >
        {value?.fullName}
      </LinkWrapper>
    </TypographyOverflowLink>
  )
}

export default EditableStaffViewer
