import React from 'react'
import { Table, TypographyOverflow, Tooltip, Container } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

import { EmailTemplatesListFragment } from '../../data/use-get-email-templates-list/get-email-templates-list.staff.gql.types'
import EmailTemplatesListItemActions from '../EmailTemplatesListItemActions'
import * as S from './styles'

interface Props {
  emailTemplate: EmailTemplatesListFragment
}

const EmailTemplatesListItem = ({ emailTemplate }: Props) => {
  const { id, name, role, private: isPrivate, topscreenClient } = emailTemplate

  return (
    <Table.Row key={id} data-testid='email-templates-list-item-row'>
      <Table.Cell data-testid='email-templates-list-item-name-cell'>
        <Container css={S.largeCell}>
          <TypographyOverflow>{name}</TypographyOverflow>
        </Container>
      </Table.Cell>
      <Table.Cell data-testid='email-templates-list-item-created-by-cell'>
        <Container css={S.smallCell}>
          <LinkWrapper
            wrapWhen={Boolean(role?.webResource.url)}
            href={role?.webResource.url as string}
          >
            <Tooltip content={role?.webResource?.text || ''}>
              <span>{role?.webResource?.text}</span>
            </Tooltip>
          </LinkWrapper>
        </Container>
      </Table.Cell>
      <Table.Cell data-testid='email-templates-list-item-private-cell'>
        <Container css={S.smallCell}>
          {isPrivate ? 'Private' : 'Public'}
        </Container>
      </Table.Cell>
      <Table.Cell>
        <Container css={S.smallCell}>{topscreenClient?.name}</Container>
      </Table.Cell>
      <Table.Cell data-testid='email-templates-list-item-actions-cell'>
        <Container justifyContent='flex-end' css={S.smallCell} flex>
          <EmailTemplatesListItemActions emailTemplate={emailTemplate} />
        </Container>
      </Table.Cell>
    </Table.Row>
  )
}

export default EmailTemplatesListItem
