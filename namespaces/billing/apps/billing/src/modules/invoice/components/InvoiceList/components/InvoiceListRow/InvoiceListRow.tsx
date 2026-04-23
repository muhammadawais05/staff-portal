import React, { FC, memo, useCallback, useState } from 'react'
import { SelectableTableRowCheckboxCell } from '@staff-portal/forms'
import {
  Container,
  Typography,
  Table,
  TypographyOverflow
} from '@toptal/picasso'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'
import CommercialDocumentStatus from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'

import * as S from './styles'
import InvoiceShortDescription from '../../../InvoiceShortDescription'
import InvoiceListAmount from '../../../InvoiceListAmount'
import InvoiceListDate from '../../../InvoiceListDate'

const displayName = 'InvoiceListRow'

interface Props {
  index: number
  invoice: InvoiceListItemFragment & {
    consolidatable?: boolean
  }
  selectionEnabled?: boolean
  statusColumnEnabled?: boolean
  originalClientColumnEnabled?: boolean
}

const InvoiceListRow: FC<Props> = memo<Props>(
  ({
    index,
    invoice,
    selectionEnabled = false,
    statusColumnEnabled = false,
    originalClientColumnEnabled = false
  }) => {
    const {
      id,
      webResource,
      documentNumber,
      description,
      consolidatable,
      subjectObject
    } = invoice
    const [isExpanded, setExpanded] = useState(false)
    const handleOnExpandClick = useCallback(
      () => setExpanded(!isExpanded),
      [setExpanded, isExpanded]
    )

    const isRowDisabled = selectionEnabled && consolidatable === false

    return (
      <Table.ExpandableRow
        css={isRowDisabled ? S.row : undefined}
        content={
          <Container padded='small'>
            <Typography data-testid={`${displayName}-description`}>
              {description}
            </Typography>
          </Container>
        }
        expanded={isExpanded}
        stripeEven={Boolean(index % 2)}
        key={id}
        data-testid={displayName}
      >
        {selectionEnabled && (
          <SelectableTableRowCheckboxCell
            data-testid={`${displayName}-checkbox-${
              isRowDisabled ? 'disabled' : 'enabled'
            }`}
            fieldName='invoiceIds'
            id={id}
            style={S.checkbox}
            disabled={isRowDisabled}
          />
        )}
        <Table.Cell css={S.id} data-testid={`${displayName}-invoice-id`}>
          <LinkWrapper href={webResource.url}>
            {`#${documentNumber}`}
          </LinkWrapper>
        </Table.Cell>
        {statusColumnEnabled && (
          <Table.Cell css={S.status} data-testid={`${displayName}-status`}>
            <CommercialDocumentStatus
              document={{ ...invoice, statusComment: undefined }}
            />
          </Table.Cell>
        )}
        <Table.Cell css={S.amount} data-testid={`${displayName}-amount`}>
          <InvoiceListAmount invoice={invoice} />
        </Table.Cell>
        <Table.Cell css={S.date}>
          <InvoiceListDate invoice={invoice} />
        </Table.Cell>
        <Table.Cell css={S.description}>
          {!isExpanded && (
            <TypographyOverflow lines={2} size='xsmall' as='p'>
              <InvoiceShortDescription invoice={invoice} />
            </TypographyOverflow>
          )}
        </Table.Cell>
        {originalClientColumnEnabled && (
          <Table.Cell css={S.description} data-testid={`${displayName}-client`}>
            <LinkWrapper href={subjectObject.webResource.url}>
              {`${subjectObject.webResource.text} #${decodeId({
                type: 'client',
                id: subjectObject.id
              })}`}
            </LinkWrapper>
          </Table.Cell>
        )}
        <Table.Cell css={S.action}>
          <Container flex justifyContent='flex-end'>
            <RowExpander
              value={id}
              testId={`${displayName}-expand`}
              handleOnClick={handleOnExpandClick}
              isExpanded={isExpanded}
            />
          </Container>
        </Table.Cell>
      </Table.ExpandableRow>
    )
  }
)

InvoiceListRow.displayName = displayName

export default InvoiceListRow
