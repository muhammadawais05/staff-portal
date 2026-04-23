import React, { Suspense } from 'react'
import Section from '@toptal/picasso/Section'
import {
  Container,
  Typography,
  Grid,
  Tag,
  Button,
  SkeletonLoader,
  Table,
  TypographyOverflow
} from '@toptal/picasso'
import { SimpleHtmlFormatter } from '@staff-portal/string'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import { LinkWrapper } from '@staff-portal/ui'

import EmailAddressSection from './components/EmailAddressSection'
import { buildRoleEmailMessagesPath } from './utils'
import { EmailMessageWithUsers } from '../../types'

export interface Props {
  title?: string | null
  emailMessageWithUsers: EmailMessageWithUsers
  path?: string
  removeReplies?: boolean
  roleId?: string
  isLatest?: boolean
}

const CategoriesList = ({ categories }: { categories: string[] }) => (
  // Prevents horizontal scrollbar on Firefox
  <Grid spacing={0} alignItems='center'>
    <Grid.Item small={12} medium={5} large={2}>
      <Typography size='medium' color='dark-grey'>
        Categories
      </Typography>
    </Grid.Item>

    <Grid.Item small={12} medium={7} large={10}>
      <Tag.Group>
        {categories.map(category => (
          <Tag key={category} color='black' data-testid='email-category'>
            {category}
          </Tag>
        ))}
      </Tag.Group>
    </Grid.Item>
  </Grid>
)

const DateTimeInfo = ({ sentAt }: { sentAt: string }) => (
  // Prevents horizontal scrollbar on Firefox
  <Grid spacing={0}>
    <Grid.Item small={12} medium={5} large={2}>
      <Typography size='medium' color='dark-grey'>
        Date sent
      </Typography>
    </Grid.Item>

    <Grid.Item small={12} medium={7} large={10}>
      <Typography size='medium'>{sentAt}</Typography>
    </Grid.Item>
  </Grid>
)

const EmailMessageListItem = ({
  title,
  emailMessageWithUsers: {
    fromWithUser,
    toWithUsers,
    categories,
    sentAt,
    body
  },
  path,
  roleId,
  isLatest,
  removeReplies
}: Props) => {
  const formatDateTime = useUserDateTimeFormatter()
  const formattedSentAt = formatDateTime(sentAt)
  const emailTitle = title || '(no subject)'

  const seeAllEmailsButton = (
    <Button
      href={buildRoleEmailMessagesPath(roleId)}
      target='_blank'
      size='small'
    >
      See All
    </Button>
  )

  return (
    <Section
      variant='withHeaderBar'
      data-testid='email-container'
      title={
        <TypographyOverflow
          as='span'
          weight='inherit'
          color='inherit'
          tooltipContent={emailTitle}
          data-testid='email-subject'
        >
          <LinkWrapper wrapWhen={Boolean(path)} href={path as string}>
            {emailTitle}
          </LinkWrapper>
        </TypographyOverflow>
      }
      actions={
        <Typography
          noWrap
          as='div'
          size='medium'
          color='black'
          weight='semibold'
          data-testid='email-sent-at'
        >
          {isLatest ? seeAllEmailsButton : formattedSentAt}
        </Typography>
      }
    >
      <Table variant='striped'>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <EmailAddressSection from={fromWithUser} to={toWithUsers} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Container flex alignItems='center'>
                {isLatest ? (
                  <DateTimeInfo sentAt={formattedSentAt} />
                ) : (
                  <CategoriesList categories={categories} />
                )}
              </Container>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Typography
                color='black'
                size='medium'
                as='div'
                data-testid='email-body'
              >
                <Suspense fallback={<SkeletonLoader.Typography rows={3} />}>
                  <SimpleHtmlFormatter
                    text={body || ''}
                    removeReplies={removeReplies}
                  />
                </Suspense>
              </Typography>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Section>
  )
}

export default EmailMessageListItem
