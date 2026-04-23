import React from 'react'
import { Avatar, Container, Table, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { SourcedTalentFragment } from '../../data/sourced-talent-fragment.staff.gql.types'
import { SourcedTalentStatus } from '../SourcedTalentStatus'

type Props = {
  sourcedTalent: SourcedTalentFragment
  index: number
}

const SourcedTalentsItem = ({ sourcedTalent, index }: Props) => {
  return (
    <Table.Row
      key={sourcedTalent.id}
      data-testid='SourcedTalentsList-item'
      stripeEven={Boolean(index % 2)}
    >
      <Table.Cell>
        <Container flex alignItems='center'>
          <Container right='small'>
            <Avatar
              size='xsmall'
              alt={sourcedTalent.fullName}
              name={sourcedTalent.fullName}
              src={sourcedTalent.photo?.thumb || ''}
              data-testid='SourcedTalentsList-item-talent-avatar'
            />
          </Container>

          <LinkWrapper
            wrapWhen={Boolean(sourcedTalent.webResource.url)}
            href={sourcedTalent.webResource.url as string}
            data-testid='SourcedTalentsList-item-talent-url'
          >
            <TypographyOverflow color='inherit'>
              {sourcedTalent.fullName}
            </TypographyOverflow>
          </LinkWrapper>
        </Container>
      </Table.Cell>
      <Table.Cell data-testid='SourcedTalentsList-item-talent-joined-at'>
        <TypographyOverflow color='inherit'>
          {parseAndFormatDate(sourcedTalent.joinedAt)}
        </TypographyOverflow>
      </Table.Cell>
      <Table.Cell>
        <TypographyOverflow color='inherit'>
          {sourcedTalent.type}
        </TypographyOverflow>
      </Table.Cell>
      <Table.Cell>
        <SourcedTalentStatus
          sourcedTalentStatus={sourcedTalent.sourcingStatus}
          technicalStepsProgress={sourcedTalent.technicalStepsProgress}
          sourcedTalentName={sourcedTalent.fullName}
        />
      </Table.Cell>
      <Table.Cell>
        <TypographyOverflow
          color='inherit'
          data-testid='SourcedTalentsList-item-talent-next-meeting-date'
        >
          {parseAndFormatDate(sourcedTalent.nextMeetingDate)}
        </TypographyOverflow>
      </Table.Cell>
    </Table.Row>
  )
}

export default SourcedTalentsItem
