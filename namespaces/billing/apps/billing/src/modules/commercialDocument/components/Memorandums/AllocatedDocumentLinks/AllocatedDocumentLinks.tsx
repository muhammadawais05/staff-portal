import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { Memorandum, InvoiceDocument } from '../types'

const displayName = 'AllocatedDocumentLinks'

interface Props {
  memorandum: Memorandum
  commercialDocumentId: string
}

const AllocatedDocumentLinks: FC<Props> = memo(
  ({ memorandum, commercialDocumentId }) => {
    const { t: translate } = useTranslation('memorandum')
    const linkedDocuments = [
      memorandum.document,
      ...memorandum.portions.map(portion => portion.document)
    ].filter(Boolean)

    return (
      <Container flex data-testid={displayName} direction='column'>
        {linkedDocuments.length === 0
          ? EMPTY_DATA
          : linkedDocuments.map(document => {
              const isCurrentDocument = document?.id === commercialDocumentId
              const isConsolidatedInvoice =
                (document as InvoiceDocument)?.invoiceKind ===
                InvoiceKind.CONSOLIDATED

              return (
                <Container alignItems='center' flex key={document?.id}>
                  <LinkWrapper
                    data-testid={`${displayName}-link`}
                    href={document?.webResource?.url}
                    style={{ lineHeight: '1.5em' }}
                  >
                    {`#${document?.documentNumber}`}
                  </LinkWrapper>
                  {isCurrentDocument && (
                    <Container left={0.3}>
                      <Typography
                        data-testid={`${displayName}-current`}
                        size='xsmall'
                        style={{ lineHeight: '1.6em' }}
                      >
                        {translate('associated.table.row.current')}
                      </Typography>
                    </Container>
                  )}
                  {isConsolidatedInvoice && (
                    <Container left={0.3}>
                      <Typography
                        data-testid={`${displayName}-consolidated`}
                        size='xsmall'
                        style={{ lineHeight: '1.6em' }}
                      >
                        {translate('associated.table.row.consolidated')}
                      </Typography>
                    </Container>
                  )}
                </Container>
              )
            })}
      </Container>
    )
  }
)

AllocatedDocumentLinks.displayName = displayName

export default AllocatedDocumentLinks
