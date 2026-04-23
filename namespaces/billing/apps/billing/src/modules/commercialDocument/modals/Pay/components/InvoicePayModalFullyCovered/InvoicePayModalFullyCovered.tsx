import { Container, Modal, Typography } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { Trans, useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'InvoicePayModalFullyCovered'

interface Props {
  clientId: string
  documentNumber: number
  isInvoicePaid: boolean
}

const InvoicePayModalFullyCovered: FC<Props> = memo(
  ({ isInvoicePaid, clientId, documentNumber }) => {
    const { t: translate } = useTranslation(['common', 'invoice'])

    // TODO: leaving hardcoded until we have a better solution
    // for items listing links
    const memorandumsLink = `/platform/memos?badges[company_ids[]=${clientId}&status=unallocated`

    return (
      <>
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('invoice:payModal.title', { documentNumber })}
        </Modal.Title>
        <Modal.Content>
          <Trans
            defaults={translate('invoice:payModal.fullyCovered')}
            parent={Typography}
            components={[
              <Link key='link' href={memorandumsLink}>
                Memorandums link
              </Link>
            ]}
          />
          {!isInvoicePaid && (
            <Container top={1}>
              <Typography size='medium'>
                {translate('invoice:payModal.notPaid')}
              </Typography>
            </Container>
          )}
        </Modal.Content>
        <ModalFooter cancelButtonText={translate('common:actions.ok')} />
      </>
    )
  }
)

InvoicePayModalFullyCovered.displayName = displayName

export default InvoicePayModalFullyCovered
