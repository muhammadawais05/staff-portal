import React, { FC, memo, SyntheticEvent } from 'react'
import {
  Table,
  Container,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'
import CommercialDocumentStatus from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
import {
  useCommercialDocumentTillMessage,
  useListTableRowExpandState
} from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import * as S from './styles'
import InvoiceShortDescription from '../InvoiceShortDescription'
import RowAction from '../InvoiceListTableRowAction'
import InvoiceListDate from '../InvoiceListDate'
import InvoiceListAmount from '../InvoiceListAmount'

interface Props {
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
  invoice: InvoiceListItemFragment
  isEven: boolean
}

const displayName = 'InvoiceListTableRow'

const TableExpandableRow = Table.ExpandableRow
const TableCell = Table.Cell

const InvoiceListTableRow: FC<Props> = memo<Props>(
  ({ handleOnActionClick, invoice, isEven }) => {
    const {
      description,
      documentNumber,
      id,
      invoiceKind,
      longDescription,
      subjectObject,
      webResource
    } = invoice

    const tillMessage = useCommercialDocumentTillMessage(invoice)

    const { isExpanded: isExpandedCheck, handleOnExpandClick } =
      useListTableRowExpandState()
    const isExpanded = isExpandedCheck(id)

    return (
      <TableExpandableRow
        content={
          <Container padded='small'>
            {invoiceKind === InvoiceKind.CONSOLIDATED ? (
              longDescription?.map((text, index) => (
                <Typography
                  data-testid={`${displayName}-long-description`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  {text}
                </Typography>
              ))
            ) : (
              <Typography data-testid={`${displayName}-description`}>
                {description}
              </Typography>
            )}
          </Container>
        }
        expanded={isExpanded}
        stripeEven={isEven}
        data-testid={displayName}
      >
        <TableCell css={S.id} data-testid={`${displayName}-invoice-id`}>
          <LinkWrapper href={webResource.url}>
            {`#${documentNumber}`}
          </LinkWrapper>
        </TableCell>
        <TableCell css={S.status}>
          <CommercialDocumentStatus
            document={invoice}
            data-testid={`${displayName}-status`}
          />
          {tillMessage && (
            <TypographyOverflow
              data-testid={`${displayName}-till-date`}
              size='xsmall'
            >
              {tillMessage}
            </TypographyOverflow>
          )}
        </TableCell>
        <TableCell css={S.recipient} data-testid={`${displayName}-client`}>
          <LinkWrapper href={subjectObject.webResource.url}>
            <TypographyOverflow lines={2} color='inherit' disableTooltip>
              {subjectObject.webResource.text}
            </TypographyOverflow>
          </LinkWrapper>
        </TableCell>
        <TableCell css={S.amount} data-testid={`${displayName}-amount`}>
          <InvoiceListAmount invoice={invoice} />
        </TableCell>
        <TableCell css={S.date}>
          <InvoiceListDate invoice={invoice} />
        </TableCell>
        <TableCell css={S.description}>
          {!isExpanded && (
            <TypographyOverflow lines={2} size='xsmall' as='p' disableTooltip>
              <InvoiceShortDescription invoice={invoice} />
            </TypographyOverflow>
          )}
        </TableCell>
        <TableCell css={S.action}>
          <Container flex justifyContent='flex-end'>
            <RowExpander
              value={id}
              testId={`${displayName}-expand`}
              handleOnClick={handleOnExpandClick}
              isExpanded={isExpanded}
            />
            <RowAction invoice={invoice} handleOnClick={handleOnActionClick} />
          </Container>
        </TableCell>
      </TableExpandableRow>
    )
  }
)

InvoiceListTableRow.displayName = displayName

export default InvoiceListTableRow
