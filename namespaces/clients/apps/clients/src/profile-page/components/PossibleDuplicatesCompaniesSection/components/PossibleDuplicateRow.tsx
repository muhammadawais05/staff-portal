import React from 'react'
import { Table, TypographyOverflow } from '@toptal/picasso'
import { Client } from '@staff-portal/graphql/staff'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'
import { titleize } from '@staff-portal/string'
import { CompanyStatus } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

interface Props {
  explanation?: string | null
  node: Client
}

const PossibleDuplicateRow = ({ node, explanation }: Props) => (
  <Table.Row key={node?.id}>
    <Table.Cell data-testid='PossibleDuplicateRow-name'>
      <TypographyOverflowLink>
        <LinkWrapper
          wrapWhen={Boolean(node?.webResource?.url)}
          href={node?.webResource?.url as string}
        >
          {node?.webResource?.text}
        </LinkWrapper>
      </TypographyOverflowLink>
    </Table.Cell>
    <Table.Cell>
      <CompanyStatus
        cumulativeStatus={node.cumulativeStatus}
        investigations={node.investigations}
      />
    </Table.Cell>
    <Table.Cell data-testid='PossibleDuplicateRow-explanation'>
      <TypographyOverflow>
        {explanation
          ? titleize(explanation, { capitalizeAllWords: false })
          : NO_VALUE}
      </TypographyOverflow>
    </Table.Cell>
  </Table.Row>
)

export default PossibleDuplicateRow
