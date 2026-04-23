import React, { memo, useMemo } from 'react'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'
import { HistoryWidget } from '@staff-portal/chronicles'

export const DEFAULT_POLL_INTERVAL = 15000

export interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentCommentsSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const feeds = useMemo(() => {
    const { type, id } = decodeEntityId(talentId)

    return [[encodeGid(type, id)], ['screening']]
  }, [talentId])

  return (
    <Section
      title='Comments'
      collapsible
      variant={sectionVariant}
      data-testid='talent-comments-section'
    >
      <HistoryWidget
        feeds={feeds}
        limit={50}
        pollInterval={DEFAULT_POLL_INTERVAL}
        emptyState={{ children: 'No comments were found.' }}
      />
    </Section>
  )
}

export default memo(TalentCommentsSection)
