import React from 'react'
import { Table, Typography, Container } from '@toptal/picasso'
import { capitalize } from '@toptal/picasso/utils'

import { EmailTemplatesListItem } from '../'
import { GroupedEmailTemplates } from '../../pages/EmailTemplatesList/EmailTemplatesList'
import { COLUMN_TITLES } from '../../utils'
import * as S from './styles'

interface Props {
  emailTemplatesByTargetRole: GroupedEmailTemplates
}

const EmailTemplatesListTable = ({ emailTemplatesByTargetRole }: Props) => {
  return (
    <Table data-testid='email-template-list-table'>
      <Table.Head>
        <Table.Row>
          {COLUMN_TITLES.map(({ title, key, testId }) => (
            <Table.Cell key={key} data-testid={testId}>
              {title}
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>

      {Object.keys(emailTemplatesByTargetRole).map(targetRole => (
        <Table.Body key={targetRole}>
          <Table.Row css={S.groupHeader}>
            <Table.Cell colSpan={8}>
              <Container flex alignItems='center'>
                <Typography size='xsmall' weight='semibold'>
                  {`${capitalize(
                    emailTemplatesByTargetRole[targetRole][0].targetRole.title
                  )} Templates`}
                </Typography>
              </Container>
            </Table.Cell>
          </Table.Row>

          {emailTemplatesByTargetRole[targetRole].map(emailTemplate => (
            <EmailTemplatesListItem
              emailTemplate={emailTemplate}
              key={emailTemplate.id}
            />
          ))}
        </Table.Body>
      ))}
    </Table>
  )
}

export default EmailTemplatesListTable
