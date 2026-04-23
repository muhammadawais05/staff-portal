import React, { memo } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { Section, Typography } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { SimpleHtmlFormatter } from '@staff-portal/string'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useGetTalentAboutData } from './data'

interface Props {
  talentId: string
}

const TalentAboutSection = ({ talentId }: Props) => {
  const { showError } = useNotifications()
  const { loading, about, refetch } = useGetTalentAboutData({
    talentId,
    onError: () => {
      showError('Unable to fetch talent about data.')
    }
  })

  useMessageListener(
    TALENT_UPDATED,
    ({ talentId: id }) => talentId === id && refetch()
  )

  if (!about || loading) {
    return null
  }

  return (
    <Section
      title='About'
      variant='withHeaderBar'
      data-testid='talent-about-section'
    >
      <Typography size='medium' as='div'>
        <SimpleHtmlFormatter text={about} />
      </Typography>
    </Section>
  )
}

export default memo(TalentAboutSection)
