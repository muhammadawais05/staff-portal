import React, { useMemo } from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { JobListItemFragment } from '../JobListItem/data'

type Props = {
  contacts?: NonNullable<JobListItemFragment['contacts']>['nodes']
}

const JobContactsField = ({ contacts }: Props) => {
  const text = useMemo(
    () => contacts?.map(({ fullName }) => fullName).join(', '),
    [contacts]
  )

  if (!text) {
    return <>{NO_VALUE}</>
  }

  return (
    <Container data-testid='job-contacts-field'>
      <TypographyOverflow size='medium' color='inherit'>
        {text}
      </TypographyOverflow>
    </Container>
  )
}

export default JobContactsField
