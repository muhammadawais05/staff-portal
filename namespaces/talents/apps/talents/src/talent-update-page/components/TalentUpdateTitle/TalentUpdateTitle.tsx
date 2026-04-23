import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'

export interface Props {
  talentFullName: string
  talentUrl?: string | null
}

const TalentUpdateTitle = ({ talentFullName, talentUrl }: Props) => (
  <>
    Profile of{' '}
    <LinkWrapper wrapWhen={Boolean(talentUrl)} href={talentUrl as string}>
      {talentFullName}
    </LinkWrapper>
  </>
)

export default TalentUpdateTitle
