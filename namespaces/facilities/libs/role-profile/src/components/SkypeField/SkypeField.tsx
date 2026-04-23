import React from 'react'
import { Container, TypographyOverflowProps } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import { SkypeLink } from '@staff-portal/communication'

import * as S from './styles'
import SkypeAdditionalIdsTooltip from './components/SkypeAdditionalIdsTooltip/SkypeAdditionalIdsTooltip'

interface Props {
  additionalSkypeIds?: Maybe<string[]>
  skypeId?: Maybe<string>
  size?: TypographyOverflowProps['size']
}

const SkypeField = ({
  skypeId,
  additionalSkypeIds,
  size = 'medium'
}: Props) => {
  if (!skypeId) {
    return null
  }

  return (
    <Container inline css={S.container} data-testid='skype-field'>
      <SkypeLink skypeId={skypeId} size={size} />
      {additionalSkypeIds && (
        <SkypeAdditionalIdsTooltip additionalSkypeIds={additionalSkypeIds} />
      )}
    </Container>
  )
}

export default SkypeField
