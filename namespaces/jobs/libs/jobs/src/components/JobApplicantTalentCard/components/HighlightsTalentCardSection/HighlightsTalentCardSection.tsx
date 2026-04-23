import React from 'react'
import { Section, Container, Typography, List } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'

import { HighlightItemsTalentPitchFragment } from '../../data/get-job-application-talent-card'
import * as S from './styles'

const getSubtitleText = (years?: string[]) => {
  if (!years?.length) {
    return null
  }

  const [initial, end] = years

  return (
    <Typography size='xsmall' as='span'>{` (${initial} — ${titleize(
      end
    )})`}</Typography>
  )
}

type HighlightProps = {
  highlight: HighlightItemsTalentPitchFragment['highlights']['nodes'][0]
}

const Highlight = ({ highlight }: HighlightProps) => {
  const { companyName, years, title, roleName, additionalText } = highlight

  return (
    <List.Item css={S.itemContainer}>
      <Container css={S.offsetContainer}>
        <Typography size='xsmall' weight='semibold' inline>
          {companyName ? `${roleName} at ${companyName}` : title}
        </Typography>
        {getSubtitleText(years)}
        <Container>
          {additionalText.map((text, textIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Container top='xsmall' key={textIndex}>
              <Typography size='xsmall'>{text}</Typography>
            </Container>
          ))}
        </Container>
      </Container>
    </List.Item>
  )
}

type Props = {
  highlightItems?: HighlightItemsTalentPitchFragment['highlights'] | null
}

const HighlightsTalentCardSection = ({ highlightItems }: Props) => {
  const highlights = highlightItems?.nodes

  if (!highlights?.length) {
    return null
  }

  return (
    <Section
      data-testid='highlights-talent-card-section'
      title='Highlights'
      titleSize='small'
    >
      <List variant='unordered'>
        {highlights.map((highlight, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Highlight highlight={highlight} key={index} />
        ))}
      </List>
    </Section>
  )
}

export default HighlightsTalentCardSection
