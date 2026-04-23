import React, { useMemo } from 'react'
import {
  Tag,
  Table,
  Tooltip,
  Container,
  Slack16,
  Candidates16,
  Typography,
  Button,
  Link as PicassoLink
} from '@toptal/picasso'
import { TableRowProps } from '@toptal/picasso/TableRow'
import {
  ReachOutFragment,
  SlackWorkspaceFragment
} from '@staff-portal/talents-gigs'
import { TalentAvatar } from '@staff-portal/talents'
import { WebResourceLink } from '@staff-portal/ui'
import { Link } from '@staff-portal/navigation'

import getReachOutStatus from '../../utils/get-reachout-status'
import * as S from './styles'

type Props = {
  reachOut: ReachOutFragment
  slackConversation?: SlackWorkspaceFragment
} & Omit<TableRowProps, 'children'>

const CandidateRow = ({
  reachOut,
  slackConversation,
  ...tableRowProps
}: Props) => {
  const talent = reachOut.participations.nodes[0].role

  const talentPartnerName = talent?.talentPartner?.webResource?.text
  const talentPartnerUrl = talent?.talentPartner?.webResource?.url
  const { rejectionReasonComment } = reachOut
  const displayTooltip = rejectionReasonComment

  const directSlackUrl = talent?.slackContacts?.nodes[0]?.webResource?.url

  const rejectToolTipContent = useMemo(
    () => (
      <>
        {rejectionReasonComment && (
          <Container>
            <Typography inline={true}>Reason: </Typography>
            <Typography inline={true}>{rejectionReasonComment}</Typography>
          </Container>
        )}
      </>
    ),
    [rejectionReasonComment]
  )

  const [status, statusColor] = getReachOutStatus(reachOut.status)

  return (
    <Table.Row key={talent.id} {...tableRowProps} data-testid='candidate-row'>
      <Table.Cell>
        <Container flex alignItems='center'>
          <TalentAvatar
            fullName={talent.fullName}
            photo={talent.photo?.thumb}
            talentPartnerName={talentPartnerName}
            talentPartnerUrl={talentPartnerUrl}
            avatarSize='xsmall'
            badgeSize='small'
            right='small'
          />
          <WebResourceLink link={talent.webResource} target='_blank' />
        </Container>
      </Table.Cell>
      <Table.Cell>
        <Container flex alignItems='center'>
          <Tag.Rectangular variant={statusColor}>{status}</Tag.Rectangular>
          {displayTooltip && (
            <Tooltip
              preventOverflow
              content={rejectToolTipContent}
              placement='bottom'
            >
              <Container
                left='small'
                css={S.candidateComment}
                data-testid='candidate-comment'
              >
                <Candidates16 />
              </Container>
            </Tooltip>
          )}
        </Container>
      </Table.Cell>
      <Table.Cell>
        <Container flex alignItems='center' justifyContent='flex-end'>
          {slackConversation ? (
            <Button
              as={Link as typeof PicassoLink}
              icon={<Slack16 color='dark-grey' />}
              href={slackConversation.channelUrl}
              noUnderline
              size='small'
              target='_blank'
              variant='secondary'
            >
              Channel
            </Button>
          ) : (
            directSlackUrl && (
              <Button
                as={Link as typeof PicassoLink}
                href={directSlackUrl}
                icon={<Slack16 color='dark-grey' />}
                noUnderline
                size='small'
                target='_blank'
                variant='secondary'
              >
                Direct
              </Button>
            )
          )}
        </Container>
      </Table.Cell>
    </Table.Row>
  )
}

export default CandidateRow
