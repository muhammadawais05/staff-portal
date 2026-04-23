import React from 'react'
import {
  Typography,
  Container,
  Link,
  TypographyOverflow
} from '@toptal/picasso'
import { Time16, VideoOn16 } from '@toptal/picasso/Icon'
import { useUserDateFormatter } from '@staff-portal/current-user'
import Markdown from 'react-markdown'

import { CommunityEventData } from '../../types'
import * as S from './styles'

interface Props {
  event: CommunityEventData
}

const parsedMarkdown = (markdown: string) => (
  <Markdown disallowedTypes={['paragraph', 'link']} unwrapDisallowed>
    {markdown}
  </Markdown>
)

export const Event = ({ event }: Props) => {
  const formatDate = useUserDateFormatter()

  const [month, day, year] = formatDate(event.startDate)
    .replace(',', '')
    .split(' ')

  return (
    <Container css={S.eventContainer} flex bottom='small'>
      <Container
        flex
        direction='column'
        padded='medium'
        alignItems='center'
        justifyContent='center'
        data-testid='event-date'
      >
        <Typography weight='semibold' size='xsmall' color='black'>
          {month}
        </Typography>
        <Typography variant='heading' size='large'>
          {day}
        </Typography>
        <Typography weight='semibold' size='xsmall' color='black'>
          {year}
        </Typography>
      </Container>

      <div css={S.verticalSeparator} />

      <Container padded='medium' flex direction='column'>
        <Container flex justifyContent='space-between' bottom='xsmall'>
          <Container>
            <Typography size='medium' as='span'>
              <Link href={event.webResource.url || '#'}>{event.name}</Link>
            </Typography>
            <Container>
              <TypographyOverflow
                lines={3}
                disableTooltip
                size='medium'
                as='span'
              >
                {parsedMarkdown(event.description)}
              </TypographyOverflow>
            </Container>
          </Container>
        </Container>

        <Container flex justifyContent='space-between' alignItems='center'>
          <Container>
            <Container bottom='xsmall'>
              <Time16 />
              <Container left='small' inline>
                <Typography size='medium' as='span'>
                  {formatDate(event.startDate)}
                  {event.endDate && `to ${formatDate(event.endDate)}`}
                </Typography>
              </Container>
            </Container>

            <Container>
              <VideoOn16 />
              <Container left='small' right='xsmall' inline>
                <Typography size='medium' inline as='span'>
                  {event.location.cityName}
                </Typography>
                {event.location.country?.name && (
                  <Typography size='medium' inline as='span'>
                    {`, ${event.location.country?.name}`}
                  </Typography>
                )}
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
