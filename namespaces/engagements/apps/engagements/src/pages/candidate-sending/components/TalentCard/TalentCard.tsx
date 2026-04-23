import React from 'react'
import { Avatar, Button, Container, Typography } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'

export type Props = {
  fullName: string
  countryName?: Maybe<string>
  cityName?: Maybe<string>
  topSkillTitle?: Maybe<string>
}

const TalentCard = ({
  fullName,
  countryName,
  cityName,
  topSkillTitle
}: Props) => {
  const locationInfo =
    countryName && cityName ? `${cityName}, ${countryName}` : ''

  const subtitle = [topSkillTitle, locationInfo].filter(Boolean).join(' • ')

  return (
    <Container bordered rounded padded='medium' flex direction='column' inline>
      <Container flex bottom='small'>
        <Avatar size='xsmall' name={fullName} />

        <Container left='xsmall' flex direction='column'>
          <Typography color='black' weight='semibold' size='medium'>
            {fullName}
          </Typography>

          {subtitle && (
            <Typography size='small' as='span' data-testid='subtitle'>
              {subtitle}
            </Typography>
          )}
        </Container>
      </Container>

      <Container flex>
        <Button size='small' variant='positive'>
          Schedule Interview
        </Button>

        <Button size='small' variant='secondary'>
          View Profile
        </Button>
      </Container>
    </Container>
  )
}

export default TalentCard
