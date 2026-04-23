/* eslint-disable @toptal/davinci/no-as-prop-for-css-styled-components */
import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso/TypographyOverflow/TypographyOverflow'
import { Billing16 } from '@toptal/picasso/Icon'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { Maybe } from '@staff-portal/graphql/staff'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { DetailedList as DL } from '@staff-portal/ui'

import { TalentInfractionFragment } from '../../data/talent-infraction-fragment'
import { INFRACTION_REASON_MAPPING } from '../../constants'
import TalentInfractionStatus from '../TalentInfractionStatus'
import TextWithExcerpt from '../TextWithExcerpt'
import * as S from './styles'

const resourceLink = (webResource?: { text: string; url?: Maybe<string> }) => {
  if (!webResource) {
    return null
  }

  return (
    <Link href={webResource.url ?? ''}>
      <TypographyOverflow color='inherit'>
        {webResource.text}
      </TypographyOverflow>
    </Link>
  )
}

interface AttachmentsProps {
  attachments: TalentInfractionFragment['attachments']
}

const renderAttachmentLink = ({
  webResource: { text, url },
  id
}: TalentInfractionFragment['attachments']['nodes'][0]) => (
  <Link
    key={id}
    css={S.attachment}
    href={url ?? ''}
    rel='noopener'
    target='_blank'
  >
    <Billing16 />
    <Typography forwardedAs='span' css={S.attachmentUrl}>
      {text}
    </Typography>
  </Link>
)

const Attachments = ({ attachments }: AttachmentsProps) => {
  const tooltipContent = (
    <>
      {attachments.nodes.map(attachment => (
        <Container key={attachment.id}>
          {renderAttachmentLink(attachment)}
        </Container>
      ))}
    </>
  )

  return (
    <TypographyOverflow tooltipContent={tooltipContent}>
      {attachments.nodes.map(renderAttachmentLink)}
    </TypographyOverflow>
  )
}

interface Props {
  infraction: TalentInfractionFragment
}

const TalentInfractionContent = ({ infraction }: Props) => {
  const {
    attachments,
    createdAt,
    creator,
    description,
    engagement,
    occurredAt,
    reasonSlug,
    review,
    status,
    talent,
    taskAssignee
  } = infraction

  const talentLink = resourceLink(talent?.webResource)
  const engagementLink = resourceLink(engagement?.webResource)
  const creatorLink = resourceLink(creator?.webResource)
  const assigneeLink = resourceLink(taskAssignee?.webResource)

  return (
    <DL labelColumnWidth={8} defaultValue={NO_VALUE}>
      <DL.Row>
        <DL.Item label='Talent' value={talentLink} />
        <DL.Item
          label='Reason'
          value={INFRACTION_REASON_MAPPING[reasonSlug].label}
        />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Status'>
          <TalentInfractionStatus status={status} />
        </DL.Item>
        <DL.Item label='Engagement' value={engagementLink} />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Occurred at' value={parseAndFormatDate(occurredAt)} />
        <DL.Item label='Submitted at' value={parseAndFormatDate(createdAt)} />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Submitted by' value={creatorLink} />
        <DL.Item label='Attachments'>
          {attachments.totalCount > 0 && (
            <Attachments attachments={attachments} />
          )}
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Assignee' value={assigneeLink} />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Details'>
          {description && <TextWithExcerpt text={description} />}
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Review'>
          {review && <TextWithExcerpt text={review} limit={4} />}
        </DL.Item>
      </DL.Row>
    </DL>
  )
}

export default TalentInfractionContent
